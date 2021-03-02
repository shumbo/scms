import { Project, ProjectConfig } from "../../domain/model/Project/project";
import { Result } from "../../helpers/Types/Result";

export interface ProjectUseCase {
  open(): Promise<ProjectUseCase.OpenResult>;
  create(
    baseDh: FileSystemDirectoryHandle,
    projectConfig: ProjectConfig
  ): Promise<ProjectUseCase.CreateResult>;
  getCurrentProject(): Promise<ProjectUseCase.GetCurrentProjectResult>;
  hasOpenedProject(): Promise<boolean>;
  render(project: Project, originalText: string): Promise<string>;
  putAsset(
    project: Project,
    file: File
  ): Promise<ProjectUseCase.PutAssetResult>;
}
export namespace ProjectUseCase {
  type LoadProjectError =
    | {
        reason:
          | "INVALID_CONFIG_FILE"
          | "NO_MARKDOWN_DIRECTORY"
          | "NO_ASSET_DIRECTORY";
      }
    | { reason: "NO_CONFIG_FILE"; directoryHandle: FileSystemDirectoryHandle };

  type OpenError =
    | {
        reason: "NO_DIRECTORY_SELECTED";
      }
    | LoadProjectError;

  export type OpenResult = Result<{ project: Project }, OpenError>;

  type CreateError = {
    success: false;
    reason:
      | "NO_MARKDOWN_DIRECTORY"
      | "NO_ASSET_DIRECTORY"
      | "ERROR_CREATE_FILE";
  };
  export type CreateResult = { success: true } | CreateError;

  type GetCurrentProjectError =
    | {
        reason: "NO_SAVED_DIRECTORY" | "NO_CONFIG_FILE";
      }
    | LoadProjectError;
  export type GetCurrentProjectResult = Result<
    { project: Project },
    GetCurrentProjectError
  >;

  type PutAssetError = { reason: string };
  export type PutAssetResult = Result<{ url: string }, PutAssetError>;
}
