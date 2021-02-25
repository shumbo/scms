import { Box, IconButton, Stack } from "@chakra-ui/react";
import hljs from "highlight.js";
import "highlight.js/styles/github-gist.css";
import MarkdownIt from "markdown-it";
import { ChangeEvent, useCallback, useRef, VFC } from "react";
import { FaFileImage } from "react-icons/fa";
import { defaultCommands, Editor, useProvider } from "react-split-mde";
import matter from "gray-matter";

import "wysiwyg.css";
import { editorCss } from "./editor.style";

// minimum markdown renderer for storybook
const md = MarkdownIt({
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

export type MdEditorProps = {
  value: string;
  onChange(newValue: string): void;
  render?: (originalValue: string) => Promise<string>;
  putImage: (file: File) => Promise<string | null>;
};

export const MdEditor: VFC<MdEditorProps> = ({
  value,
  onChange,
  render,
  putImage,
}) => {
  const renderFn =
    render ??
    (async (originalText) => {
      const m = matter(originalText);
      const frontmatterMd =
        Object.keys(m.data).length > 0
          ? "```json\n" + JSON.stringify(m.data, null, 2) + "\n```\n"
          : "";
      return md.render(frontmatterMd + m.content);
    });

  const [mdEmit, MdProvider] = useProvider();
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <MdProvider>
      <Stack>
        <input
          hidden
          type="file"
          ref={inputRef}
          onChange={useCallback(
            async (ev: ChangeEvent<HTMLInputElement>) => {
              if (!ev.target.files) {
                return;
              }
              const file = ev.target.files[0];
              if (!file) {
                return;
              }
              // TODO: Insert loading text and replace later
              const url = await putImage(file);
              if (!url) {
                return;
              }
              mdEmit({ type: "insert", text: `![](${url})` });
            },
            [putImage, mdEmit]
          )}
        />
        <Stack direction="row">
          <IconButton
            aria-label="Add Image"
            icon={<FaFileImage />}
            onClick={useCallback(() => {
              if (!inputRef.current) {
                return;
              }
              inputRef.current.click();
            }, [])}
          />
        </Stack>
        <Box css={editorCss}>
          <Box height="500px">
            <Editor
              previewClassName="wysiwyg"
              value={value}
              onChange={onChange}
              commands={{ ...defaultCommands }}
              parser={renderFn}
            />
          </Box>
        </Box>
      </Stack>
    </MdProvider>
  );
};
