import {
  Box,
  Button,
  Center,
  Container,
  Divider,
  ListItem,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";
import { MouseEventHandler, VFC } from "react";

import README from "./../../../../README.ja.md";

export type WelcomeScreenProps = {
  supported: boolean;
  onClick: MouseEventHandler;
};

export const WelcomeScreen: VFC<WelcomeScreenProps> = ({
  onClick,
  supported,
}) => {
  return (
    <Box>
      <Container centerContent>
        <Text
          as="h1"
          fontSize="5xl"
          fontWeight="extrabold"
          bgGradient="linear(to-l, #7928CA,#FF0080)"
          bgClip="text"
        >
          SCMS
        </Text>
        <Text fontSize="xl">
          Content Manager for Statically Generated Websites
        </Text>
        <Center>
          <Button
            disabled={!supported}
            marginTop={2}
            colorScheme="purple"
            onClick={onClick}
          >
            Start
          </Button>
        </Center>
      </Container>
      <Divider marginTop={4} />
      <Container my={8}>
        <Box className="wysiwyg" dangerouslySetInnerHTML={{ __html: README }} />
      </Container>
    </Box>
  );
};
