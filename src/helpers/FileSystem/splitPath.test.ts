import { splitPath } from "./splitPath";

describe("splitPath", () => {
  test("begins with slash", () => {
    expect(splitPath("/dir1/dir2")).toEqual(["dir1", "dir2"]);
  });
  test("ends with slash", () => {
    expect(splitPath("dir1/dir2/")).toEqual(["dir1", "dir2"]);
  });
  test("begins and ends with slash", () => {
    expect(splitPath("/dir1/dir2/")).toEqual(["dir1", "dir2"]);
  });
  test("empty string", () => {
    expect(splitPath("")).toEqual([]);
  });
});
