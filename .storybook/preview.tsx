import { ChakraProvider } from "@chakra-ui/react";
import { useEffect } from "react";

import i18n from "../src/i18n";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};

const ChakraDecorator = (Story) => (
  <ChakraProvider>
    <Story />
  </ChakraProvider>
);

const LocaleDecorator = (Story, context) => {
  useEffect(() => {
    i18n.changeLanguage(context.globals.locale);
  }, [context]);
  return <Story />;
};

export const decorators = [ChakraDecorator, LocaleDecorator];

export const globalTypes = {
  locale: {
    defaultValue: "en",
    toolbar: {
      icon: "globe",
      items: ["en", "ja"],
    },
  },
};
