import { Text } from "@chakra-ui/react";
import { Fragment, VFC } from "react";

import { Post } from "../../../domain/model/Post/Post";
import { PostTable } from "../../project/PostTable";

export type PostTableScreenProps = {
  posts: Post[] | null;
};

export const PostTableScreen: VFC<PostTableScreenProps> = ({ posts }) => {
  return (
    <Fragment>
      {posts && posts.length > 0 ? (
        <PostTable posts={posts} />
      ) : (
        <Text>No Posts</Text>
      )}
    </Fragment>
  );
};
