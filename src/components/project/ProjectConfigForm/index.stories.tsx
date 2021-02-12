import { Meta, Story } from "@storybook/react";
import { StoryFnReactReturnType } from "@storybook/react/dist/client/preview/types";
import { FC, ReactNode, VFC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { action } from "@storybook/addon-actions";

import { ProjectConfigForm } from ".";

const StorybookFormProvider: VFC<{ children: ReactNode }> = ({ children }) => {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(action("[React Hooks Form] Submit"))}
      >
        {children}
      </form>
    </FormProvider>
  );
};

const meta: Meta = {
  title: "Project/ProjectConfirgForm",
  component: ProjectConfigForm,
  decorators: [
    (Story: FC): StoryFnReactReturnType => (
      <StorybookFormProvider>
        <Story />
        <button type="submit">Submit</button>
      </StorybookFormProvider>
    ),
  ],
};
export default meta;

const Template: Story = () => <ProjectConfigForm />;
export const Default = Template.bind({});
