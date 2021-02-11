import { ChakraProvider } from "@chakra-ui/react";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};

const ChakraDecorator = (Story) => (
  <ChakraProvider>
    <Story />
  </ChakraProvider>
);

export const decorators = [ChakraDecorator];
