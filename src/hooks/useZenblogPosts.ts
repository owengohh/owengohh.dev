import { useQuery } from "@tanstack/react-query";
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

const ZENBLOG_POSTS_STALE_TIME = 5 * 60 * 1000;

export function useZenblogPosts(options: UseZenblogPostsOptions = {}): UseZenblogPostsResult {
  const { author, cache, category, enabled = true, limit, offset, tags } = options;
  const fetchPosts = useServerFn(getZenblogPosts);
  const query = useQuery({
    queryKey: [
      "zenblog",
      "posts",
      {
        author: author ?? null,
        category: category ?? null,
        limit: limit ?? null,
        offset: offset ?? null,
        tags: tags ?? [],
      },
    ],
    queryFn: () =>
      fetchPosts({
        data: {
          ...(author ? { author } : {}),
          ...(cache ? { cache } : {}),
          ...(category ? { category } : {}),
          ...(typeof limit === "number" ? { limit } : {}),
          ...(typeof offset === "number" ? { offset } : {}),
          ...(tags?.length ? { tags } : {}),
        },
      }),
    enabled,
    staleTime: ZENBLOG_POSTS_STALE_TIME,
  });

  return {
    data: query.data ?? null,
    error: query.error instanceof Error ? query.error : null,
    isLoading: query.isLoading,
    refetch: () => {
      void query.refetch();
    },
  };
}
