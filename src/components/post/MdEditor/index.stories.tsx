import { Meta, Story } from "@storybook/react";
import { useState } from "react";

import { MdEditorProps, MdEditor } from ".";

export default {
  title: "Content/MarkdownEditor",
  component: MdEditor,
} as Meta;

const Template: Story<MdEditorProps> = (args) => {
  const [value, setValue] = useState("# Sample Text");
  return (
    <MdEditor {...args} value={value} onChange={(text) => setValue(text)} />
  );
};

export const Sample = Template.bind({});
Sample.args = {
  async putImage(file: File) {
    return `https://placehold.jp/24/eeeeee/999999/360x270.png?text=${file.name}`;
  },
};
