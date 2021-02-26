import { Post } from "../../domain/model/Post/Post";
import { Project } from "../../domain/model/Project/project";

export interface ProjectUseCase {
  open(): Promise<ProjectUseCase.OpenResult>;
  create(project: Project): Promise<ProjectUseCase.CreateResult>;
  listPost(): Promise<ProjectUseCase.ListPostResult>;
  getPost(filepath: string): Promise<ProjectUseCase.GetPostResult>;
  createPost(
    filepath: string,
    title: string
  ): Promise<ProjectUseCase.CreatePostResult>;
  savePost(
    filepath: string,
    content: string
  ): Promise<ProjectUseCase.SavePostResult>;
  render(originalText: string): Promise<string>;
  putAsset(file: File): Promise<ProjectUseCase.PutAssetResult>;
}
export namespace ProjectUseCase {
  export type OpenResult =
    | { success: true; project: Project }
    | {
        success: false;
        reason: "NO_DIRECTORY_SELECTED" | "INVALID_CONFIG_FILE";
      }
    | { success: false; reason: "NO_CONFIG_FILE"; directoryName: string };
  export type CreateResult =
    | { success: true }
    | { success: false; reason: "NO_OPENED_DIRECTORY" | "ERROR_CREATE_FILE" };
  export type ListPostResult =
    | { success: true; posts: Post[] }
    | {
        success: false;
        reason:
          | "NO_OPENED_PROJECT"
          | "NO_MARKDOWN_DIRECTORY"
          | "NO_SAVED_DIRECTORY"
          | "NO_CONFIG_FILE"
          | "INVALID_CONFIG_FILE";
      };
  export type GetPostResult =
    | { success: true; post: File }
    | {
        success: false;
        reason:
          | "NO_OPENED_PROJECT"
          | "NO_MARKDOWN_DIRECTORY"
          | "NO_SAVED_DIRECTORY"
          | "NO_CONFIG_FILE"
          | "INVALID_CONFIG_FILE"
          | "NO_SUCH_FILE";
      };
  export type CreatePostResult =
    | { success: true }
    | {
        success: false;
        reason:
          | "NO_OPENED_PROJECT"
          | "NO_MARKDOWN_DIRECTORY"
          | "NO_SAVED_DIRECTORY"
          | "NO_CONFIG_FILE"
          | "INVALID_CONFIG_FILE"
          | "ALREADY_EXISTS";
      };
  export type SavePostResult =
    | { success: true }
    | {
        success: false;
        reason:
          | "NO_OPENED_PROJECT"
          | "NO_MARKDOWN_DIRECTORY"
          | "NO_SAVED_DIRECTORY"
          | "NO_CONFIG_FILE"
          | "INVALID_CONFIG_FILE"
          | "NO_SUCH_FILE";
      };
  export type PutAssetResult =
    | { success: true }
    | {
        success: false;
        reason:
          | "NO_OPENED_PROJECT"
          | "NO_ASSET_DIRECTORY"
          | "INVALID_CONFIG_FILE"
          | "NO_CONFIG_FILE"
          | "NO_SAVED_DIRECTORY";
      };
}
