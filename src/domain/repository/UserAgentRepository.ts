import { UserAgent } from "../model/UserAgent";

export interface UserAgentRepository {
  get(): UserAgent;
}
