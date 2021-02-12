import { VFC } from "react";

import { CreateProjectScreen } from "../components/screen/CreateProjectScreen";

export const CreateProjectPage: VFC = () => {
  return <CreateProjectScreen onSubmit={() => Promise.resolve()} />;
};
