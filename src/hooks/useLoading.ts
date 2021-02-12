import { useState, useCallback } from "react";

export function useLoading<T>(): readonly [
  boolean,
  (job: Promise<T>) => Promise<T>
] {
  const [loading, setLoading] = useState<boolean>(false);
  const asyncTask = useCallback(
    (task: Promise<T>) => {
      setLoading(true);
      return task.finally(() => setLoading(false));
    },
    [setLoading]
  );
  return [loading, asyncTask] as const;
}
