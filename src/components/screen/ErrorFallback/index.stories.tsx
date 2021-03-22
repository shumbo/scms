import { Meta, Story } from "@storybook/react";

import { ErrorFallbackProps, ErrorFallback } from ".";

export default {
  title: "Screen/ErrorFallback",
  component: ErrorFallback,
} as Meta;

const Template: Story<ErrorFallbackProps> = (args) => (
  <ErrorFallback {...args} />
);

export const Default = Template.bind({});
Default.args = {
  error: {
    name: "DOMException",
    message: "User activation is required to request permissions.",
  },
};
