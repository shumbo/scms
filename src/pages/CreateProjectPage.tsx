import { useToast } from "@chakra-ui/toast";
import { useCallback, VFC } from "react";
import { useHistory } from "react-router";

import { CreateProjectScreen } from "../components/screen/CreateProjectScreen";
import { useInjection } from "../context/Inversify";
import { Project } from "../domain/model/Project/project";
import { TYPES } from "../TYPES";
import { ProjectUseCase } from "../UseCase/InputPort/ProjectUseCase";

export const CreateProjectPage: VFC = () => {
  const history = useHistory();
  const projectUseCase = useInjection<ProjectUseCase>(TYPES.ProjectUseCase);
  const toast = useToast();
  return (
    <CreateProjectScreen
      onSubmit={useCallback(
        async (values) => {
          const result = await projectUseCase.create(
            new Project(
              values.name,
              values["markdown-directory"],
              values["asset-directory"],
              values["asset-serving-path"]
            )
          );
          if (result.success) {
            toast({
              status: "success",
              title: "Project Created",
              description: "We've set up a project for you.",
            });
            history.push("/project");
          } else {
            switch (result.reason) {
              case "ERROR_CREATE_FILE":
                toast({
                  status: "error",
                  title: "Failed to Create a Project",
                  description:
                    "We couldn't save a project file in a selected directory.",
                });
                break;
              case "NO_OPENED_DIRECTORY":
                toast({
                  status: "warning",
                  title: "No Selected Directory",
                  description:
                    "You need to open a directory before you create a project.",
                });
                history.push("/");
                break;
            }
          }
        },
        [toast, projectUseCase, history]
      )}
    />
  );
};
