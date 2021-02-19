import { Box, IconButton, Stack } from "@chakra-ui/react";
import hljs from "highlight.js";
import "highlight.js/styles/default.css";
import MarkdownIt from "markdown-it";
import { VFC } from "react";
import { FaFileImage } from "react-icons/fa";
import { defaultCommands, Editor } from "react-split-mde";

import "wysiwyg.css";
import { editorCss } from "./editor.style";

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
};

export const MdEditor: VFC<MdEditorProps> = ({ value, onChange }) => {
  return (
    <Stack>
      <Stack direction="row">
        <IconButton aria-label="Add Image" icon={<FaFileImage />} />
      </Stack>
      <Box css={editorCss}>
        <Box height="500px">
          <Editor
            previewClassName="wysiwyg"
            value={value}
            onChange={onChange}
            commands={{ ...defaultCommands }}
            parser={async (originalText) => md.render(originalText)}
          />
        </Box>
      </Box>
    </Stack>
  );
};
