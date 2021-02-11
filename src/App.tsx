import { ChakraProvider } from "@chakra-ui/react";
import { VFC } from "react";
import { WelcomeScreen } from "./components/screen/WelcomeScreen";

export const App: VFC = () => {
  return (
    <ChakraProvider>
      <WelcomeScreen />
    </ChakraProvider>
  );
};
