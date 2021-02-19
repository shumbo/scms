import { Meta, Story } from "@storybook/react";

import { EditPostScreenProps, EditPostScreen } from ".";

export default {
  title: "Screen/EditPostScreen",
  component: EditPostScreen,
} as Meta;

const Template: Story<EditPostScreenProps> = (args) => (
  <EditPostScreen {...args} />
);

export const Default = Template.bind({});
Default.args = {};
