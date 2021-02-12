import "reflect-metadata";
import { Container } from "inversify";

import { UserAgentRepository } from "./domain/repository/UserAgentRepository";
import { UserAgentRepositoryImpl } from "./Repository/UserAgentRepository.ts/UserAgentRepositoryImpl";
import { UserAgentUseCase } from "./UseCase/InputPort/UserAgentUseCase";
import { UserAgentInteractor } from "./UseCase/Interactor/UserAgentInteractor";
import { TYPES } from "./TYPES";

export const container = new Container();

// UseCases
container
  .bind<UserAgentUseCase>(TYPES.UserAgentUseCase)
  .to(UserAgentInteractor);

// Repository
container
  .bind<UserAgentRepository>(TYPES.UserAgentRepository)
  .to(UserAgentRepositoryImpl);
