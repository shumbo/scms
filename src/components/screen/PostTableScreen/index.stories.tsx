import { Meta, Story } from "@storybook/react";

import { Post } from "../../../domain/model/Post/Post";

import { PostTableScreenProps, PostTableScreen } from ".";

export default {
  title: "Screen/PostTableScreen",
  component: PostTableScreen,
} as Meta;

const Template: Story<PostTableScreenProps> = (args) => (
  <PostTableScreen {...args} />
);

export const Default = Template.bind({});
Default.args = {
  posts: [new Post("xxx.md"), new Post("yyy.md")],
};

export const Empty = Template.bind({});
Empty.args = {
  posts: [],
};

export const Loading = Template.bind({});
Loading.args = {
  posts: null,
};
