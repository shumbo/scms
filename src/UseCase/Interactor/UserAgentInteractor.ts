import { inject, injectable } from "inversify";

import { UserAgent } from "../../domain/model/UserAgent";
import { UserAgentRepository } from "../../domain/repository/UserAgentRepository";
import { TYPES } from "../../TYPES";
import { UserAgentUseCase } from "../InputPort/UserAgentUseCase";

@injectable()
export class UserAgentInteractor implements UserAgentUseCase {
  constructor(
    @inject(TYPES.UserAgentRepository)
    private userAgentRepository: UserAgentRepository
  ) {}
  get(): UserAgent {
    return this.userAgentRepository.get();
  }
}
