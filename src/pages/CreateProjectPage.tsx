import { useToast } from "@chakra-ui/toast";
import { useCallback, useEffect, useMemo, useState, VFC } from "react";
import { useHistory, useLocation } from "react-router";

import { CreateProjectScreen } from "../components/screen/CreateProjectScreen";
import { useInjection } from "../context/Inversify";
import { listDirectories } from "../helpers/FileSystem/listDirectories";
import { TYPES } from "../TYPES";
import { ProjectUseCase } from "../UseCase/InputPort/ProjectUseCase";

export const CreateProjectPage: VFC = () => {
  const history = useHistory();
  const location = useLocation();
  const projectUseCase = useInjection<ProjectUseCase>(TYPES.ProjectUseCase);
  const toast = useToast();
  const dh = useMemo(() => {
    if (!location.state) {
      return null;
    }
    const state = location.state as { dh?: FileSystemDirectoryHandle };
    if (!state.dh) {
      return null;
    }
    return state.dh;
  }, [location]);
  const [directories, setDirectories] = useState<string[] | null>(null);
  useEffect(() => {
    if (dh === null) {
      history.push("/");
      return;
    }
    let subscribed = true;
    listDirectories(dh).then((dirs) => {
      if (subscribed) {
        setDirectories(
          dirs.filter(
            (dir) => !dir.includes("node_modules") && !dir.includes(".git")
          )
        );
      }
    });
    return () => {
      subscribed = false;
    };
  }, [dh, history]);
  return (
    <CreateProjectScreen
      directories={directories ?? []}
      onSubmit={useCallback(
        async (values) => {
          if (!dh) {
            return;
          }
          const result = await projectUseCase.create(dh, {
            name: values.name,
            markdownDirectory: values["markdown-directory"],
            assetDirectory: values["asset-directory"],
            assetServingPath: values["asset-serving-path"],
          });
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
            }
          }
        },
        [toast, projectUseCase, history, dh]
      )}
    />
  );
};
