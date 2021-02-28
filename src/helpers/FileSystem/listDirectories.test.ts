import { listDirectories } from "./listDirectories";

function mockDh(
  kind: FileSystemHandle["kind"],
  entries: [string, FileSystemHandle][] = []
) {
  return ({
    kind,
    entries() {
      return entries;
    },
  } as unknown) as FileSystemDirectoryHandle;
}

describe("listDirectories", () => {
  test("general", async () => {
    const dh = mockDh("directory", [
      ["foo", mockDh("directory", [["bar", mockDh("directory")]])],
    ]);
    expect(listDirectories(dh)).resolves.toEqual(["/", "/foo/", "/foo/bar/"]);
  });
  test("empty", async () => {
    const dh = mockDh("directory");
    expect(listDirectories(dh)).resolves.toEqual(["/"]);
  });
  test("ignore file", async () => {
    const dh = mockDh("directory", [
      [
        "foo",
        mockDh("directory", [
          ["file", mockDh("file")],
          ["bar", mockDh("directory")],
        ]),
      ],
    ]);
    expect(listDirectories(dh)).resolves.toEqual(["/", "/foo/", "/foo/bar/"]);
  });
});
