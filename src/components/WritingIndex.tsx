import { useEffect, useState } from "react";
import { ArrowRight, Bookmark, Search } from "lucide-react";
import { MultiSelect } from "#/components/ui/multi-select";
import { useZenblogPosts } from "#/hooks/useZenblogPosts";
import { useZenblogTags } from "#/hooks/useZenblogTags";

export const WRITING_PAGE_SIZE = 10;

function formatPublishedDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function WritingIndexSkeleton() {
  return (
    <section aria-labelledby="writing-index-title">
      <div className="mx-auto flex max-w-2xl animate-pulse flex-col gap-5 px-4 text-left sm:px-6 lg:px-8">
        <div className="space-y-2">
          <div className="h-12 w-64 bg-[color-mix(in_oklab,var(--surface-strong)_72%,transparent)]" />
        </div>

        <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
          <div className="h-12.5 bg-[color-mix(in_oklab,var(--surface-strong)_72%,transparent)]" />
          <div className="h-10.5 w-44 bg-[color-mix(in_oklab,var(--surface-strong)_72%,transparent)]" />
        </div>

        <div className="overflow-hidden bg-[color-mix(in_oklab,var(--surface-strong)_36%,transparent)]">
          <div className="flex items-start gap-4 px-5 py-5">
            <div className="mt-1 h-9 w-9 bg-[color-mix(in_oklab,var(--surface-strong)_72%,transparent)]" />
            <div className="flex-1 space-y-3">
              <div className="h-4 w-28 bg-[color-mix(in_oklab,var(--surface-strong)_72%,transparent)]" />
              <div className="h-7 w-40 bg-[color-mix(in_oklab,var(--surface-strong)_72%,transparent)]" />
              <div className="h-5 w-32 bg-[color-mix(in_oklab,var(--surface-strong)_72%,transparent)]" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="h-5 w-36 bg-[color-mix(in_oklab,var(--surface-strong)_72%,transparent)]" />
          <div className="flex items-center gap-3 self-start sm:self-auto">
            <div className="h-9 w-20 bg-[color-mix(in_oklab,var(--surface-strong)_72%,transparent)]" />
            <div className="h-5 w-10 bg-[color-mix(in_oklab,var(--surface-strong)_72%,transparent)]" />
            <div className="h-9 w-14 bg-[color-mix(in_oklab,var(--surface-strong)_72%,transparent)]" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function WritingIndex() {
  const [query, setQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const { data: postsResponse, error, isLoading } = useZenblogPosts({ limit: 100 });
  const { data: tagsResponse } = useZenblogTags();

  const tags = (tagsResponse?.data ?? []).map((tag) => ({
    label: tag.name,
    value: tag.slug,
  }));

  const filteredPosts = (() => {
    const normalizedQuery = query.trim().toLowerCase();
    const posts = postsResponse?.data ?? [];

    return posts.filter((post) => {
      const matchesTag =
        selectedTags.length === 0 ||
        selectedTags.some((selectedTag) =>
          (post.tags ?? []).some((tag) => tag.slug === selectedTag),
        );
      const matchesQuery =
        normalizedQuery.length === 0 ||
        post.title.toLowerCase().includes(normalizedQuery) ||
        post.excerpt?.toLowerCase().includes(normalizedQuery) ||
        (post.tags ?? []).some(
          (tag) =>
            tag.name.toLowerCase().includes(normalizedQuery) ||
            tag.slug.toLowerCase().includes(normalizedQuery),
        );

      return matchesTag && matchesQuery;
    });
  })();

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / WRITING_PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * WRITING_PAGE_SIZE,
    currentPage * WRITING_PAGE_SIZE,
  );

  const updateQuery = (value: string) => {
    setQuery(value);
    setPage(1);
  };

  const updateTags = (tags: string[]) => {
    setSelectedTags(tags);
    setPage(1);
  };

  useEffect(() => {
    if (isLoading) {
      setIsContentVisible(false);
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setIsContentVisible(true);
    }, 40);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isLoading]);

  if (isLoading) {
    return <WritingIndexSkeleton />;
  }

  return (
    <section aria-labelledby="writing-index-title">
      <div
        className={`mx-auto flex max-w-2xl flex-col gap-5 px-4 text-left transition-all duration-300 sm:px-6 lg:px-8 ${
          isContentVisible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        }`}
      >
        <div className="space-y-2">
          <h2
            id="writing-index-title"
            className="text-2xl font-bold tracking-tight text-(--sea-ink) sm:text-3xl"
          >
            thoughts & notes
          </h2>
        </div>

        <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
          <label className="flex min-w-0 items-center gap-3 border border-(--line) bg-transparent px-4 py-3">
            <Search className="h-4 w-4 text-(--sea-ink-soft)" />
            <input
              value={query}
              onChange={(event) => updateQuery(event.target.value)}
              placeholder="Search writing by title, summary, or tag"
              className="min-w-0 flex-1 bg-transparent text-sm text-(--sea-ink) outline-none placeholder:text-(--sea-ink-soft)"
              aria-label="Search writing"
            />
          </label>

          <label className="flex items-center justify-between gap-3 text-sm text-(--sea-ink-soft) sm:justify-start">
            <span>Tags:</span>
            <MultiSelect
              ariaLabel="Filter by tags"
              options={tags}
              placeholder="All tags"
              value={selectedTags}
              onValueChange={updateTags}
              className="min-w-44"
            />
          </label>
        </div>

        <div className="overflow-hidden border border-(--line)">
          {error ? (
            <div className="px-5 py-12 text-center">
              <p className="text-base font-semibold text-(--sea-ink)">
                Could not load writing right now.
              </p>
              <p className="mt-2 text-sm text-(--sea-ink-soft)">{error.message}</p>
            </div>
          ) : paginatedPosts.length > 0 ? (
            <ul className="divide-y divide-(--line)">
              {paginatedPosts.map((post) => (
                <li key={post.slug}>
                  <a
                    href={`/writing/${post.slug}`}
                    className="group flex items-start gap-4 px-5 py-5 no-underline"
                  >
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center text-(--sea-ink-soft)">
                      <Bookmark className="h-4 w-4" />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block text-xs uppercase tracking-[0.16em] text-(--sea-ink-soft)">
                        {formatPublishedDate(post.published_at)}
                      </span>
                      <span className="mt-1 block text-base font-medium text-(--sea-ink)">
                        {post.title}
                      </span>
                      {post.excerpt ? (
                        <span className="mt-1 block text-sm text-(--sea-ink-soft)">
                          {post.excerpt}
                        </span>
                      ) : null}
                    </span>

                    <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-(--lagoon-deep) opacity-100 transition-all duration-200 sm:-translate-x-1.5 sm:opacity-0 sm:group-hover:translate-x-0 sm:group-hover:opacity-100 sm:group-focus-visible:translate-x-0 sm:group-focus-visible:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-5 py-12 text-center">
              <p className="text-base font-semibold text-(--sea-ink)">
                No writing matched your search.
              </p>
              <p className="mt-2 text-sm text-(--sea-ink-soft)">
                Try a different tag or a shorter keyword.
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3 text-sm text-(--sea-ink-soft) sm:flex-row sm:items-center sm:justify-between">
          <p>
            Showing <span className="font-semibold text-(--sea-ink)">{paginatedPosts.length}</span>{" "}
            of <span className="font-semibold text-(--sea-ink)">{filteredPosts.length}</span>{" "}
            entries
          </p>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setPage((value) => Math.max(1, value - 1))}
              disabled={currentPage === 1}
              className="border border-(--line) bg-transparent px-3 py-1.5 text-(--sea-ink) disabled:cursor-not-allowed disabled:opacity-45"
            >
              Previous
            </button>
            <span className="min-w-20 text-center text-(--sea-ink)">
              {currentPage} / {totalPages}
            </span>
            <button
              type="button"
              onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
              disabled={currentPage === totalPages}
              className="border border-(--line) bg-transparent px-3 py-1.5 text-(--sea-ink) disabled:cursor-not-allowed disabled:opacity-45"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
