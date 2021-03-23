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
import { Link } from "react-router-dom";

import { MdEditor } from "../../post/MdEditor";

export type EditPostScreenProps = {
  filename: string;
  value: string;
  onChange(newValue: string): void;
  onSave(): Promise<void>;
  render(originalText: string): Promise<string>;
  putImage: (file: File) => Promise<string | null>;
};

export const EditPostScreen: VFC<EditPostScreenProps> = ({
  onSave,
  onChange,
  value,
  filename,
  render,
  putImage,
}) => {
  return (
    <Box width="100%" p="16">
      <HStack justifyContent="space-between">
        <Breadcrumb separator="-">
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to="/project/posts">
              Posts
            </BreadcrumbLink>
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
      <MdEditor
        value={value}
        onChange={onChange}
        render={render}
        putImage={putImage}
        onSave={onSave}
      />
    </Box>
  );
};
