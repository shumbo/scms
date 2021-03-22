export type FileEntry = {
  path: string;
  handle: FileSystemFileHandle;
};

export async function listFiles(
  dh: FileSystemDirectoryHandle,
  basePath = "/"
): Promise<FileEntry[]> {
  const entries: FileEntry[] = [];
  for await (const [name, handle] of dh.entries()) {
    switch (handle.kind) {
      case "file": {
        entries.push({ path: `${basePath}${name}`, handle: handle });
        break;
      }
      case "directory": {
        const children = await listFiles(handle, `${basePath}${name}/`);
        entries.push(...children);
        break;
      }
    }
  }
  return entries;
}
