import { createServerFn } from "@tanstack/react-start";
import { zenblog } from "#/lib/zenblog";

export type ZenblogPostInput = {
  slug: string;
};

export type ZenblogPostResponse = Awaited<ReturnType<typeof zenblog.posts.get>>;

export const getZenblogPost = createServerFn({ method: "GET" })
  .inputValidator((data: ZenblogPostInput) => data)
  .handler(async ({ data }) => {
    return zenblog.posts.get({ slug: data.slug });
  });
