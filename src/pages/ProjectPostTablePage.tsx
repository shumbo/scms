import { useToast } from "@chakra-ui/toast";
import { Fragment, useEffect, useState, VFC } from "react";
import { useHistory } from "react-router";

import { CreatePostAlert } from "../components/screen/CreatePostAlert";
import { PostTableScreen } from "../components/screen/PostTableScreen";
import { useInjection } from "../context/Inversify";
import { Post } from "../domain/model/Post/Post";
import { useProject } from "../hooks/useProject";
import { TYPES } from "../TYPES";
import { PostUseCase } from "../UseCase/InputPort/PostUseCase";

export const ProjectPostTablePage: VFC = () => {
  const [project] = useProject();
  const postUseCase = useInjection<PostUseCase>(TYPES.PostUseCase);
  const [posts, setPosts] = useState<Post[] | null>(null);
  const toast = useToast();
  const history = useHistory();
  useEffect(() => {
    let isSubscribed = true;
    (async () => {
      if (!project) {
        return;
      }
      const postsResult = await postUseCase.list(project);
      if (!isSubscribed || !postsResult.success) {
        return;
      }
      setPosts(postsResult.posts);
    })();
    return () => {
      isSubscribed = false;
    };
  }, [postUseCase, project]);

  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (
    <Fragment>
      <PostTableScreen
        posts={posts}
        onCreate={() => {
          setIsCreateOpen(true);
        }}
        onEdit={(filepath) => {
          history.push(`/project/posts/${filepath}`);
        }}
      />
      <CreatePostAlert
        isOpen={isCreateOpen}
        onClose={() => {
          setIsCreateOpen(false);
        }}
        onCreate={async (filename, title) => {
          if (!project) {
            return;
          }
          try {
            await postUseCase.create(project, filename, title);
            toast({
              title: "Post Created",
              description: "New file has been created",
              status: "success",
            });
          } catch {
            toast({
              title: "Error",
              description: "We couldn't create a new file",
              status: "error",
            });
            return;
          }
          setIsCreateOpen(false);
          return;
        }}
      />
    </Fragment>
  );
};
