import { Container, interfaces } from "inversify";
import { createContext, ReactNode, useContext, VFC } from "react";

const InversifyContext = createContext<{ container: Container | null }>({
  container: null,
});

type Props = {
  container: Container;
  children: ReactNode;
};

export const InversifyProvider: VFC<Props> = ({ container, children }) => {
  return (
    <InversifyContext.Provider value={{ container }}>
      {children}
    </InversifyContext.Provider>
  );
};

export function useInjection<T>(identifier: interfaces.ServiceIdentifier<T>) {
  const { container } = useContext(InversifyContext);
  if (!container) {
    throw new Error("Failed to find a container");
  }
  return container.get<T>(identifier);
}
