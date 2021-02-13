import { Project } from "../../domain/model/Project/project";

export interface ProjectUseCase {
  open(): Promise<ProjectUseCase.OpenResult>;
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
}
