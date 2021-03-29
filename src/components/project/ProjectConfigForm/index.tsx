import { VStack } from "@chakra-ui/layout";
import { FormControl, FormLabel, Input, Select } from "@chakra-ui/react";
import { VFC } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

export type ProjectConfigFormData = {
  name: string;
  "markdown-directory": string;
  "asset-directory": string;
  "asset-serving-path": string;
};

export type ProjectConfigFormProps = {
  directories: string[];
};

export const ProjectConfigForm: VFC<ProjectConfigFormProps> = ({
  directories,
}) => {
  const { t } = useTranslation();
  const { register } = useFormContext<ProjectConfigFormData>();
  return (
    <VStack>
      <FormControl isRequired>
        <FormLabel>{t("Project Name")}</FormLabel>
        <Input
          type="text"
          name="name"
          placeholder="My Awesome Blog"
          ref={register({ required: true })}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>{t("Markdown Directory")}</FormLabel>
        <Select
          placeholder="Select Markdown Directory"
          name="markdown-directory"
          ref={register({ required: true })}
        >
          {directories.map((dir) => (
            <option value={dir} key={dir}>
              {dir}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl isRequired>
        <FormLabel>{t("Asset Directory")}</FormLabel>
        <Select
          placeholder="Select Asset Directory"
          name="asset-directory"
          ref={register({ required: true })}
        >
          {directories.map((dir) => (
            <option value={dir} key={dir}>
              {dir}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl isRequired>
        <FormLabel>{t("Asset Serving Path")}</FormLabel>
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
