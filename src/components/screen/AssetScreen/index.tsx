import { Alert } from "@chakra-ui/alert";
import { Box } from "@chakra-ui/layout";
import { AlertIcon, AlertTitle } from "@chakra-ui/react";
import { VFC } from "react";
import { useTranslation } from "react-i18next";

// export type AssetScreenProps = {};

export const AssetScreen: VFC = () => {
  const { t } = useTranslation();
  return (
    <Box p="16">
      <Alert
        status="info"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
      >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          {t("Not implemented yet 🙁")}
        </AlertTitle>
      </Alert>
    </Box>
  );
};
