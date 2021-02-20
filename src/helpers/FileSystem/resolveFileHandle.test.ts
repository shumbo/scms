import { resolveFileHandle } from "./resolveFileHandle";

describe("resolveFileHandle", () => {
  test("just file", () => {
    const mockDh = ({
      getFileHandle() {
        return Promise.resolve({
          name: "index.md",
        });
      },
    } as unknown) as FileSystemDirectoryHandle;
    expect(resolveFileHandle(mockDh, "index.md")).resolves.toEqual({
      name: "index.md",
    });
  });
  test("directories", () => {
    const mockDh = ({
      getDirectoryHandle() {
        return Promise.resolve({
          name: "dirA",
          getDirectoryHandle() {
            return Promise.resolve({
              name: "dirB",
              getFileHandle() {
                return Promise.resolve({
                  name: "index.md",
                });
              },
            });
          },
        });
      },
    } as unknown) as FileSystemDirectoryHandle;
    expect(resolveFileHandle(mockDh, "dirA/dirB/index.md")).resolves.toEqual({
      name: "index.md",
    });
  });
  test("invalid filename", () => {
    expect(
      resolveFileHandle(({} as unknown) as FileSystemDirectoryHandle, "")
    ).rejects.toThrowError();
  });
});
