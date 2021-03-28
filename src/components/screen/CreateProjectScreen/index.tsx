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
  directories: string[];
  onSubmit(project: ProjectConfigFormData): Promise<void>;
};

export const CreateProjectScreen: VFC<CreateProjectScreenProps> = ({
  directories,
  onSubmit,
}) => {
  const methods = useForm<ProjectConfigFormData>();
  const [loading, asyncTask] = useLoading<void>();
  const callback = methods.handleSubmit((value) => asyncTask(onSubmit(value)));
  return (
    <Container py={8}>
      <Text fontSize="3xl">Create New Project</Text>
      <Box my={4}>
        <FormProvider {...methods}>
          <form onSubmit={callback}>
            <ProjectConfigForm directories={directories} />
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
