import { inject, injectable } from "inversify";

import { Project, ProjectConfig } from "../../domain/model/Project/project";
import { AssetRepository } from "../../domain/repository/AssetRepository";
import { ProjectRepository } from "../../domain/repository/ProjectRepository";
import { MarkdownService } from "../../domain/service/MarkdownService";
import { TYPES } from "../../TYPES";
import { ProjectUseCase } from "../InputPort/ProjectUseCase";

@injectable()
export class ProjectInteractor implements ProjectUseCase {
  constructor(
    @inject(TYPES.ProjectRepository)
    private projectRepository: ProjectRepository,
    @inject(TYPES.AssetRepository)
    private assetRepository: AssetRepository,
    @inject(TYPES.MarkdownService)
    private markdownService: MarkdownService
  ) {}
  async open(): Promise<ProjectUseCase.OpenResult> {
    const result = await this.projectRepository.open();
    return result;
  }
  async create(
    dh: FileSystemDirectoryHandle,
    config: ProjectConfig
  ): Promise<ProjectUseCase.CreateResult> {
    const result = await this.projectRepository.create(dh, config);
    return result;
  }
  async update(
    dh: FileSystemDirectoryHandle,
    config: ProjectConfig
  ): Promise<ProjectUseCase.UpdateResult> {
    const result = await this.projectRepository.update(dh, config);
    return result;
  }
  async getCurrentProject(): Promise<ProjectUseCase.GetCurrentProjectResult> {
    return this.projectRepository.getCurrentProject();
  }
  async hasOpenedProject(): Promise<boolean> {
    return this.projectRepository.hasOpenedProject();
  }
  async render(project: Project, originalText: string): Promise<string> {
    return this.markdownService.render(project, originalText);
  }
  async putAsset(
    project: Project,
    file: File
  ): Promise<ProjectUseCase.PutAssetResult> {
    return this.assetRepository.put(project, file);
  }
}
