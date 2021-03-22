import { useToast } from "@chakra-ui/react";
import { Fragment, useEffect, useMemo, useState, VFC } from "react";
import { useRouteMatch } from "react-router";

import { EditPostScreen } from "../components/screen/EditPostScreen";
import { useInjection } from "../context/Inversify";
import { Post } from "../domain/model/Post/Post";
import { useProject } from "../hooks/useProject";
import { TYPES } from "../TYPES";
import { PostUseCase } from "../UseCase/InputPort/PostUseCase";
import { ProjectUseCase } from "../UseCase/InputPort/ProjectUseCase";

export const EditPostPage: VFC = () => {
  const {
    params: { filename: encodedFilename },
  } = useRouteMatch<{ filename: string }>();
  const filename = useMemo(() => decodeURIComponent(encodedFilename), [
    encodedFilename,
  ]);
  const toast = useToast();
  const [project] = useProject();
  const projectUseCase = useInjection<ProjectUseCase>(TYPES.ProjectUseCase);
  const postUseCase = useInjection<PostUseCase>(TYPES.PostUseCase);
  const [value, setValue] = useState<string>("");
  const [post, setPost] = useState<Post>();
  useEffect(() => {
    let isSubscribed = true;
    if (!project) {
      return;
    }
    postUseCase.get(project, filename).then((result) => {
      if (!isSubscribed) {
        return;
      }
      if (result.success) {
        setPost(result.post);
        setValue(result.post.content);
      } else {
        console.error(result.reason);
      }
    });
    return () => {
      isSubscribed = false;
    };
  }, [filename, postUseCase, project]);
  if (!project || !post) {
    return null;
  }
  return (
    <Fragment>
      <EditPostScreen
        filename={filename}
        value={value}
        onChange={setValue}
        onSave={async () => {
          const result = await postUseCase.save(project, post, value);
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
        render={(originalText) => projectUseCase.render(project, originalText)}
        putImage={async (file) => {
          const result = await projectUseCase.putAsset(project, file);
          if (!result.success) {
            toast({
              title: "Error",
              description: "We could not save the image you selected ;(",
              status: "error",
            });
            return null;
          }
          return encodeURI(`/${file.name}`);
        }}
      />
    </Fragment>
  );
};
