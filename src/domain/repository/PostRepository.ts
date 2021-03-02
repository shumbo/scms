import { Result } from "../../helpers/Types/Result";
import { Post } from "../model/Post/Post";
import { Project } from "../model/Project/project";

export interface PostRepository {
  list(project: Project): Promise<PostRepository.ListResult>;
  get(project: Project, filepath: string): Promise<PostRepository.GetResult>;
  save(
    project: Project,
    post: Post,
    content: string
  ): Promise<PostRepository.SaveResult>;
  create(
    project: Project,
    filepath: string,
    content: string
  ): Promise<PostRepository.CreateResult>;
}

export namespace PostRepository {
  export type ListResult = Result<{ posts: Post[] }, { reason: never }>;
  type GetError = {
    reason: "NO_SUCH_FILE";
  };
  export type GetResult = Result<{ post: Post }, GetError>;
  type SaveError = { reason: "NO_SUCH_FILE" };
  export type SaveResult = Result<unknown, SaveError>; // FIXME: unknown should be better typed
  type CreateError = { reason: "ALREADY_EXISTS" };
  export type CreateResult = Result<unknown, CreateError>;
}
