import {
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  Table,
  Tbody,
  Td,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Fragment, VFC } from "react";

import { Project } from "../../../domain/model/Project/project";

export type ProjectHomeScreenProps = {
  project: Project;
  onEdit: () => void;
};

export const ProjectHomeScreen: VFC<ProjectHomeScreenProps> = ({
  project,
  onEdit,
}) => {
  return (
    <Fragment>
      <Box width="100%" p="16">
        <HStack justifyContent="space-between">
          <Heading>{project.name}</Heading>
          <Button
            onClick={() => {
              onEdit();
            }}
            colorScheme="purple"
          >
            Edit
          </Button>
        </HStack>
        <Divider my="4" />
        <Table variant="striped">
          <Thead>
            <Tr>
              <Td>Key</Td>
              <Td>Value</Td>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Project Name</Td>
              <Td>{project.name}</Td>
            </Tr>
            <Tr>
              <Td>Markdown Directory</Td>
              <Td>{project.markdownDirectory}</Td>
            </Tr>
            <Tr>
              <Td>Asset Directory</Td>
              <Td>{project.assetDirectory}</Td>
            </Tr>
            <Tr>
              <Td>Asset Serving Path</Td>
              <Td>{project.assetServingPath}</Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>
    </Fragment>
  );
};
