import { listFiles } from "./listFiles";

function mockDh(entries: [string, FileSystemHandle][]) {
  return ({
    kind: "directory",
    entries() {
      return entries;
    },
  } as unknown) as FileSystemDirectoryHandle;
}

function mockFh() {
  return ({
    kind: "file",
  } as unknown) as FileSystemDirectoryHandle;
}

describe("listFiles", () => {
  test("general", async () => {
    const dh = mockDh([["file.txt", mockFh()]]);
    expect(listFiles(dh)).resolves.toEqual([
      { path: "/file.txt", handle: { kind: "file" } },
    ]);
  });
  test("empty base", async () => {
    const dh = mockDh([]);
    expect(listFiles(dh)).resolves.toEqual([]);
  });
  test("empty directory", async () => {
    const dh = mockDh([["empty", mockDh([])]]);
    expect(listFiles(dh)).resolves.toEqual([]);
  });
  test("subdirectory", async () => {
    const dh = mockDh([
      ["file.txt", mockFh()],
      ["foo", mockDh([["bar", mockDh([["baz", mockFh()]])]])],
    ]);
    expect(listFiles(dh)).resolves.toEqual([
      { path: "/file.txt", handle: { kind: "file" } },
      { path: "/foo/bar/baz", handle: { kind: "file" } },
    ]);
  });
});
