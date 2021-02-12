import { action } from "@storybook/addon-actions";
import { Meta, Story } from "@storybook/react";

import { CreateProjectScreen, CreateProjectScreenProps } from ".";

export default {
  title: "Screen/CreateProjectScreen",
  component: CreateProjectScreen,
} as Meta;

const Template: Story<CreateProjectScreenProps> = (args) => (
  <CreateProjectScreen {...args} />
);

export const Default = Template.bind({});
Default.args = {
  onSubmit: (value) => {
    action("onSubmit")(value);
    return new Promise((resolve) => setTimeout(resolve, 2000));
  },
};
