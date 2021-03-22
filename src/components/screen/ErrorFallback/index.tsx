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

export type ErrorFallbackProps = FallbackProps;

export const ErrorFallback: VFC<ErrorFallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
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
          <ModalHeader>Could not open the directory</ModalHeader>
          <ModalBody>
            <Text>
              We could not open the project directory. Please click the button
              below to retry.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="purple"
              ref={leastDestructiveRef}
              onClick={() => {
                resetErrorBoundary();
              }}
            >
              Retry
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
        <ModalHeader>An error occured</ModalHeader>
        <ModalBody>
          <Text>Unknown error has occured. Please retry.</Text>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="purple"
            ref={leastDestructiveRef}
            onClick={() => {
              resetErrorBoundary();
            }}
          >
            Retry
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
