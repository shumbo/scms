import { inject, injectable } from "inversify";

import { Project } from "../../domain/model/Project/project";
import { ProjectRepository } from "../../domain/repository/ProjectRepository";
import { MarkdownService } from "../../domain/service/MarkdownService";
import { TYPES } from "../../TYPES";
import { ProjectUseCase } from "../InputPort/ProjectUseCase";

@injectable()
export class ProjectInteractor implements ProjectUseCase {
  constructor(
    @inject(TYPES.ProjectRepository)
    private projectRepository: ProjectRepository,
    @inject(TYPES.MarkdownService)
    private markdownService: MarkdownService
  ) {}
  async open(): Promise<ProjectUseCase.OpenResult> {
    const result = await this.projectRepository.open();
    return result;
  }
  async create(project: Project): Promise<ProjectUseCase.CreateResult> {
    const result = await this.projectRepository.create(project);
    return result;
  }
  async listPost(): Promise<ProjectUseCase.ListPostResult> {
    const getCurrentProjectResult = await this.projectRepository.getCurrentProject();
    if (!getCurrentProjectResult.success) {
      return getCurrentProjectResult;
    }
    const result = await this.projectRepository.listPost();
    return result;
  }
  getPost(filepath: string): Promise<ProjectUseCase.GetPostResult> {
    return this.projectRepository.getPost(filepath);
  }
  savePost(
    filepath: string,
    content: string
  ): Promise<ProjectUseCase.SavePostResult> {
    return this.projectRepository.savePost(filepath, content);
  }
  async render(originalText: string): Promise<string> {
    return this.markdownService.render(originalText);
  }
  putAsset(file: File): Promise<ProjectUseCase.PutAssetResult> {
    return this.projectRepository.putAsset(file);
  }
}
