import { useToast } from "@chakra-ui/toast";
import { Fragment, useEffect, useState, VFC } from "react";
import { useHistory } from "react-router";

import { CreatePostAlert } from "../components/screen/CreatePostAlert";
import { PostTableScreen } from "../components/screen/PostTableScreen";
import { useInjection } from "../context/Inversify";
import { Post } from "../domain/model/Post/Post";
import { TYPES } from "../TYPES";
import { ProjectUseCase } from "../UseCase/InputPort/ProjectUseCase";

export const ProjectPostTablePage: VFC = () => {
  const projectUseCase = useInjection<ProjectUseCase>(TYPES.ProjectUseCase);
  const [posts, setPosts] = useState<Post[] | null>(null);
  const toast = useToast();
  const history = useHistory();
  useEffect(() => {
    let isSubscribed = true;
    projectUseCase.listPost().then((result) => {
      if (!isSubscribed) {
        return;
      }
      if (result.success) {
        setPosts(result.posts);
      } else {
        console.error(result);
      }
    });
    return () => (isSubscribed = false);
  }, [projectUseCase]);

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
          try {
            await projectUseCase.createPost(filename, title);
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
