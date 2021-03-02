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
import { PostUseCase } from "./UseCase/InputPort/PostUseCase";
import { PostInteractor } from "./UseCase/Interactor/PostInteractor";
import { PostRepository } from "./domain/repository/PostRepository";
import { PostRepositoryImpl } from "./Repository/PostRepository/PostRepositoryImpl";
import { AssetRepository } from "./domain/repository/AssetRepository";
import { AssetRepositoryImpl } from "./Repository/AssetRepository/AssetRepositoryImpl";

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
container
  .bind<PostUseCase>(TYPES.PostUseCase)
  .to(PostInteractor)
  .inSingletonScope();

// Repository
container
  .bind<UserAgentRepository>(TYPES.UserAgentRepository)
  .to(UserAgentRepositoryImpl);
container
  .bind<ProjectRepository>(TYPES.ProjectRepository)
  .to(ProjectRepositoryImpl)
  .inSingletonScope();
container
  .bind<PostRepository>(TYPES.PostRepository)
  .to(PostRepositoryImpl)
  .inSingletonScope();
container
  .bind<AssetRepository>(TYPES.AssetRepository)
  .to(AssetRepositoryImpl)
  .inSingletonScope();

// Service
container
  .bind<MarkdownService>(TYPES.MarkdownService)
  .to(MarkdownServiceImpl)
  .inSingletonScope();
