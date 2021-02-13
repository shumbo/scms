import { Project } from "../../domain/model/Project/project";

export interface ProjectUseCase {
  open(): Promise<ProjectUseCase.OpenResult>;
  create(project: Project): Promise<ProjectUseCase.CreateResult>;
}

export namespace ProjectUseCase {
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
