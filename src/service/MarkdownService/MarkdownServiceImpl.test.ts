import { ProjectRepositoryImpl } from "../../Repository/ProjectRepository/ProjectRepositoryImpl";

import { MarkdownServiceImpl } from "./MarkdownServiceImpl";

const mr = new MarkdownServiceImpl("TEST_PREFIX_", new ProjectRepositoryImpl());

describe("MarkdownServiceImpl", () => {
  test("can render", () => {
    expect(mr.render("# hello world")).resolves.toContain(
      "<h1>hello world</h1>"
    );
  });
  test("syntax highlight (supported language)", () => {
    expect(
      mr.render("```js\nconsole.log(123);\n```")
    ).resolves.toMatchSnapshot();
  });
  test("syntax highlight (unsupported language)", () => {
    expect(mr.render("```some\nx := x;\n```")).resolves.toMatchSnapshot();
  });
  test("image", () => {
    expect(mr.render("![hello](/hello.png)")).resolves.toContain(
      '<img src="TEST_PREFIX_/hello.png'
    );
  });
});
