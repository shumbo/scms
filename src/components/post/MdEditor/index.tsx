import { Box, IconButton, Stack } from "@chakra-ui/react";
import { VFC } from "react";
import { FaFileImage } from "react-icons/fa";
import { defaultCommands, Editor } from "react-split-mde";
import "wysiwyg.css";

import { editorCss } from "./editor.style";

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
          />
        </Box>
      </Box>
    </Stack>
  );
};
