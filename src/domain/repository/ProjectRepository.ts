import { Project } from "../model/Project/project";

export interface ProjectRepository {
  open(): Promise<ProjectRepository.OpenResult>;
}

export namespace ProjectRepository {
  export type OpenResult =
    | { success: true; project: Project }
    | {
        success: false;
        reason:
          | "NO_DIRECTORY_SELECTED"
          | "NO_CONFIG_FILE"
          | "INVALID_CONFIG_FILE";
      };
}
