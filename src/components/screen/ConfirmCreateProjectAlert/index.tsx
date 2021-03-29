import { Button } from "@chakra-ui/button";
import { Code, Text, VStack } from "@chakra-ui/layout";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
} from "@chakra-ui/modal";
import { RefObject, VFC } from "react";
import { Trans, useTranslation } from "react-i18next";

export type ConfirmCreateProjectAlertProps = {
  directoryName: string;
  isOpen: boolean;
  cancelRef: RefObject<HTMLButtonElement>;
  onClose(): void;
  onCreate(): void;
};

export const ConfirmCreateProjectAlert: VFC<ConfirmCreateProjectAlertProps> = ({
  directoryName,
  isOpen,
  cancelRef,
  onClose,
  onCreate,
}) => {
  const { t } = useTranslation();
  return (
    <AlertDialog
      isOpen={isOpen}
      onClose={onClose}
      leastDestructiveRef={cancelRef}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {t("Create Project?")}
          </AlertDialogHeader>
          <AlertDialogBody>
            <VStack align="stretch">
              <Text>
                <Trans
                  i18nKey="ConfirmCreateProjectAlert__directory_missing_msg"
                  values={{ directoryName }}
                >
                  It seems that the directory <Code>{{ directoryName }}</Code>
                  is not a SCMS project.
                </Trans>
              </Text>
              <Text>
                {t("Do you want to make this directory a SCMS project?")}
              </Text>
            </VStack>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              {t("Cancel")}
            </Button>
            <Button colorScheme="purple" onClick={onCreate} ml={3}>
              {t("Create Project")}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
