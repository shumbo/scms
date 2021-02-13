import { Project } from "../model/Project/project";

export interface ProjectRepository {
  open(): Promise<ProjectRepository.OpenResult>;
  create(project: Project): Promise<ProjectRepository.CreateResult>;
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
  export type CreateResult =
    | { success: true }
    | { success: false; reason: "NO_OPENED_DIRECTORY" | "ERROR_CREATE_FILE" };
}
