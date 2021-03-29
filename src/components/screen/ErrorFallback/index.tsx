import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { useRef, VFC } from "react";
import { FallbackProps } from "react-error-boundary";
import { Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { useTranslation } from "react-i18next";

export type ErrorFallbackProps = FallbackProps;

export const ErrorFallback: VFC<ErrorFallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  const { t } = useTranslation();
  const leastDestructiveRef = useRef<HTMLButtonElement | null>(null);
  if (error.message === "User activation is required to request permissions.") {
    return (
      <Modal
        isOpen={true}
        onClose={() => {
          resetErrorBoundary();
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t("Could not open the directory")}</ModalHeader>
          <ModalBody>
            <Text>{t("ErrorFallback__activation_error_message")}</Text>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="purple"
              ref={leastDestructiveRef}
              onClick={() => {
                resetErrorBoundary();
              }}
            >
              {t("Retry")}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }
  return (
    <Modal
      isOpen={true}
      onClose={() => {
        resetErrorBoundary();
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t("An error occured")}</ModalHeader>
        <ModalBody>
          <Text>{t("ErrorFallback__unknown_error_message")}</Text>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="purple"
            ref={leastDestructiveRef}
            onClick={() => {
              resetErrorBoundary();
            }}
          >
            {t("Retry")}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
