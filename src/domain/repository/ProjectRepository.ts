import { Result } from "../../helpers/Types/Result";
import { Project, ProjectConfig } from "../model/Project/project";

export interface ProjectRepository {
  open(): Promise<ProjectRepository.OpenResult>;
  create(
    dh: FileSystemDirectoryHandle,
    config: ProjectConfig
  ): Promise<ProjectRepository.CreateResult>;
  update(
    dh: FileSystemDirectoryHandle,
    config: ProjectConfig
  ): Promise<ProjectRepository.UpdateResult>;
  close(): void;
  getCurrentProject(): Promise<ProjectRepository.GetCurrentProjectResult>;
  hasOpenedProject(): Promise<boolean>;
}

export namespace ProjectRepository {
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
  export type CreateResult = { success: true; project: Project } | CreateError;

  type UpdateError = {
    success: false;
    reason:
      | "NO_MARKDOWN_DIRECTORY"
      | "NO_ASSET_DIRECTORY"
      | "ERROR_UPDATE_FILE";
  };
  export type UpdateResult = { success: true; project: Project } | UpdateError;

  type GetCurrentProjectError =
    | {
        reason: "NO_SAVED_DIRECTORY";
      }
    | LoadProjectError;
  export type GetCurrentProjectResult = Result<
    { project: Project },
    GetCurrentProjectError
  >;
}
