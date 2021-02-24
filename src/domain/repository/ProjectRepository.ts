import { Post } from "../model/Post/Post";
import { Project } from "../model/Project/project";

export interface ProjectRepository {
  open(): Promise<ProjectRepository.OpenResult>;
  create(project: Project): Promise<ProjectRepository.CreateResult>;
  getCurrentProject(): Promise<ProjectRepository.GetCurrentProjectResult>;
  listPost(): Promise<ProjectRepository.ListPostResult>;
  getPost(filename: string): Promise<ProjectRepository.GetPostResult>;
  savePost(
    filename: string,
    content: string
  ): Promise<ProjectRepository.SavePostResult>;
  getAsset(assetPath: string): Promise<ProjectRepository.GetAssetResult>;
}

export namespace ProjectRepository {
  type OpenError =
    | {
        success: false;
        reason: "NO_DIRECTORY_SELECTED" | "INVALID_CONFIG_FILE";
      }
    | { success: false; reason: "NO_CONFIG_FILE"; directoryName: string };
  export type OpenResult = { success: true; project: Project } | OpenError;
  type CreateError = {
    success: false;
    reason: "NO_OPENED_DIRECTORY" | "ERROR_CREATE_FILE";
  };
  export type CreateResult = { success: true } | CreateError;
  type GetCurrentProjectError = {
    success: false;
    reason: "NO_SAVED_DIRECTORY" | "NO_CONFIG_FILE" | "INVALID_CONFIG_FILE";
  };
  export type GetCurrentProjectResult =
    | { success: true; project: Project }
    | GetCurrentProjectError;
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
  type GetAssetError = {
    success: false;
    reason: "NO_OPENED_PROJECT" | "NO_ASSET_DIRECTORY" | "NO_SUCH_FILE";
  };
  export type GetAssetResult =
    | { success: true; asset: File }
    | GetAssetError
    | GetCurrentProjectError;
}
