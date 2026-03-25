import { fireEvent, render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import WritingIndex, { WRITING_PAGE_SIZE } from "../../components/WritingIndex";

vi.mock("@tanstack/react-router", () => ({
  Link: ({
    children,
    to,
    params,
    ...props
  }: {
    children: ReactNode;
    to: string;
    params?: Record<string, string>;
    [key: string]: unknown;
  }) => {
    const href =
      to === "/writing/$slug" && params?.slug ? `/writing/${params.slug}` : to;

    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  },
}));

const mockPosts = [
  {
    title: "Zenblog Post One",
    slug: "zenblog-post-one",
    published_at: "2026-03-18T00:00:00.000Z",
    excerpt: "Workflow note for calmer teams.",
    tags: [
      { name: "Workflow", slug: "workflow" },
      { name: "Engineering", slug: "engineering" },
    ],
  },
  {
    title: "Supabase Reflection",
    slug: "supabase-reflection",
    published_at: "2026-03-10T00:00:00.000Z",
    excerpt: "Career lessons from building devtools.",
    tags: [{ name: "Career", slug: "career" }],
  },
  {
    title: "Writing Better Notes",
    slug: "writing-better-notes",
    published_at: "2026-03-03T00:00:00.000Z",
    excerpt: "Notes workflow that sticks.",
    tags: [{ name: "Writing", slug: "writing" }],
  },
  {
    title: "Hardware Provisioning",
    slug: "hardware-provisioning",
    published_at: "2026-02-27T00:00:00.000Z",
    excerpt: "Provisioning devices without pain.",
    tags: [{ name: "Hardware", slug: "hardware" }],
  },
  {
    title: "Second Page Entry",
    slug: "second-page-entry",
    published_at: "2026-02-14T00:00:00.000Z",
    excerpt: "Shows pagination works.",
    tags: [{ name: "Personal", slug: "personal" }],
  },
  ...Array.from({ length: WRITING_PAGE_SIZE }, (_, index) => ({
    title: `Archive Note ${index + 1}`,
    slug: `archive-note-${index + 1}`,
    published_at: `2026-01-${String(index + 1).padStart(2, "0")}T00:00:00.000Z`,
    excerpt: `Archived note ${index + 1}.`,
    tags: [{ name: "Notes", slug: "notes" }],
  })),
];

const mockTags = [
  { name: "Workflow", slug: "workflow" },
  { name: "Engineering", slug: "engineering" },
  { name: "Career", slug: "career" },
  { name: "Writing", slug: "writing" },
  { name: "Hardware", slug: "hardware" },
  { name: "Personal", slug: "personal" },
  { name: "Notes", slug: "notes" },
];

vi.mock("../../hooks/useZenblogPosts", () => ({
  useZenblogPosts: () => ({
    data: { data: mockPosts, total: mockPosts.length, offset: 0, limit: 100 },
    error: null,
    isLoading: false,
    refetch: vi.fn(),
  }),
}));

vi.mock("../../hooks/useZenblogTags", () => ({
  useZenblogTags: () => ({
    data: { data: mockTags, total: mockTags.length, offset: 0, limit: mockTags.length },
    error: null,
    isLoading: false,
    refetch: vi.fn(),
  }),
}));

describe("WritingIndex", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the writing heading", () => {
    render(<WritingIndex />);

    expect(screen.getByText("thoughts & notes")).toBeTruthy();
  });

  it("filters entries by search query", () => {
    render(<WritingIndex />);

    fireEvent.change(screen.getByLabelText("Search writing"), {
      target: { value: "supabase" },
    });

    expect(screen.getByText("Supabase Reflection")).toBeTruthy();
    expect(screen.queryByText("Zenblog Post One")).toBeNull();
  });

  it("filters entries by tag", () => {
    render(<WritingIndex />);

    fireEvent.click(screen.getByLabelText("Filter by tags"));
    fireEvent.click(screen.getByRole("button", { name: "Workflow" }));

    expect(screen.getByText("Zenblog Post One")).toBeTruthy();
    expect(screen.queryByText("Supabase Reflection")).toBeNull();
  });

  it("paginates entries", () => {
    const firstPagePost = mockPosts[0];
    const secondPagePost = mockPosts.slice(WRITING_PAGE_SIZE)[0];

    expect(firstPagePost).toBeDefined();
    expect(secondPagePost).toBeDefined();

    render(<WritingIndex />);

    expect(screen.getByText(firstPagePost!.title)).toBeTruthy();
    expect(screen.queryByText(secondPagePost!.title)).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "Next" }));

    expect(screen.getByText(secondPagePost!.title)).toBeTruthy();
  });
});
