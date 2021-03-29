import { Button } from "@chakra-ui/button";
import { Table, Tbody, Td, Thead, Tr } from "@chakra-ui/table";
import { VFC } from "react";
import format from "date-fns/format";
import { useTranslation } from "react-i18next";

import { Post } from "../../../domain/model/Post/Post";

export type PostTableProps = {
  posts: Post[];
  onEdit(filepath: string): void;
};

export const PostTable: VFC<PostTableProps> = ({ posts, onEdit }) => {
  const { t } = useTranslation();
  return (
    <Table variant="striped">
      <Thead>
        <Tr>
          <Td>{t("File")}</Td>
          <Td>{t("Date Modified")}</Td>
          <Td>{t("Action")}</Td>
        </Tr>
      </Thead>
      <Tbody>
        {posts.map((post) => (
          <Tr key={post.filepath}>
            <Td>{post.filepath}</Td>
            <Td>{format(post.lastModified, "MMM dd, yyyy HH:mm")}</Td>
            <Td>
              <Button
                variant="outline"
                colorScheme="purple"
                onClick={() => onEdit(post.filepath)}
              >
                {t("Edit")}
              </Button>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
