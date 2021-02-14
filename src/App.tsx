import { ChakraProvider } from "@chakra-ui/react";
import { VFC } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { InversifyProvider } from "./context/Inversify";
import { container } from "./ioc";
import { CreateProjectPage } from "./pages/CreateProjectPage";
import { ProjectSidebarPage } from "./pages/ProjectSidebarPage";
import { WelcomePage } from "./pages/WelcomePage";

export const App: VFC = () => {
  return (
    <ChakraProvider>
      <InversifyProvider container={container}>
        <Router>
          <Switch>
            <Route path="/create-project">
              <CreateProjectPage />
            </Route>
            <Route path="/project">
              <ProjectSidebarPage />
            </Route>
            <Route path="/">
              <WelcomePage />
            </Route>
          </Switch>
        </Router>
      </InversifyProvider>
    </ChakraProvider>
  );
};
