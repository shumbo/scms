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
import { MarkdownService } from "./domain/service/MarkdownService";
import { MarkdownServiceImpl } from "./service/MarkdownService/MarkdownServiceImpl";

export const container = new Container();

// UseCases
container
  .bind<UserAgentUseCase>(TYPES.UserAgentUseCase)
  .to(UserAgentInteractor)
  .inSingletonScope();
container
  .bind<ProjectUseCase>(TYPES.ProjectUseCase)
  .to(ProjectInteractor)
  .inSingletonScope();

// Repository
container
  .bind<UserAgentRepository>(TYPES.UserAgentRepository)
  .to(UserAgentRepositoryImpl);
container
  .bind<ProjectRepository>(TYPES.ProjectRepository)
  .to(ProjectRepositoryImpl)
  .inSingletonScope();

// Service
container
  .bind<MarkdownService>(TYPES.MarkdownService)
  .to(MarkdownServiceImpl)
  .inSingletonScope();
