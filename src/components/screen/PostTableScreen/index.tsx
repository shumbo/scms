import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  Skeleton,
  Stack,
} from "@chakra-ui/react";
import { Fragment, MouseEventHandler, VFC } from "react";

import { Post } from "../../../domain/model/Post/Post";
import { PostTable } from "../../project/PostTable";

export type PostTableScreenProps = {
  posts: Post[] | null;
  onCreate: MouseEventHandler;
  onEdit(filepath: string): void;
};

export const PostTableScreen: VFC<PostTableScreenProps> = ({
  posts,
  onCreate,
  onEdit,
}) => {
  return (
    <Fragment>
      <Box width="100%" p="16">
        <HStack justifyContent="space-between">
          <Heading>Posts</Heading>
          <Button onClick={onCreate} colorScheme="purple">
            New Post
          </Button>
        </HStack>
        <Divider my="4"></Divider>
        {posts ? (
          posts.length > 0 ? (
            <PostTable posts={posts} onEdit={onEdit} />
          ) : (
            <Alert
              status="info"
              variant="subtle"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
            >
              <AlertIcon boxSize="40px" mr={0} />
              <AlertTitle mt={4} mb={1} fontSize="lg">
                No Posts
              </AlertTitle>
              <AlertDescription maxWidth="md">
                Click &quot;New Post&quot; to create a new post, or review
                markdown directory of your project.
              </AlertDescription>
            </Alert>
          )
        ) : (
          <Stack>
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
          </Stack>
        )}
      </Box>
    </Fragment>
  );
};
