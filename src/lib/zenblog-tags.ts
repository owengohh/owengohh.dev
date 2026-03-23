import { createServerFn } from "@tanstack/react-start";
import { zenblog } from "#/lib/zenblog";

export type ZenblogTagsResponse = Awaited<ReturnType<typeof zenblog.tags.list>>;

// Note: zenblog.tags.list() doesn't accept cache option, but we wrap it here
// for consistency. The cache issue is handled at the fetch level in Cloudflare.
export const getZenblogTags = createServerFn({ method: "GET" }).handler(() => zenblog.tags.list());
