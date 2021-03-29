import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { Button, ModalFooter } from "@chakra-ui/react";
import { RefObject, useEffect, useMemo, useRef, VFC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { useLoading } from "../../../hooks/useLoading";
import {
  ProjectConfigForm,
  ProjectConfigFormData,
} from "../../project/ProjectConfigForm";

export type EditProjectModalProps = {
  defaultValues: ProjectConfigFormData;
  isOpen: boolean;
  finalFocusRef?: RefObject<HTMLButtonElement>;
  directories: string[];
  onClose(): void;
  onSave(project: ProjectConfigFormData): Promise<void>;
};

export const EditProjectModal: VFC<EditProjectModalProps> = ({
  defaultValues,
  isOpen,
  finalFocusRef,
  directories,
  onClose,
  onSave,
}) => {
  const { t } = useTranslation();

  const methods = useForm<ProjectConfigFormData>({
    defaultValues: useMemo(() => defaultValues, [defaultValues]),
  });

  useEffect(() => {
    methods.reset(defaultValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValues]);

  const initialFocusRef = useRef<HTMLInputElement | null>(null);
  const [isLoading, asyncTask] = useLoading();
  const callback = methods.handleSubmit((values) => asyncTask(onSave(values)));

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      initialFocusRef={initialFocusRef}
      finalFocusRef={finalFocusRef}
    >
      <ModalOverlay />
      <ModalContent>
        <FormProvider {...methods}>
          <form onSubmit={callback}>
            <ModalHeader>Edit Project</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <ProjectConfigForm directories={directories} />
            </ModalBody>
            <ModalFooter>
              <Button type="button" mr={3} onClick={onClose}>
                {t("Cancel")}
              </Button>
              <Button type="submit" colorScheme="purple" isLoading={isLoading}>
                {t("Save")}
              </Button>
            </ModalFooter>
          </form>
        </FormProvider>
      </ModalContent>
    </Modal>
  );
};
