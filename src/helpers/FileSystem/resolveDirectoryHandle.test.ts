import { resolveDirectoryHandle } from "./resolveDirectoryHandle";

describe("resolveDirectoryHandle", () => {
  test("normal", () => {
    const mockDh = ({
      getDirectoryHandle() {
        return Promise.resolve({
          name: "dirA",
          getDirectoryHandle() {
            return Promise.resolve({
              name: "dirB",
              getDirectoryHandle() {
                return Promise.resolve({
                  name: "dirC",
                });
              },
            });
          },
        });
      },
    } as unknown) as FileSystemDirectoryHandle;
    expect(resolveDirectoryHandle(mockDh, "dirA/dirB/dirC")).resolves.toEqual({
      name: "dirC",
    });
  });
});
