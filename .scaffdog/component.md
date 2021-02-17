---
name: "component"
root: "src/components"
output: "**/*"
ignore: []
questions:
  name: "Please enter component name"
---

# `{{ inputs.name | pascal }}/index.tsx`

```tsx
import { VFC } from "react";

export type {{ inputs.name | pascal }}Props = {};

export const {{ inputs.name | pascal }}: VFC<{{ inputs.name | pascal }}Props> = () => {
  return null;
};

```

# `{{ inputs.name | pascal }}/index.stories.tsx`

```tsx
{{- inputs.name | pascal | define "componentName" -}}
import { Meta, Story } from "@storybook/react";

import { {{ inputs.name | pascal }}Props, {{ inputs.name | pascal }} } from ".";

export default {
  title: "{{ output.dir | replace '^src/components/' '' | replace componentName '' | pascal }}/{{ inputs.name | pascal }}",
  component: {{ inputs.name | pascal }},
} as Meta;

const Template: Story<{{ inputs.name | pascal }}Props> = (args) => (
  <{{ inputs.name | pascal }} {...args} />
);

export const Default = Template.bind({});
Default.args = {};

```
