import {
  Box,
  Button,
  Center,
  Container,
  Divider,
  Text,
} from "@chakra-ui/react";
import { MouseEventHandler, useMemo, VFC } from "react";
import { useTranslation } from "react-i18next";

import README_JA from "./../../../../README.ja.md";
import README from "./../../../../README.md";

export type WelcomeScreenProps = {
  supported: boolean;
  onClick: MouseEventHandler;
};

export const WelcomeScreen: VFC<WelcomeScreenProps> = ({
  onClick,
  supported,
}) => {
  const { t, i18n } = useTranslation();
  const html: string = useMemo(() => {
    if (i18n.language === "ja") {
      return README_JA.html;
    }
    return README.html;
  }, [i18n]);
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
          {t("Content Manager for Statically Generated Websites")}
        </Text>
        <Center>
          <Button
            disabled={!supported}
            marginTop={2}
            colorScheme="purple"
            onClick={onClick}
          >
            {t("Start")}
          </Button>
        </Center>
      </Container>
      <Divider marginTop={4} />
      <Container my={8}>
        <Box className="wysiwyg" dangerouslySetInnerHTML={{ __html: html }} />
      </Container>
    </Box>
  );
};
