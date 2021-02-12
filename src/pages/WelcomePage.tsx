import { useMemo, VFC } from "react";

import { WelcomeScreen } from "../components/screen/WelcomeScreen";
import { useInjection } from "../context/Inversify";
import { TYPES } from "../TYPES";
import { UserAgentUseCase } from "../UseCase/InputPort/UserAgentUseCase";

export const WelcomePage: VFC = () => {
  const userAgentUseCase = useInjection<UserAgentUseCase>(
    TYPES.UserAgentUseCase
  );
  return (
    <WelcomeScreen
      onClick={() => console.log("hello")}
      supported={useMemo(
        () => userAgentUseCase.get().supportFileSystemAccessAPI,
        [userAgentUseCase]
      )}
    />
  );
};
