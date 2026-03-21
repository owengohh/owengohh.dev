import { createServerFn } from "@tanstack/react-start";
import { zenblog } from "#/lib/zenblog";

export type ZenblogTagsResponse = Awaited<ReturnType<typeof zenblog.tags.list>>;

export const getZenblogTags = createServerFn({ method: "GET" }).handler(() => zenblog.tags.list());
