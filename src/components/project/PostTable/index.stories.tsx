import { Meta, Story } from "@storybook/react";

import { Post } from "../../../domain/model/Post/Post";

import { PostTable, PostTableProps } from ".";

const meta: Meta = {
  title: "Project/PostTable",
  component: PostTable,
};

export default meta;

const Template: Story<PostTableProps> = (args) => <PostTable {...args} />;

export const Default = Template.bind({});
Default.args = {
  posts: [new Post("xxx.md"), new Post("yyy.md")],
};
