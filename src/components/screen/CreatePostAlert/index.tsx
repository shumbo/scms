import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightAddon } from "@chakra-ui/input";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/modal";
import { Tag } from "@chakra-ui/tag";
import { RefObject, useRef, VFC } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { useLoading } from "../../../hooks/useLoading";

export type CreatePostAlertProps = {
  isOpen: boolean;
  finalFocusRef?: RefObject<HTMLButtonElement>;
  onClose(): void;
  onCreate(filename: string, title: string): Promise<void>;
};

type CreatePostFormData = {
  filename: string;
  title: string;
};

export const CreatePostAlert: VFC<CreatePostAlertProps> = ({
  isOpen,
  finalFocusRef,
  onClose,
  onCreate,
}) => {
  const { t } = useTranslation();
  const { register, handleSubmit } = useForm<CreatePostFormData>();
  const [isLoading, asyncTask] = useLoading();
  const initialRef = useRef<HTMLInputElement | null>(null);
  const onSubmit = (values: CreatePostFormData) => {
    asyncTask(onCreate(`${values.filename}.md`, values.title));
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
          <ModalHeader>{t("New Post")}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>{t("Filename")}</FormLabel>
              <InputGroup>
                <Input
                  name="filename"
                  required
                  ref={(e) => {
                    register(e, { required: true });
                    initialRef.current = e;
                  }}
                  placeholder="my-new-post"
                />
                <InputRightAddon>
                  <Tag>.md</Tag>
                </InputRightAddon>
              </InputGroup>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>{t("Title")}</FormLabel>
              <Input
                name="title"
                required
                ref={register}
                placeholder="My first blog post"
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button type="button" mr={3} onClick={onClose}>
              {t("Cancel")}
            </Button>
            <Button type="submit" colorScheme="purple" isLoading={isLoading}>
              {t("Create")}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};
