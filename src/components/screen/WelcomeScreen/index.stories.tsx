import { Meta, Story } from "@storybook/react";
import { WelcomeScreen, WelcomeScreenProps } from ".";

export default {
  title: "Screen/WelcomeScreen",
  component: WelcomeScreen,
} as Meta;

const Template: Story<WelcomeScreenProps> = (args) => (
  <WelcomeScreen {...args} />
);

export const Default = Template.bind({});
