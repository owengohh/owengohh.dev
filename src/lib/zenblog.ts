import { createZenblogClient } from "zenblog";
import { env } from "cloudflare:workers";

const blogId = env.ZENBLOG_BLOG_ID;

if (!blogId) {
  throw new Error("ZENBLOG_BLOG_ID is not set");
}

// Create client with no-store cache default (Cloudflare Workers doesn't support "default")
export const zenblog = createZenblogClient({ blogId });

// Patch the methods to use no-store cache by default
const originalPostsList = zenblog.posts.list.bind(zenblog.posts);
const originalPostsGet = zenblog.posts.get.bind(zenblog.posts);

zenblog.posts.list = (opts = {}) => originalPostsList({ ...opts, cache: opts.cache ?? "no-store" });
zenblog.posts.get = (slug, opts) => originalPostsGet(slug, { cache: "no-store", ...opts });
