import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import WritingIndex, { WRITING_PAGE_SIZE, writingEntries } from "../../components/WritingIndex";

describe("WritingIndex", () => {
  it("renders the writing heading", () => {
    render(<WritingIndex />);

    expect(screen.getByText("thoughts & notes")).toBeTruthy();
  });

  it("filters entries by search query", () => {
    render(<WritingIndex />);

    const queryEntry = writingEntries.find((entry) =>
      entry.title.toLowerCase().includes("supabase"),
    );
    const nonMatchingEntry = writingEntries.find(
      (entry) => !entry.title.toLowerCase().includes("supabase"),
    );

    expect(queryEntry).toBeTruthy();
    expect(nonMatchingEntry).toBeTruthy();

    fireEvent.change(screen.getByLabelText("Search writing"), {
      target: { value: "supabase" },
    });

    expect(screen.getByText(queryEntry!.title)).toBeTruthy();
    expect(screen.queryByText(nonMatchingEntry!.title)).toBeNull();
  });

  it("filters entries by tag", () => {
    render(<WritingIndex />);

    const selectedTag = writingEntries[0]!.tags[0]!;
    const matchingEntry = writingEntries.find((entry) => entry.tags.includes(selectedTag));
    const nonMatchingEntry = writingEntries.find((entry) => !entry.tags.includes(selectedTag));

    fireEvent.click(screen.getByLabelText("Filter by tags"));
    fireEvent.click(screen.getByRole("button", { name: selectedTag }));

    expect(screen.getByText(matchingEntry!.title)).toBeTruthy();
    expect(screen.queryByText(nonMatchingEntry!.title)).toBeNull();
  });

  it("paginates entries", () => {
    render(<WritingIndex />);

    const firstPageEntry = writingEntries[0]!;
    const secondPageEntry = writingEntries[WRITING_PAGE_SIZE]!;

    expect(screen.getByText(firstPageEntry.title)).toBeTruthy();
    expect(screen.queryByText(secondPageEntry.title)).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "Next" }));

    expect(screen.getByText(secondPageEntry.title)).toBeTruthy();
  });
});
