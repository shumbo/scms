import { Result } from "../../helpers/Types/Result";
import { Asset } from "../model/Asset/Asset";
import { Project } from "../model/Project/project";

export interface AssetRepository {
  get(project: Project, path: string): Promise<AssetRepository.GetResult>;
  put(project: Project, content: File): Promise<AssetRepository.PutResult>;
}

export namespace AssetRepository {
  type GetError = { reason: "NO_SUCH_FILE" };
  export type GetResult = Result<{ asset: Asset }, GetError>;
  type PutError = { reason: "ALREADY_EXISTS" };
  export type PutResult = Result<{ url: string }, PutError>;
}
