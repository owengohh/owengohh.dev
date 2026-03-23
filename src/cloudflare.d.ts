declare module "cloudflare:workers" {
  export interface Env {
    ZENBLOG_BLOG_ID: string;
  }

  export const env: Env;
}
