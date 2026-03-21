import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import WritingIndex from "../../components/WritingIndex";

describe("WritingIndex", () => {
  it("renders the writing heading", () => {
    render(<WritingIndex />);

    expect(screen.getByText("Thoughts, notes & bookmarks")).toBeTruthy();
  });

  it("filters entries by search query", () => {
    render(<WritingIndex />);

    fireEvent.change(screen.getByLabelText("Search writing"), {
      target: { value: "supabase" },
    });

    expect(screen.getByText("2 Years at Supabase")).toBeTruthy();
    expect(screen.queryByText("Life-Changing Sleeping Advice")).toBeNull();
  });

  it("filters entries by tag", () => {
    render(<WritingIndex />);

    fireEvent.click(screen.getByLabelText("Filter by tags"));
    fireEvent.click(screen.getByRole("button", { name: /Workflow/ }));

    expect(screen.getByText("Delete Local Branches Older Than 1 Week")).toBeTruthy();
    expect(screen.queryByText("2 Years at Supabase")).toBeNull();
  });

  it("paginates entries", () => {
    render(<WritingIndex />);

    expect(screen.getByText("Ship Postgres Migrations Without Surprises")).toBeTruthy();
    expect(screen.queryByText("ESP32 Captive Portal Wi-Fi Provisioning")).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "Next" }));

    expect(screen.getByText("ESP32 Captive Portal Wi-Fi Provisioning")).toBeTruthy();
  });
});
