import { Meta, Story } from "@storybook/react";

import { AssetScreen } from ".";

export default {
  title: "Screen/AssetScreen",
  component: AssetScreen,
} as Meta;

const Template: Story = (args) => <AssetScreen {...args} />;

export const Default = Template.bind({});
Default.args = {};
