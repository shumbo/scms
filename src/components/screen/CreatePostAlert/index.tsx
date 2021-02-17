import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/modal";
import { RefObject, useRef, VFC } from "react";
import { useFormContext } from "react-hook-form";

import { useLoading } from "../../../hooks/useLoading";

export type CreatePostAlertProps = {
  isOpen: boolean;
  finalFocusRef?: RefObject<HTMLButtonElement>;
  onClose(): void;
  onCreate(filename: string): Promise<void>;
};

type CreatePostFormData = {
  filename: string;
};

export const CreatePostAlert: VFC<CreatePostAlertProps> = ({
  isOpen,
  finalFocusRef,
  onClose,
  onCreate,
}) => {
  const { register, handleSubmit } = useFormContext<CreatePostFormData>();
  const [isLoading, asyncTask] = useLoading();
  const initialRef = useRef<HTMLInputElement | null>(null);
  const onSubmit = (values: CreatePostFormData) => {
    asyncTask(onCreate(values.filename));
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      initialFocusRef={initialRef}
      finalFocusRef={finalFocusRef}
    >
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>New Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Filename</FormLabel>
              <Input
                name="filename"
                required
                ref={(e) => {
                  register(e, { required: true });
                  initialRef.current = e;
                }}
                placeholder="my-new-post.md"
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button type="button" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" colorScheme="purple" isLoading={isLoading}>
              Create
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};
