import { ChakraProvider } from "@chakra-ui/react";
import { VFC } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { ErrorFallback } from "./components/screen/ErrorFallback";
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
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <ProjectSidebarPage />
              </ErrorBoundary>
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
