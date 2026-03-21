import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import {
  getZenblogPosts,
  type ZenblogPostsInput,
  type ZenblogPostsResponse,
} from "#/lib/zenblog-posts";

type UseZenblogPostsOptions = ZenblogPostsInput & {
  enabled?: boolean;
};

type UseZenblogPostsResult = {
  data: ZenblogPostsResponse | null;
  error: Error | null;
  isLoading: boolean;
  refetch: () => void;
};

export function useZenblogPosts(options: UseZenblogPostsOptions = {}): UseZenblogPostsResult {
  const { author, cache, category, enabled = true, limit, offset, tags } = options;
  const fetchPosts = useServerFn(getZenblogPosts);
  const [data, setData] = useState<ZenblogPostsResponse | null>(null);
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

    fetchPosts({
      data: {
        ...(author ? { author } : {}),
        ...(cache ? { cache } : {}),
        ...(category ? { category } : {}),
        ...(typeof limit === "number" ? { limit } : {}),
        ...(typeof offset === "number" ? { offset } : {}),
        ...(tags?.length ? { tags } : {}),
      },
    })
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
          nextError instanceof Error ? nextError : new Error("Failed to fetch Zenblog posts"),
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
  }, [author, cache, category, enabled, fetchPosts, limit, offset, requestVersion, tags]);

  return {
    data,
    error,
    isLoading,
    refetch: () => setRequestVersion((value) => value + 1),
  };
}
