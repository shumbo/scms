import { useEffect, useState, VFC } from "react";
import { useHistory } from "react-router";

import { PostTableScreen } from "../components/screen/PostTableScreen";
import { useInjection } from "../context/Inversify";
import { Post } from "../domain/model/Post/Post";
import { TYPES } from "../TYPES";
import { ProjectUseCase } from "../UseCase/InputPort/ProjectUseCase";

export const ProjectPostTablePage: VFC = () => {
  const projectUseCase = useInjection<ProjectUseCase>(TYPES.ProjectUseCase);
  const [posts, setPosts] = useState<Post[] | null>(null);
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
  return (
    <PostTableScreen
      posts={posts}
      onCreate={() => window.prompt()}
      onEdit={(filepath) => {
        history.push(`/project/posts/${filepath}`);
      }}
    />
  );
};
