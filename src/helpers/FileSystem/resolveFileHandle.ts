import { resolveDirectoryHandle } from "./resolveDirectoryHandle";
import { splitPath } from "./splitPath";

export async function resolveFileHandle(
  dh: FileSystemDirectoryHandle,
  path: string,
  options?: FileSystemGetFileOptions
): Promise<FileSystemFileHandle> {
  const pathArr = splitPath(path);
  const [filename] = pathArr.slice(pathArr.length - 1);
  if (!filename) {
    throw new Error("Invalid filename");
  }
  const parentDirPath = pathArr.slice(0, pathArr.length - 1);
  const parentDir = await resolveDirectoryHandle(dh, parentDirPath.join("/"));
  return parentDir.getFileHandle(filename, options);
}
