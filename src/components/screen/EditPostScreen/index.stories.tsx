import { action } from "@storybook/addon-actions";
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
Default.args = {
  onSave: (...args) => {
    action("onSave")(...args);
    return new Promise((resolve) => setTimeout(resolve, 2000));
  },
};
