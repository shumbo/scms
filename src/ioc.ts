import "reflect-metadata";
import { Container } from "inversify";

import { UserAgentRepository } from "./domain/repository/UserAgentRepository";
import { UserAgentRepositoryImpl } from "./Repository/UserAgentRepository.ts/UserAgentRepositoryImpl";
import { UserAgentUseCase } from "./UseCase/InputPort/UserAgentUseCase";
import { UserAgentInteractor } from "./UseCase/Interactor/UserAgentInteractor";
import { TYPES } from "./TYPES";
import { ProjectUseCase } from "./UseCase/InputPort/ProjectUseCase";
import { ProjectInteractor } from "./UseCase/Interactor/ProjectInteractor";
import { ProjectRepository } from "./domain/repository/ProjectRepository";
import { ProjectRepositoryImpl } from "./Repository/ProjectRepository/ProjectRepositoryImpl";

export const container = new Container();

// UseCases
container
  .bind<UserAgentUseCase>(TYPES.UserAgentUseCase)
  .to(UserAgentInteractor);
container.bind<ProjectUseCase>(TYPES.ProjectUseCase).to(ProjectInteractor);

// Repository
container
  .bind<UserAgentRepository>(TYPES.UserAgentRepository)
  .to(UserAgentRepositoryImpl);
container
  .bind<ProjectRepository>(TYPES.ProjectRepository)
  .to(ProjectRepositoryImpl)
  .inSingletonScope();
