import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import CommandMenu from "../../components/CommandMenu";
import { getRecentTabs, addRecentTab } from "../../lib/recent-tabs";

const navigateMock = vi.fn();

vi.mock("@tanstack/react-router", async () => {
  const actual = await vi.importActual<typeof import("@tanstack/react-router")>(
    "@tanstack/react-router",
  );

  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

describe("CommandMenu", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    navigateMock.mockReset();
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
      expect(screen.queryByPlaceholderText("Type a command or search...")).toBeNull();
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
      expect(screen.queryByPlaceholderText("Type a command or search...")).toBeNull();
    });

    it("switches to system theme when System is selected", async () => {
      render(<CommandMenu />);

      fireEvent.keyDown(document, { key: "k", metaKey: true });

      const systemOption = screen.getByRole("option", { name: /System/ });

      await act(async () => {
        fireEvent.click(systemOption);
      });

      expect(window.localStorage.getItem("theme")).toBe("auto");
      expect(screen.queryByPlaceholderText("Type a command or search...")).toBeNull();
    });
  });

  describe("navigation", () => {
    it("renders navigation items", () => {
      render(<CommandMenu />);

      fireEvent.keyDown(document, { key: "k", metaKey: true });

      expect(screen.getByRole("option", { name: /Home/ })).toBeTruthy();
    });

    it("closes the menu when a navigation item is selected", async () => {
      render(<CommandMenu />);

      fireEvent.keyDown(document, { key: "k", metaKey: true });

      const homeOption = screen.getByRole("option", { name: /Home/ });

      await act(async () => {
        fireEvent.click(homeOption);
      });

      expect(screen.queryByPlaceholderText("Type a command or search...")).toBeNull();
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

  describe("mobile view", () => {
    it("renders mobile search button", () => {
      render(<CommandMenu />);

      const searchButton = screen.getByLabelText("Open search");
      expect(searchButton).toBeTruthy();
      expect(searchButton.className).toContain("lg:hidden");
    });

    it("opens menu when mobile search button is clicked", () => {
      render(<CommandMenu />);

      const searchButton = screen.getByLabelText("Open search");
      fireEvent.click(searchButton);

      expect(screen.getByPlaceholderText("Type a command or search...")).toBeTruthy();
    });

    it("renders mobile close button when menu is open", () => {
      render(<CommandMenu />);

      fireEvent.keyDown(document, { key: "k", metaKey: true });

      const closeButton = screen.getByLabelText("Close command menu");
      expect(closeButton).toBeTruthy();
      expect(closeButton.textContent).toBe("Close");
    });

    it("closes menu when mobile close button is clicked", async () => {
      render(<CommandMenu />);

      fireEvent.keyDown(document, { key: "k", metaKey: true });
      expect(screen.getByPlaceholderText("Type a command or search...")).toBeTruthy();

      const closeButton = screen.getByLabelText("Close command menu");
      await act(async () => {
        fireEvent.click(closeButton);
      });

      expect(screen.queryByPlaceholderText("Type a command or search...")).toBeNull();
    });

    it("shows mobile footer text when menu is open", () => {
      render(<CommandMenu />);

      fireEvent.keyDown(document, { key: "k", metaKey: true });

      expect(screen.getByText("Tap outside to close")).toBeTruthy();
    });
  });

  describe("recent tabs", () => {
    it("does not show recent section when no recent tabs exist", () => {
      render(<CommandMenu />);

      fireEvent.keyDown(document, { key: "k", metaKey: true });

      expect(screen.queryByText("Recent")).toBeNull();
    });

    it("shows recent section when recent tabs exist", () => {
      addRecentTab("/about", "About");
      render(<CommandMenu />);

      fireEvent.keyDown(document, { key: "k", metaKey: true });

      expect(screen.getByText("Recent")).toBeTruthy();
    });

    it("displays recent tab with custom title", () => {
      addRecentTab("/writing/test-post", "Test Post Title");
      render(<CommandMenu />);

      fireEvent.keyDown(document, { key: "k", metaKey: true });

      expect(screen.getByRole("option", { name: /Test Post Title/ })).toBeTruthy();
    });

    it("adds path to recent tabs via addRecentTab function", () => {
      addRecentTab("/", "Home");

      const recentTabs = getRecentTabs();
      expect(recentTabs.some((t) => t.path === "/")).toBe(true);
    });

    it("moves recent tab to front when added again", () => {
      addRecentTab("/", "Home");
      addRecentTab("/about", "About");
      addRecentTab("/", "Home");

      const recentTabs = getRecentTabs();
      expect(recentTabs[0].path).toBe("/");
      expect(recentTabs.length).toBe(2);
    });

    it("limits recent tabs to 5 items", () => {
      addRecentTab("/1", "One");
      addRecentTab("/2", "Two");
      addRecentTab("/3", "Three");
      addRecentTab("/4", "Four");
      addRecentTab("/5", "Five");
      addRecentTab("/6", "Six");

      const recentTabs = getRecentTabs();
      expect(recentTabs.length).toBe(5);
      expect(recentTabs[0].path).toBe("/6");
    });

    it("migrates old string format to object format", () => {
      window.localStorage.setItem("owengohh-recent-tabs", JSON.stringify(["/about", "/"]));

      const tabs = getRecentTabs();

      expect(tabs).toEqual([{ path: "/about" }, { path: "/" }]);
    });
  });
});
