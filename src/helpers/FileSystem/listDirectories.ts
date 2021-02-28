export async function listDirectories(
  dh: FileSystemDirectoryHandle
): Promise<string[]> {
  let directories = ["/"];
  for await (const [name, handle] of dh.entries()) {
    if (handle.kind === "directory") {
      directories = [
        ...directories,
        ...(await listDirectories(handle)).map((dir) => "/" + name + dir),
      ];
    }
  }
  return directories;
}
