import { Meta, Story } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { withRHF } from "../../utils/withRHF";

import { CreatePostAlertProps, CreatePostAlert } from ".";

export default {
  title: "Screen/CreatePostAlert",
  component: CreatePostAlert,
  decorators: [withRHF(false)],
} as Meta;

const Template: Story<CreatePostAlertProps> = (args) => (
  <CreatePostAlert {...args} />
);

export const Default = Template.bind({});
Default.args = {
  onCreate: (filename) => {
    action("onCreate")(filename);
    return new Promise((resolve) => setTimeout(resolve, 2000));
  },
};
