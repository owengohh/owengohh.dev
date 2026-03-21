import { createZenblogClient } from "zenblog";

const blogId = process.env.ZENBLOG_BLOG_ID;

if (!blogId) {
  throw new Error("ZENBLOG_BLOG_ID is not set");
}

export const zenblog = createZenblogClient({ blogId });
