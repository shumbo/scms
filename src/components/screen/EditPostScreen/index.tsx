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
  filename: string;
  value: string;
  onChange(newValue: string): void;
  onSave(): Promise<void>;
};

export const EditPostScreen: VFC<EditPostScreenProps> = ({
  onSave,
  onChange,
  value,
  filename,
}) => {
  return (
    <Box width="100%" p="16">
      <HStack justifyContent="space-between">
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink>Posts</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink isCurrentPage>{filename}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Button onClick={onSave} colorScheme="purple">
          Save
        </Button>
      </HStack>
      <Divider my="4" />
      <MdEditor value={value} onChange={onChange} />
    </Box>
  );
};