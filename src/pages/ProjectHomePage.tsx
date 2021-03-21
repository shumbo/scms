import { Box } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";
import { useToast } from "@chakra-ui/toast";
import { Fragment, useCallback, useEffect, useState, VFC } from "react";

import { ProjectConfigFormData } from "../components/project/ProjectConfigForm";
import { EditProjectModal } from "../components/screen/EditProjectModal";
import { ProjectHomeScreen } from "../components/screen/ProjectHomeScreen";
import { useInjection } from "../context/Inversify";
import { Project } from "../domain/model/Project/project";
import { listDirectories } from "../helpers/FileSystem/listDirectories";
import { TYPES } from "../TYPES";
import { ProjectUseCase } from "../UseCase/InputPort/ProjectUseCase";

export const ProjectHomePage: VFC = () => {
  const toast = useToast();
  const projectUseCase = useInjection<ProjectUseCase>(TYPES.ProjectUseCase);

  const [project, setProject] = useState<Project>();
  useEffect(() => {
    let isSubscribed = true;
    (async () => {
      const projectResult = await projectUseCase.getCurrentProject();
      if (!isSubscribed || !projectResult.success) {
        return;
      }
      setProject(projectResult.project);
    })();
    return () => {
      isSubscribed = false;
    };
  }, [projectUseCase]);

  const [directories, setDirectories] = useState<string[] | null>(null);
  useEffect(() => {
    const dh = project?.directoryHandle;
    if (!dh) {
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
  }, [project]);

  const [isOpen, setIsOpen] = useState(false);

  const handleSave = useCallback(
    async (values: ProjectConfigFormData) => {
      if (!project) {
        return;
      }
      const result = await projectUseCase.update(project.directoryHandle, {
        name: values.name,
        markdownDirectory: values["markdown-directory"],
        assetDirectory: values["asset-directory"],
        assetServingPath: values["asset-serving-path"],
      });
      if (!result.success) {
        toast({
          status: "error",
          title: "Failed to update the project",
          description: "We couldn't update the project. Please try again.",
        });
        return;
      }
      toast({
        status: "success",
        title: "Project Updated",
        description: "The project has been updated.",
      });
      setProject(result.project);
      setIsOpen(false);
    },
    [projectUseCase, project, toast]
  );

  return (
    <Box>
      {project ? (
        <Fragment>
          <ProjectHomeScreen
            project={project}
            onEdit={() => {
              setIsOpen(true);
            }}
          />
          <EditProjectModal
            directories={directories ?? []}
            defaultValues={{
              name: project.name,
              "markdown-directory": project.markdownDirectory,
              "asset-directory": project.assetDirectory,
              "asset-serving-path": project.assetServingPath,
            }}
            isOpen={isOpen}
            onClose={() => {
              setIsOpen(false);
            }}
            onSave={handleSave}
          />
        </Fragment>
      ) : (
        <Skeleton />
      )}
    </Box>
  );
};
