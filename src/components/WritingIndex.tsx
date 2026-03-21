import { useMemo, useState } from "react";
import { ArrowRight, Bookmark, Search } from "lucide-react";
import { MultiSelect } from "#/components/ui/multi-select";

type WritingEntry = {
  title: string;
  description?: string;
  href: string;
  createdAt: string;
  tags: string[];
};

const entries: WritingEntry[] = [
  {
    title: "Ship Postgres Migrations Without Surprises",
    description: "A practical checklist for making schema changes feel routine.",
    href: "/writing/postgres-migrations",
    createdAt: "Mar 18, 2026",
    tags: ["Engineering", "Workflow"],
  },
  {
    title: "Personal Philosophy for Building on the Web",
    description: "The principles I return to when software starts getting noisy.",
    href: "/writing/personal-philosophy",
    createdAt: "Mar 10, 2026",
    tags: ["Career", "Personal"],
  },
  {
    title: "How I Think About Productive Side Projects",
    description: "Choosing projects small enough to finish and interesting enough to keep.",
    href: "/writing/side-projects",
    createdAt: "Mar 3, 2026",
    tags: ["Career", "Writing"],
  },
  {
    title: "A Tiny Setup for Writing Better Technical Notes",
    description: "A notes workflow that stays useful once the excitement wears off.",
    href: "/writing/technical-notes",
    createdAt: "Feb 27, 2026",
    tags: ["Writing", "Workflow"],
  },
  {
    title: "ESP32 Captive Portal Wi-Fi Provisioning",
    description: "A bookmarkable implementation guide for painless device onboarding.",
    href: "/writing/esp32-provisioning",
    createdAt: "Feb 14, 2026",
    tags: ["Engineering", "Hardware"],
  },
  {
    title: "What to Post on Twitter When You Have Nothing to Say",
    description: "A few prompts for shipping ideas before they calcify in drafts.",
    href: "/writing/posting-online",
    createdAt: "Feb 4, 2026",
    tags: ["Writing", "Personal"],
  },
  {
    title: "Delete Local Branches Older Than 1 Week",
    description: "A tiny command-line habit that keeps side work tidy.",
    href: "/writing/delete-local-branches",
    createdAt: "Jan 29, 2026",
    tags: ["Workflow", "Engineering"],
  },
  {
    title: "2 Years at Supabase",
    description: "Notes on pace, ownership, and what good developer tools feel like.",
    href: "/writing/two-years-at-supabase",
    createdAt: "Jan 12, 2026",
    tags: ["Career", "Personal"],
  },
  {
    title: "Life-Changing Sleeping Advice",
    description: "Small environmental changes that made my mornings less chaotic.",
    href: "/writing/sleeping-advice",
    createdAt: "Jan 4, 2026",
    tags: ["Personal"],
  },
];

const PAGE_SIZE = 4;

export default function WritingIndex() {
  const [query, setQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [page, setPage] = useState(1);

  const tags = useMemo(() => [...new Set(entries.flatMap((entry) => entry.tags))], []);

  const filteredEntries = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return entries.filter((entry) => {
      const matchesTag =
        selectedTags.length === 0 ||
        selectedTags.some((selectedTag) => entry.tags.includes(selectedTag));
      const matchesQuery =
        normalizedQuery.length === 0 ||
        entry.title.toLowerCase().includes(normalizedQuery) ||
        entry.description?.toLowerCase().includes(normalizedQuery) ||
        entry.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery));

      return matchesTag && matchesQuery;
    });
  }, [query, selectedTags]);

  const totalPages = Math.max(1, Math.ceil(filteredEntries.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginatedEntries = filteredEntries.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const updateQuery = (value: string) => {
    setQuery(value);
    setPage(1);
  };

  const updateTags = (tags: string[]) => {
    setSelectedTags(tags);
    setPage(1);
  };

  return (
    <section className="mx-auto max-w-4xl" aria-labelledby="writing-index-title">
      <div className="flex flex-col gap-6">
        <div className="space-y-2">
          <h2
            id="writing-index-title"
            className="text-2xl font-bold tracking-tight text-(--sea-ink) sm:text-3xl"
          >
            thoughts & notes
          </h2>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="flex flex-1 items-center gap-3 border border-(--line) bg-transparent px-4 py-3">
            <Search className="h-4 w-4 text-(--sea-ink-soft)" />
            <input
              value={query}
              onChange={(event) => updateQuery(event.target.value)}
              placeholder="Search writing by title, summary, or tag"
              className="min-w-0 flex-1 bg-transparent text-sm text-(--sea-ink) outline-none placeholder:text-(--sea-ink-soft)"
              aria-label="Search writing"
            />
          </label>

          <label className="flex items-center gap-2 text-sm text-(--sea-ink-soft)">
            <span>Tags:</span>
            <MultiSelect
              ariaLabel="Filter by tags"
              options={tags.map((tag) => ({ label: tag, value: tag }))}
              placeholder="All tags"
              value={selectedTags}
              onValueChange={updateTags}
            />
          </label>
        </div>

        <div className="overflow-hidden border border-(--line)">
          {paginatedEntries.length > 0 ? (
            <ul className="divide-y divide-(--line)">
              {paginatedEntries.map((entry) => (
                <li key={entry.title}>
                  <a
                    href={entry.href}
                    className="group flex items-start gap-4 px-4 py-4 no-underline sm:px-5"
                  >
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center text-(--sea-ink-soft)">
                      <Bookmark className="h-4 w-4" />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block text-xs uppercase tracking-[0.16em] text-(--sea-ink-soft)">
                        {entry.createdAt}
                      </span>
                      <span className="mt-1 block text-base font-medium text-(--sea-ink)">
                        {entry.title}
                      </span>
                      {entry.description ? (
                        <span className="mt-1 block text-sm text-(--sea-ink-soft)">
                          {entry.description}
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
            Showing{" "}
            <span className="font-semibold text-(--sea-ink)">{paginatedEntries.length}</span> of{" "}
            <span className="font-semibold text-(--sea-ink)">{filteredEntries.length}</span> entries
          </p>

          <div className="flex items-center gap-2">
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
