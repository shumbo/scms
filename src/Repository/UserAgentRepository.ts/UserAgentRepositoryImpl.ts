import { injectable } from "inversify";
import { UserAgent } from "../../domain/model/UserAgent";
import { UserAgentRepository } from "../../domain/repository/UserAgentRepository";

@injectable()
export class UserAgentRepositoryImpl implements UserAgentRepository {
  get(): UserAgent {
    return new UserAgent(window.navigator.userAgent);
  }
}
