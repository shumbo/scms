import { Story } from "@storybook/react/types-6-0";
import { WelcomeScreen } from ".";

export default {
  title: "Screen/WelcomeScreen",
  component: WelcomeScreen,
};

const Template: Story<{}> = (args) => <WelcomeScreen {...args} />;

export const Default = Template.bind({});
