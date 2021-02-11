import { ChakraProvider } from "@chakra-ui/react";
import { VFC } from "react";
import { WelcomePage } from "./pages/WelcomePage";

export const App: VFC = () => {
  return (
    <ChakraProvider>
      <WelcomePage />
    </ChakraProvider>
  );
};
