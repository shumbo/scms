import { Post } from "../../domain/model/Post/Post";
import { Project } from "../../domain/model/Project/project";
import { Result } from "../../helpers/Types/Result";

export interface PostUseCase {
  list(project: Project): Promise<PostUseCase.ListResult>;
  get(project: Project, filepath: string): Promise<PostUseCase.GetResult>;
  save(
    project: Project,
    post: Post,
    content: string
  ): Promise<PostUseCase.SaveResult>;
  create(
    project: Project,
    path: string,
    content: string
  ): Promise<PostUseCase.CreateResult>;
}

export namespace PostUseCase {
  export type ListResult = Result<{ posts: Post[] }, { reason: never }>;
  export type GetResult = Result<{ post: Post }, { reason: "NO_SUCH_FILE" }>;
  export type SaveResult = Result<unknown, { reason: "NO_SUCH_FILE" }>;
  export type CreateResult = Result<void, { reason: "ALREADY_EXISTS" }>;
}
