import {
  Box,
  HStack,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Divider,
} from "@chakra-ui/react";
import { VFC } from "react";

import { MdEditor } from "../../post/MdEditor";

export type EditPostScreenProps = {
  onSave(): Promise<void>;
};

export const EditPostScreen: VFC<EditPostScreenProps> = ({ onSave }) => {
  return (
    <Box width="100%" p="16">
      <HStack justifyContent="space-between">
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink>Posts</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink isCurrentPage>ArticleNameGoesHere</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Button onClick={onSave} colorScheme="purple">
          Save
        </Button>
      </HStack>
      <Divider my="4"></Divider>
      <MdEditor value={"# hello"} onChange={console.log} />
    </Box>
  );
};
