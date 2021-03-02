import { Fragment, useCallback, useMemo, useRef, useState, VFC } from "react";
import { useHistory } from "react-router";

import { ConfirmCreateProjectAlert } from "../components/screen/ConfirmCreateProjectAlert";
import { WelcomeScreen } from "../components/screen/WelcomeScreen";
import { useInjection } from "../context/Inversify";
import { TYPES } from "../TYPES";
import { ProjectUseCase } from "../UseCase/InputPort/ProjectUseCase";
import { UserAgentUseCase } from "../UseCase/InputPort/UserAgentUseCase";

export const WelcomePage: VFC = () => {
  const history = useHistory();
  const userAgentUseCase = useInjection<UserAgentUseCase>(
    TYPES.UserAgentUseCase
  );
  const projectUseCase = useInjection<ProjectUseCase>(TYPES.ProjectUseCase);

  const [dh, setDh] = useState<FileSystemDirectoryHandle | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const cancelRef = useRef<HTMLButtonElement>(null);

  return (
    <Fragment>
      <WelcomeScreen
        onClick={async () => {
          const openResult = await projectUseCase.open();
          if (openResult.success) {
            history.push("/project");
          } else {
            switch (openResult.reason) {
              case "NO_DIRECTORY_SELECTED":
                break;
              case "NO_CONFIG_FILE":
                setDh(openResult.directoryHandle);
                setIsOpen(true);
                break;
            }
          }
        }}
        supported={useMemo(
          () => userAgentUseCase.get().supportFileSystemAccessAPI,
          [userAgentUseCase]
        )}
      />
      <ConfirmCreateProjectAlert
        isOpen={isOpen}
        onClose={useCallback(() => setIsOpen(false), [])}
        onCreate={useCallback(() => {
          setIsOpen(false);
          history.push("/create-project", { dh });
        }, [history, dh])}
        cancelRef={cancelRef}
        directoryName={dh?.name ?? ""}
      />
    </Fragment>
  );
};
