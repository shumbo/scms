import {
  Box,
  Button,
  Center,
  Container,
  Divider,
  Text,
} from "@chakra-ui/react";
import { MouseEventHandler, VFC } from "react";

export type WelcomeScreenProps = {
  onClick: MouseEventHandler;
};

export const WelcomeScreen: VFC<WelcomeScreenProps> = ({ onClick }) => {
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
          <Button marginTop={2} colorScheme="purple" onClick={onClick}>
            Start
          </Button>
        </Center>
      </Container>
      <Divider marginTop={4} />
      <Container marginTop={4}>
        <Text as="h2" fontSize="2xl">
          What is SCMS?
        </Text>
        <Text mt={2}>
          SCMS is a yet another content management system for statically
          generated websites.
        </Text>
      </Container>
    </Box>
  );
};
