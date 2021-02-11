import { Button, Container, Text } from "@chakra-ui/react";
import { VFC } from "react";

export const WelcomeScreen: VFC = () => {
  return (
    <Container>
      <Text>Hello, World</Text>
      <Button colorScheme="blue">Button</Button>
    </Container>
  );
};
