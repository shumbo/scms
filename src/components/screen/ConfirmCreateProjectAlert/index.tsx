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
}) => (
  <AlertDialog
    isOpen={isOpen}
    onClose={onClose}
    leastDestructiveRef={cancelRef}
  >
    <AlertDialogOverlay>
      <AlertDialogContent>
        <AlertDialogHeader fontSize="lg" fontWeight="bold">
          Create Project?
        </AlertDialogHeader>
        <AlertDialogBody>
          <VStack align="stretch">
            <Text>
              It seems that the directory <Code>{directoryName}</Code> is not a
              SCMS project.
            </Text>
            <Text>Do you want to make this directory a SCMS project?</Text>
          </VStack>
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="purple" onClick={onCreate} ml={3}>
            Create Project
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogOverlay>
  </AlertDialog>
);
