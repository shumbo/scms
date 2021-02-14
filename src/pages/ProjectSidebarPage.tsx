import { Box, Flex } from "@chakra-ui/layout";
import { VFC } from "react";
import { Route, Switch, useRouteMatch } from "react-router";

import {
  ProjectSidebar,
  ProjectSidebarItem,
} from "../components/project/ProjectSidebar";

import { ProjectHomePage } from "./ProjectHomePage";

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
      <Box>
        <Switch>
          <Route exact path={path}>
            <ProjectHomePage />
          </Route>
          <Route exact path={`${path}/posts`}>
            posts
          </Route>
          <Route exact path={`${path}/assets`}>
            assets
          </Route>
        </Switch>
      </Box>
    </Flex>
  );
};
