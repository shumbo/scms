import { Post } from "../model/Post/Post";
import { Project } from "../model/Project/project";

export interface ProjectRepository {
  open(): Promise<ProjectRepository.OpenResult>;
  create(project: Project): Promise<ProjectRepository.CreateResult>;
  getCurrentProject(): Promise<ProjectRepository.GetCurrentProjectResult>;
  listPost(): Promise<ProjectRepository.ListPostResult>;
}

export namespace ProjectRepository {
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
  export type GetCurrentProjectErrorReason =
    | "NO_SAVED_DIRECTORY"
    | "NO_CONFIG_FILE"
    | "INVALID_CONFIG_FILE";
  export type GetCurrentProjectResult =
    | { success: true; project: Project }
    | {
        success: false;
        reason: GetCurrentProjectErrorReason;
      };
  export type ListPostResult =
    | { success: true; posts: Post[] }
    | {
        success: false;
        reason:
          | "NO_OPENED_PROJECT"
          | "NO_MARKDOWN_DIRECTORY"
          | GetCurrentProjectErrorReason;
      };
}
