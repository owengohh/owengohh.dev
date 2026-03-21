import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { getZenblogPost } from "#/lib/zenblog-post";

export const Route = createFileRoute("/writing/$slug")({
  loader: ({ params }) => getZenblogPost({ data: { slug: params.slug } }),
  component: WritingPostPage,
});

function formatPublishedDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function WritingPostPage() {
  const { data: post } = Route.useLoaderData();

  return (
    <main className="page-wrap px-4 py-12 sm:py-16">
      <article className="mx-auto max-w-3xl">
        <div className="mb-6">
          <a
            href="/"
            className="inline-flex items-center gap-2 border border-(--line) px-3 py-2 text-sm font-medium text-[var(--sea-ink)] no-underline hover:bg-(--link-bg-hover) hover:text-[var(--sea-ink)]"
            style={{ color: "var(--sea-ink)", textDecoration: "none" }}
          >
            <ArrowLeft className="h-4 w-4" />
            back
          </a>
        </div>

        <header className="border-b border-(--line) pb-8">
          <p className="text-sm uppercase tracking-[0.16em] text-(--sea-ink-soft)">
            {formatPublishedDate(post.published_at)}
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-(--sea-ink) sm:text-4xl">
            {post.title}
          </h1>
          {post.excerpt ? (
            <p className="mt-4 max-w-2xl text-base text-(--sea-ink-soft)">{post.excerpt}</p>
          ) : null}
        </header>

        <div
          className="prose prose-slate mt-8 max-w-none text-(--sea-ink) prose-headings:text-(--sea-ink) prose-p:text-(--sea-ink-soft) prose-strong:text-(--sea-ink) prose-a:text-(--lagoon-deep)"
          dangerouslySetInnerHTML={{ __html: post.html_content }}
        />
      </article>
    </main>
  );
}
