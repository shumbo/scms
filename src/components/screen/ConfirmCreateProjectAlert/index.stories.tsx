import { Meta, Story } from "@storybook/react";

import { ConfirmCreateProjectAlertProps, ConfirmCreateProjectAlert } from ".";

export default {
  title: "Screen/ConfirmCreateProjectAlert",
  component: ConfirmCreateProjectAlert,
} as Meta;

const Template: Story<ConfirmCreateProjectAlertProps> = (args) => (
  <ConfirmCreateProjectAlert {...args} />
);

export const Default = Template.bind({});
Default.args = {
  directoryName: "sample-blog",
};
