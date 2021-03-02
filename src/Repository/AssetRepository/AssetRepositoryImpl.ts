import { injectable } from "inversify";

import { Asset } from "../../domain/model/Asset/Asset";
import { Project } from "../../domain/model/Project/project";
import { AssetRepository } from "../../domain/repository/AssetRepository";
import { resolveFileHandle } from "../../helpers/FileSystem/resolveFileHandle";

@injectable()
export class AssetRepositoryImpl implements AssetRepository {
  async get(
    project: Project,
    path: string
  ): Promise<AssetRepository.GetResult> {
    let fileHandle: FileSystemFileHandle;
    try {
      // asset path is URL encoded and needs to be decoded to reach the file
      fileHandle = await resolveFileHandle(
        project.assetDirectoryHandle,
        decodeURI(path)
      );
    } catch {
      return { success: false, reason: "NO_SUCH_FILE" };
    }
    const file = await fileHandle.getFile();
    return { success: true, asset: new Asset(path, file) };
  }
  async put(
    project: Project,
    content: File
  ): Promise<AssetRepository.PutResult> {
    const fileHandle = await project.assetDirectoryHandle.getFileHandle(
      content.name,
      {
        create: true,
      }
    );
    const writable = await fileHandle.createWritable();
    const buffer = await content.arrayBuffer();
    await writable.write(buffer);
    await writable.close();
    return { success: true, url: encodeURI(`/${content.name}`) };
  }
}
