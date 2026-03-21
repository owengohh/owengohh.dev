import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { getZenblogTags, type ZenblogTagsResponse } from "#/lib/zenblog-tags";

type UseZenblogTagsOptions = {
  enabled?: boolean;
};

type UseZenblogTagsResult = {
  data: ZenblogTagsResponse | null;
  error: Error | null;
  isLoading: boolean;
  refetch: () => void;
};

export function useZenblogTags(options: UseZenblogTagsOptions = {}): UseZenblogTagsResult {
  const { enabled = true } = options;
  const fetchTags = useServerFn(getZenblogTags);
  const [data, setData] = useState<ZenblogTagsResponse | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(enabled);
  const [requestVersion, setRequestVersion] = useState(0);

  useEffect(() => {
    if (!enabled) {
      setIsLoading(false);
      return;
    }

    let isCancelled = false;

    setIsLoading(true);
    setError(null);

    fetchTags()
      .then((response) => {
        if (isCancelled) {
          return;
        }

        setData(response);
      })
      .catch((nextError: unknown) => {
        if (isCancelled) {
          return;
        }

        setError(
          nextError instanceof Error ? nextError : new Error("Failed to fetch Zenblog tags"),
        );
      })
      .finally(() => {
        if (isCancelled) {
          return;
        }

        setIsLoading(false);
      });

    return () => {
      isCancelled = true;
    };
  }, [enabled, fetchTags, requestVersion]);

  return {
    data,
    error,
    isLoading,
    refetch: () => setRequestVersion((value) => value + 1),
  };
}
