import { createServerFn } from "@tanstack/react-start";
import { zenblog } from "#/lib/zenblog";

export type ZenblogPostsInput = {
  author?: string;
  cache?: RequestCache;
  category?: string;
  limit?: number;
  offset?: number;
  tags?: string[];
};

export type ZenblogPostsResponse = Awaited<ReturnType<typeof zenblog.posts.list>>;

export const getZenblogPosts = createServerFn({ method: "GET" })
  .inputValidator((data: ZenblogPostsInput = {}) => data)
  .handler(async ({ data }) => zenblog.posts.list(data));
