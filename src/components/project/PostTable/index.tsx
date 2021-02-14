import { Button } from "@chakra-ui/button";
import { Table, Tbody, Td, Thead, Tr } from "@chakra-ui/table";
import { VFC } from "react";

import { Post } from "../../../domain/model/Post/Post";

export type PostTableProps = {
  posts: Post[];
};

export const PostTable: VFC<PostTableProps> = ({ posts }) => {
  return (
    <Table variant="striped">
      <Thead>
        <Tr>
          <Td>File</Td>
          <Td>Action</Td>
        </Tr>
      </Thead>
      <Tbody>
        {posts.map((post) => (
          <Tr key={post.filename}>
            <Td>{post.filename}</Td>
            <Td>
              <Button colorScheme="purple">Edit</Button>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
