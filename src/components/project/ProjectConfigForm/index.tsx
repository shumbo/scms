import { VStack } from "@chakra-ui/layout";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { VFC } from "react";
import { useFormContext } from "react-hook-form";

export type ProjectConfigFormData = {
  name: string;
  "markdown-directory": string;
  "asset-directory": string;
  "asset-serving-path": string;
};

export const ProjectConfigForm: VFC = () => {
  const { register } = useFormContext<ProjectConfigFormData>();
  return (
    <VStack>
      <FormControl isRequired>
        <FormLabel>Project Name</FormLabel>
        <Input
          type="text"
          name="name"
          placeholder="My Awesome Blog"
          ref={register({ required: true })}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Markdown Directory</FormLabel>
        <Input
          type="text"
          name="markdown-directory"
          placeholder="/articles"
          ref={register({ required: true })}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Asset Directory</FormLabel>
        <Input
          type="text"
          name="asset-directory"
          placeholder="/public/assets"
          ref={register({ required: true })}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Asset Serving Path</FormLabel>
        <Input
          type="text"
          name="asset-serving-path"
          placeholder="/assets"
          ref={register({ required: true })}
        />
      </FormControl>
    </VStack>
  );
};
