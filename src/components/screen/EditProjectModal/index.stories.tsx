import { Meta, Story } from "@storybook/react";

import { EditProjectModalProps, EditProjectModal } from ".";

export default {
  title: "Screen/EditProjectModal",
  component: EditProjectModal,
} as Meta;

const Template: Story<EditProjectModalProps> = (args) => (
  <EditProjectModal {...args} />
);

export const Default = Template.bind({});
Default.args = {
  directories: ["/foo", "/bar", "/foo/bar"],
  defaultValues: {
    name: "Configured Project",
    "markdown-directory": "/bar",
    "asset-directory": "/foo",
    "asset-serving-path": "/foo/bar",
  },
};
