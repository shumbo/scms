---
name: "page"
root: "src/pages"
output: "**/*"
ignore: []
questions:
  name: "Please enter page name (without `Page` suffix)."
---

# `{{ inputs.name }}Page.tsx`

```tsx
import { VFC } from "react";

export type {{ inputs.name | pascal }}PageProps = {};

export const {{ inputs.name | pascal }}Page: VFC<{{ inputs.name | pascal }}PageProps> = () => {
  return null;
};
```
