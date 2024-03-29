import { Box, Flex } from "@chakra-ui/layout";
import { VFC } from "react";
import { Route, Switch, useRouteMatch } from "react-router";

import {
  ProjectSidebar,
  ProjectSidebarItem,
} from "../components/project/ProjectSidebar";
import { AssetScreen } from "../components/screen/AssetScreen";

import { EditPostPage } from "./EditPostPage";
import { ProjectHomePage } from "./ProjectHomePage";
import { ProjectPostTablePage } from "./ProjectPostTablePage";

export const ProjectSidebarPage: VFC = () => {
  const { path, url } = useRouteMatch();
  return (
    <Flex>
      <ProjectSidebar>
        <ProjectSidebarItem exact to={`${url}`}>
          Home
        </ProjectSidebarItem>
        <ProjectSidebarItem to={`${url}/posts`}>Posts</ProjectSidebarItem>
        <ProjectSidebarItem to={`${url}/assets`}>Assets</ProjectSidebarItem>
      </ProjectSidebar>
      <Box width="100%">
        <Switch>
          <Route exact path={path}>
            <ProjectHomePage />
          </Route>
          <Route exact path={`${path}/posts`}>
            <ProjectPostTablePage />
          </Route>
          <Route path={`${path}/posts/:filename`}>
            <EditPostPage />
          </Route>
          <Route exact path={`${path}/assets`}>
            <AssetScreen />
          </Route>
        </Switch>
      </Box>
    </Flex>
  );
};
