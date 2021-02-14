export function splitPath(path: string): string[] {
  return path.split("/").filter((str) => !!str);
}
