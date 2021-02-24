import { useToast } from "@chakra-ui/react";
import { Fragment, useEffect, useState, VFC } from "react";
import { useRouteMatch } from "react-router";

import { EditPostScreen } from "../components/screen/EditPostScreen";
import { useInjection } from "../context/Inversify";
import { TYPES } from "../TYPES";
import { ProjectUseCase } from "../UseCase/InputPort/ProjectUseCase";

export const EditPostPage: VFC = () => {
  const {
    params: { filename },
  } = useRouteMatch<{ filename: string }>();
  const toast = useToast();
  const projectUseCase = useInjection<ProjectUseCase>(TYPES.ProjectUseCase);
  const [value, setValue] = useState<string>("");
  const [postFile, setPostFile] = useState<File>();
  useEffect(() => {
    let isSubscribed = true;
    projectUseCase.getPost(filename).then((result) => {
      if (!isSubscribed) {
        return;
      }
      if (result.success) {
        setPostFile(result.post);
        result.post.text().then((str) => {
          if (!isSubscribed) {
            return;
          }
          console.log("set value");
          setValue(str);
        });
      } else {
        console.error(result.reason);
      }
    });
    return () => {
      isSubscribed = false;
    };
  }, [filename, projectUseCase]);
  return (
    <Fragment>
      <EditPostScreen
        filename={filename}
        value={value}
        onChange={setValue}
        onSave={async () => {
          const result = await projectUseCase.savePost(filename, value);
          if (result.success) {
            toast({
              title: "Saved",
              description: "Your changes have been saved to the disk",
              status: "success",
              duration: 2000,
              isClosable: true,
            });
          }
        }}
        render={(originalText) => projectUseCase.render(originalText)}
      />
    </Fragment>
  );
};
