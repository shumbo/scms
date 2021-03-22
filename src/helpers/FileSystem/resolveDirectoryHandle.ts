import { splitPath } from "./splitPath";

export async function resolveDirectoryHandle(
  dh: FileSystemDirectoryHandle,
  path: string,
  options?: FileSystemGetDirectoryOptions
): Promise<FileSystemDirectoryHandle> {
  let cursor = dh;
  const directories = splitPath(path);
  for await (const dir of directories) {
    cursor = await cursor.getDirectoryHandle(dir, options);
  }
  return cursor;
}
