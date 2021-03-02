import { Result } from "../../helpers/Types/Result";
import { Project, ProjectConfig } from "../model/Project/project";

export interface ProjectRepository {
  open(): Promise<ProjectRepository.OpenResult>;
  create(
    dh: FileSystemDirectoryHandle,
    config: ProjectConfig
  ): Promise<ProjectRepository.CreateResult>;
  getCurrentProject(): Promise<ProjectRepository.GetCurrentProjectResult>;
  hasOpenedProject(): Promise<boolean>;
  /*
  listPost(): Promise<ProjectRepository.ListPostResult>;
  getPost(filename: string): Promise<ProjectRepository.GetPostResult>;
  savePost(
    filename: string,
    content: string
  ): Promise<ProjectRepository.SavePostResult>;
  createPost(
    filename: string,
    content: string
  ): Promise<ProjectRepository.CreatePostResult>;
  getAsset(assetPath: string): Promise<ProjectRepository.GetAssetResult>;
  putAsset(content: File): Promise<ProjectRepository.PutAssetResult>;
  */
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

  type GetCurrentProjectError =
    | {
        reason: "NO_SAVED_DIRECTORY";
      }
    | LoadProjectError;
  export type GetCurrentProjectResult = Result<
    { project: Project },
    GetCurrentProjectError
  >;

  /*
  type ListPostError = {
    success: false;
    reason: "NO_OPENED_PROJECT" | "NO_MARKDOWN_DIRECTORY";
  };
  export type ListPostResult =
    | { success: true; posts: Post[] }
    | GetCurrentProjectError
    | ListPostError;

  type GetPostError = {
    success: false;
    reason: "NO_OPENED_PROJECT" | "NO_MARKDOWN_DIRECTORY" | "NO_SUCH_FILE";
  };
  export type GetPostResult =
    | { success: true; post: File }
    | GetCurrentProjectError
    | GetPostError;
  type SavePostError = {
    success: false;
    reason: "NO_OPENED_PROJECT" | "NO_MARKDOWN_DIRECTORY" | "NO_SUCH_FILE";
  };
  export type SavePostResult =
    | { success: true }
    | GetCurrentProjectError
    | SavePostError;
  type CreatePostError = {
    success: false;
    reason: "NO_OPENED_PROJECT" | "NO_MARKDOWN_DIRECTORY" | "ALREADY_EXISTS";
  };
  export type CreatePostResult =
    | { success: true }
    | GetCurrentProjectError
    | CreatePostError;
  type GetAssetError = {
    success: false;
    reason: "NO_OPENED_PROJECT" | "NO_ASSET_DIRECTORY" | "NO_SUCH_FILE";
  };
  export type GetAssetResult =
    | { success: true; asset: File }
    | GetAssetError
    | GetCurrentProjectError;
  type PutAssetError = {
    success: false;
    reason: "NO_OPENED_PROJECT" | "NO_ASSET_DIRECTORY";
  };
  export type PutAssetResult =
    | { success: true; url: string }
    | GetCurrentProjectError
    | PutAssetError;*/
}
