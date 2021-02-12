import { ChakraProvider } from "@chakra-ui/react";
import { VFC } from "react";

import { InversifyProvider } from "./context/Inversify";
import { container } from "./ioc";
import { WelcomePage } from "./pages/WelcomePage";

export const App: VFC = () => {
  return (
    <ChakraProvider>
      <InversifyProvider container={container}>
        <WelcomePage />
      </InversifyProvider>
    </ChakraProvider>
  );
};
