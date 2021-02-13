import { inject, injectable } from "inversify";

import { Project } from "../../domain/model/Project/project";
import { ProjectRepository } from "../../domain/repository/ProjectRepository";
import { TYPES } from "../../TYPES";
import { ProjectUseCase } from "../InputPort/ProjectUseCase";

@injectable()
export class ProjectInteractor implements ProjectUseCase {
  constructor(
    @inject(TYPES.ProjectRepository)
    private projectRepository: ProjectRepository
  ) {}
  async open(): Promise<ProjectUseCase.OpenResult> {
    const result = await this.projectRepository.open();
    return result;
  }
  async create(project: Project): Promise<ProjectUseCase.CreateResult> {
    const result = await this.projectRepository.create(project);
    return result;
  }
}
