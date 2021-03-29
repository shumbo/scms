import { useToast } from "@chakra-ui/toast";
import { Fragment, useCallback, useEffect, useState, VFC } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import useUnmountPromise from "react-use/lib/useUnmountPromise";

import { CreatePostAlert } from "../components/screen/CreatePostAlert";
import { PostTableScreen } from "../components/screen/PostTableScreen";
import { useInjection } from "../context/Inversify";
import { Post } from "../domain/model/Post/Post";
import { useProject } from "../hooks/useProject";
import { TYPES } from "../TYPES";
import { PostUseCase } from "../UseCase/InputPort/PostUseCase";

export const ProjectPostTablePage: VFC = () => {
  const { t } = useTranslation();
  const [project] = useProject();
  const postUseCase = useInjection<PostUseCase>(TYPES.PostUseCase);
  const [posts, setPosts] = useState<Post[] | null>(null);
  const toast = useToast();
  const history = useHistory();

  const mounted = useUnmountPromise();

  const loadPosts = useCallback(() => {
    mounted(
      (async () => {
        if (!project) {
          return;
        }
        const postsResult = await postUseCase.list(project);
        if (!postsResult.success) {
          return;
        }
        setPosts(postsResult.posts);
      })()
    );
  }, [mounted, project, postUseCase]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (
    <Fragment>
      <PostTableScreen
        posts={posts}
        onCreate={() => {
          setIsCreateOpen(true);
        }}
        onEdit={(filepath) => {
          history.push(`/project/posts/${encodeURIComponent(filepath)}`);
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
              title: t("Post Created"),
              description: t("New file has been created"),
              status: "success",
            });
          } catch {
            toast({
              title: t("Error"),
              description: t("We couldn't create a new file"),
              status: "error",
            });
            return;
          }
          loadPosts();
          setIsCreateOpen(false);
          return;
        }}
      />
    </Fragment>
  );
};
