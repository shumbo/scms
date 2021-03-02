import { inject, injectable } from "inversify";

import { Post } from "../../domain/model/Post/Post";
import { Project } from "../../domain/model/Project/project";
import { PostRepository } from "../../domain/repository/PostRepository";
import { TYPES } from "../../TYPES";
import { PostUseCase } from "../InputPort/PostUseCase";

@injectable()
export class PostInteractor implements PostUseCase {
  constructor(
    @inject(TYPES.PostRepository) private postRepository: PostRepository
  ) {}
  async list(project: Project): Promise<PostUseCase.ListResult> {
    return this.postRepository.list(project);
  }
  get(project: Project, filepath: string): Promise<PostUseCase.GetResult> {
    return this.postRepository.get(project, filepath);
  }
  save(
    project: Project,
    post: Post,
    content: string
  ): Promise<PostUseCase.SaveResult> {
    return this.postRepository.save(project, post, content);
  }
  async create(
    project: Project,
    path: string,
    content: string
  ): Promise<PostUseCase.CreateResult> {
    return this.postRepository.create(project, path, content);
  }
}
