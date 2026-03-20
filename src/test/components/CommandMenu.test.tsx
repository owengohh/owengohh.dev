import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import CommandMenu from "../../components/CommandMenu";

describe("CommandMenu", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.removeAttribute("data-theme");
    window.localStorage.clear();
  });

  afterEach(() => {
    const menu = document.querySelector("[cmdk-root]");
    if (menu) menu.remove();
  });

  describe("keyboard shortcut", () => {
    it("opens the menu when Cmd+K is pressed", () => {
      render(<CommandMenu />);

      fireEvent.keyDown(document, { key: "k", metaKey: true });

      expect(screen.getByPlaceholderText("Type a command or search...")).toBeTruthy();
    });

    it("opens the menu when Ctrl+K is pressed", () => {
      render(<CommandMenu />);

      fireEvent.keyDown(document, { key: "k", ctrlKey: true });

      expect(screen.getByPlaceholderText("Type a command or search...")).toBeTruthy();
    });

    it("toggles the menu when Cmd+K is pressed twice", () => {
      render(<CommandMenu />);

      fireEvent.keyDown(document, { key: "k", metaKey: true });
      expect(screen.getByPlaceholderText("Type a command or search...")).toBeTruthy();

      fireEvent.keyDown(document, { key: "k", metaKey: true });
      expect(screen.queryByPlaceholderText("Type a command or search...")).toBeNull();
    });
  });

  describe("overlay", () => {
    it("closes the menu when clicking the overlay", () => {
      render(<CommandMenu />);

      fireEvent.keyDown(document, { key: "k", metaKey: true });
      expect(screen.getByPlaceholderText("Type a command or search...")).toBeTruthy();

      const overlay = document.querySelector(".animate-cmdk-overlay");
      if (overlay) fireEvent.click(overlay);

      expect(screen.queryByPlaceholderText("Type a command or search...")).toBeNull();
    });
  });

  describe("theme switching", () => {
    it("switches to light theme when Light is selected", async () => {
      render(<CommandMenu />);

      fireEvent.keyDown(document, { key: "k", metaKey: true });

      const lightOption = screen.getByRole("option", { name: /Light/ });

      await act(async () => {
        fireEvent.click(lightOption);
      });

      expect(document.documentElement.classList.contains("light")).toBe(true);
      expect(window.localStorage.getItem("theme")).toBe("light");
    });

    it("switches to dark theme when Dark is selected", async () => {
      render(<CommandMenu />);

      fireEvent.keyDown(document, { key: "k", metaKey: true });

      const darkOption = screen.getByRole("option", { name: /Dark/ });

      await act(async () => {
        fireEvent.click(darkOption);
      });

      expect(document.documentElement.classList.contains("dark")).toBe(true);
      expect(window.localStorage.getItem("theme")).toBe("dark");
    });

    it("switches to system theme when System is selected", async () => {
      render(<CommandMenu />);

      fireEvent.keyDown(document, { key: "k", metaKey: true });

      const systemOption = screen.getByRole("option", { name: /System/ });

      await act(async () => {
        fireEvent.click(systemOption);
      });

      expect(window.localStorage.getItem("theme")).toBe("auto");
    });
  });

  describe("navigation", () => {
    it("renders navigation items", () => {
      render(<CommandMenu />);

      fireEvent.keyDown(document, { key: "k", metaKey: true });

      expect(screen.getByRole("option", { name: /Home/ })).toBeTruthy();
    });
  });

  describe("empty state", () => {
    it("shows empty state when no results match", () => {
      render(<CommandMenu />);

      fireEvent.keyDown(document, { key: "k", metaKey: true });

      const input = screen.getByPlaceholderText("Type a command or search...");
      fireEvent.change(input, { target: { value: "nonexistent" } });

      expect(screen.getByText("No results found.")).toBeTruthy();
    });
  });
});
