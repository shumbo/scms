import { Meta, Story } from "@storybook/react";
import { StoryFnReactReturnType } from "@storybook/react/dist/client/preview/types";
import { FC } from "react";
import { MemoryRouter } from "react-router";

import { ProjectSidebar, ProjectSidebarItem } from ".";

const meta: Meta = {
  title: "Project/ProjectSidebar",
  component: ProjectSidebar,
  subcomponents: { ProjectSidebarItem },
  decorators: [
    (Story: FC): StoryFnReactReturnType => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default meta;

export const Default: Story = (args) => (
  <ProjectSidebar {...args}>
    <ProjectSidebarItem to="/" aria-current="page">
      Home
    </ProjectSidebarItem>
    <ProjectSidebarItem to="/">Articles</ProjectSidebarItem>
    <ProjectSidebarItem to="/">Assets</ProjectSidebarItem>
  </ProjectSidebar>
);
