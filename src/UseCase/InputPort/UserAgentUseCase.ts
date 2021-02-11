import { UserAgent } from "../../domain/model/UserAgent";

export interface UserAgentUseCase {
  get(): UserAgent;
}
