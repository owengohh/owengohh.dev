import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import Hero from "../../components/Hero";

// Mock CommandMenu since it requires RouterProvider
vi.mock("../../components/CommandMenu", () => ({
  default: () => <div data-testid="command-menu">Search</div>,
}));

describe("Hero", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the site title", () => {
    render(<Hero />);

    expect(screen.getByText("owengohh.dev")).toBeTruthy();
  });

  it("renders the subtitle", () => {
    render(<Hero />);

    expect(screen.getByText("software engineer")).toBeTruthy();
  });

  it("renders social links", () => {
    render(<Hero />);

    const links = screen.getAllByRole("link");
    expect(links.length).toBe(2);
  });

  it("renders mobile search button", () => {
    render(<Hero />);

    expect(screen.getByTestId("command-menu")).toBeTruthy();
  });

  it("renders keyboard shortcut hint", () => {
    render(<Hero />);

    expect(screen.getByText(/⌘K/)).toBeTruthy();
  });
});
