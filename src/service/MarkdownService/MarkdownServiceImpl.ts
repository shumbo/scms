import matter from "gray-matter";
import hljs from "highlight.js";
import { inject, injectable } from "inversify";
import MarkdownIt from "markdown-it";
import replaceAsync from "string-replace-async";

import { MarkdownService } from "../../domain/service/MarkdownService";
import { ProjectRepository } from "../../domain/repository/ProjectRepository";
import { TYPES } from "../../TYPES";

import { image_with_prefix } from "./image";

@injectable()
export class MarkdownServiceImpl implements MarkdownService {
  private md: MarkdownIt;
  private matchRegExp: RegExp;
  private prefix = "SCMS_IMAGE_";
  constructor(
    @inject(TYPES.ProjectRepository)
    private projectRepository: ProjectRepository
  ) {
    this.md = MarkdownIt({
      highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return (
              '<pre class="hljs"><code>' +
              hljs.highlight(lang, str, true).value +
              "</code></pre>"
            );
            // eslint-disable-next-line no-empty
          } catch (__) {}
        }
        return (
          '<pre class="hljs"><code>' +
          MarkdownIt().utils.escapeHtml(str) +
          "</code></pre>"
        );
      },
    });
    this.md.inline.ruler.before(
      "emphasis",
      "image",
      image_with_prefix(this.prefix)
    );
    this.matchRegExp = new RegExp(`${this.prefix}[^\\"]*`, "g");
  }
  async render(originalText: string): Promise<string> {
    const m = matter(originalText);
    const frontmatterMd =
      Object.keys(m.data).length > 0
        ? "```json\n" + JSON.stringify(m.data, null, 2) + "\n```\n"
        : "";
    const renderedText = this.md.render(frontmatterMd + m.content);
    console.log(renderedText);

    return replaceAsync(renderedText, this.matchRegExp, async (match) => {
      const path = match.replace(this.prefix, ""); // remove prefix
      const getAssetResult = await this.projectRepository.getAsset(path);
      if (!getAssetResult.success) {
        throw new Error("One of the asset failed to load");
      }
      return URL.createObjectURL(getAssetResult.asset);
    });
  }
}
