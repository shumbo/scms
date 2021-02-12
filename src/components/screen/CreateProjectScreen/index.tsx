import { Button } from "@chakra-ui/button";
import { Box, Container, HStack, Text } from "@chakra-ui/layout";
import { VFC } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { useLoading } from "../../../hooks/useLoading";
import {
  ProjectConfigForm,
  ProjectConfigFormData,
} from "../../project/ProjectConfigForm";

export type CreateProjectScreenProps = {
  onSubmit(project: ProjectConfigFormData): Promise<void>;
};

export const CreateProjectScreen: VFC<CreateProjectScreenProps> = ({
  onSubmit,
}) => {
  const methods = useForm<ProjectConfigFormData>();
  const [loading, asyncTask] = useLoading<void>();
  const callback = methods.handleSubmit((value) => asyncTask(onSubmit(value)));
  return (
    <Container>
      <Text fontSize="3xl">Create New Project</Text>
      <Box mt={4}>
        <FormProvider {...methods}>
          <form onSubmit={callback}>
            <ProjectConfigForm />
            <HStack mt={4} justify="flex-end">
              <Button isLoading={loading} type="submit" colorScheme="purple">
                Create Project
              </Button>
            </HStack>
          </form>
        </FormProvider>
      </Box>
    </Container>
  );
};
