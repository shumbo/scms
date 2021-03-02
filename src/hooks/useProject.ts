import { useEffect, useState } from "react";

import { useInjection } from "../context/Inversify";
import { Project } from "../domain/model/Project/project";
import { TYPES } from "../TYPES";
import { ProjectUseCase } from "../UseCase/InputPort/ProjectUseCase";

export function useProject(): [Project | undefined] {
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
  return [project];
}
