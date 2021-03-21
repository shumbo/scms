import { Meta, Story } from "@storybook/react";

import { Project } from "../../../domain/model/Project/project";

import { ProjectHomeScreenProps, ProjectHomeScreen } from ".";

export default {
  title: "Screen/ProjectHomeScreen",
  component: ProjectHomeScreen,
} as Meta;

const Template: Story<ProjectHomeScreenProps> = (args) => (
  <ProjectHomeScreen {...args} />
);

export const Default = Template.bind({});
Default.args = {
  project: ({
    name: "Sample Project",
    markdownDirectory: "/posts",
    assetDirectory: "/assets",
    assetServingPath: "/assets",
  } as unknown) as Project,
};
