import { useQuery } from "@tanstack/react-query";
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

const ZENBLOG_TAGS_STALE_TIME = 10 * 60 * 1000;

export function useZenblogTags(options: UseZenblogTagsOptions = {}): UseZenblogTagsResult {
  const { enabled = true } = options;
  const fetchTags = useServerFn(getZenblogTags);
  const query = useQuery({
    queryKey: ["zenblog", "tags"],
    queryFn: () => fetchTags(),
    enabled,
    staleTime: ZENBLOG_TAGS_STALE_TIME,
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
