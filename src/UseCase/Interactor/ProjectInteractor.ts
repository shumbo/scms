import { inject, injectable } from "inversify";

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
}
