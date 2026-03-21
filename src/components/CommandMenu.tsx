import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Command } from "cmdk";
import { Search } from "lucide-react";
import { routes } from "#/lib/routes";

type ThemeMode = "light" | "dark" | "auto";

function applyThemeMode(mode: ThemeMode) {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const resolved = mode === "auto" ? (prefersDark ? "dark" : "light") : mode;

  document.documentElement.classList.remove("light", "dark");
  document.documentElement.classList.add(resolved);
  document.documentElement.setAttribute("data-theme", mode);

  document.documentElement.style.colorScheme = resolved;
}

export default function CommandMenu() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const setTheme = (mode: ThemeMode) => {
    applyThemeMode(mode);
    localStorage.setItem("theme", mode);
    close();
  };

  const navigateTo = (to: string) => {
    void navigate({ to });
    close();
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed left-1/2 z-30 flex h-13 w-13 -translate-x-1/2 items-center justify-center rounded-full border border-(--line) bg-[color-mix(in_oklab,var(--surface-strong)_88%,var(--chip-bg)_12%)] text-(--sea-ink-soft) shadow-[0_16px_36px_rgba(0,0,0,0.22)] backdrop-blur-md hover:-translate-y-0.5 hover:bg-(--link-bg-hover) lg:hidden"
        style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 0.75rem)" }}
        aria-label="Open search"
      >
        <Search className="h-5 w-5" />
      </button>

      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        className="fixed top-[12svh] left-1/2 z-50 flex max-h-[min(30rem,68svh)] w-[min(20rem,calc(100vw-3rem))] -translate-x-1/2 animate-cmdk-dialog flex-col overflow-hidden rounded-[1.4rem] border border-(--line) bg-[color-mix(in_oklab,var(--header-bg)_88%,var(--surface-strong)_12%)] p-0 shadow-[0_24px_70px_rgba(0,0,0,0.28)] backdrop-blur-xl data-[state=closed]:hidden sm:top-1/2 sm:max-h-[80dvh] sm:w-full sm:max-w-lg sm:-translate-y-1/2 sm:rounded-2xl"
      >
        <div className="flex items-center gap-2.5 border-b border-(--line) px-3 sm:px-4">
          <Search className="h-4 w-4 text-(--sea-ink-soft)" />
          <Command.Input
            placeholder="Type a command or search..."
            className="h-11 min-w-0 flex-1 bg-transparent pr-1 text-sm text-(--sea-ink) outline-none placeholder:text-(--sea-ink-soft)"
          />
          <button
            type="button"
            onClick={close}
            className="flex h-7 shrink-0 items-center rounded-full border border-(--line) bg-(--chip-bg) px-2 text-[10px] font-medium text-(--sea-ink-soft) lg:hidden"
            aria-label="Close command menu"
          >
            Close
          </button>
          <kbd className="pointer-events-none ml-auto hidden h-6 shrink-0 select-none items-center gap-1 rounded-md border border-(--line) bg-(--chip-bg) px-2 font-mono text-[10px] font-medium text-(--sea-ink-soft) lg:flex">
            ESC
          </kbd>
        </div>
        <Command.List className="min-h-0 flex-1 overflow-y-auto px-2 py-2 sm:max-h-[60dvh]">
          <Command.Empty className="py-8 text-center text-sm text-(--sea-ink-soft)">
            No results found.
          </Command.Empty>
          <Command.Group
            heading="Navigation"
            className="**:[[cmdk-group-heading]]:mb-2 **:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:text-xs **:[[cmdk-group-heading]]:font-medium **:[[cmdk-group-heading]]:text-(--sea-ink-soft)"
          >
            {routes.map((route) => (
              <Command.Item
                key={route.path}
                onSelect={() => navigateTo(route.path)}
                className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-1.5 text-sm text-(--sea-ink) data-[selected=true]:bg-(--link-bg-hover)"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-md bg-(--chip-bg) text-xs font-medium text-(--sea-ink-soft)">
                  {route.name[0]}
                </span>
                {route.name}
              </Command.Item>
            ))}
          </Command.Group>
          <Command.Group
            heading="Theme"
            className="mt-4 **:[[cmdk-group-heading]]:mb-2 **:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:text-xs **:[[cmdk-group-heading]]:font-medium **:[[cmdk-group-heading]]:text-(--sea-ink-soft)"
          >
            <Command.Item
              onSelect={() => setTheme("light")}
              className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-1.5 text-sm text-(--sea-ink) data-[selected=true]:bg-(--link-bg-hover)"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-(--chip-bg) text-xs font-medium text-(--sea-ink-soft)">
                L
              </span>
              Light
            </Command.Item>
            <Command.Item
              onSelect={() => setTheme("dark")}
              className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-1.5 text-sm text-(--sea-ink) data-[selected=true]:bg-(--link-bg-hover)"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-(--chip-bg) text-xs font-medium text-(--sea-ink-soft)">
                D
              </span>
              Dark
            </Command.Item>
            <Command.Item
              onSelect={() => setTheme("auto")}
              className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-1.5 text-sm text-(--sea-ink) data-[selected=true]:bg-(--link-bg-hover)"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-(--chip-bg) text-xs font-medium text-(--sea-ink-soft)">
                S
              </span>
              System
            </Command.Item>
          </Command.Group>
        </Command.List>
        <div className="border-t border-(--line) px-3 py-2 text-center text-[10px] text-(--sea-ink-soft) lg:hidden">
          Tap outside to close
        </div>
        <div className="hidden items-center justify-between border-t border-(--line) px-4 py-3 lg:flex">
          <div className="flex items-center gap-2 text-xs text-(--sea-ink-soft)">
            <kbd className="rounded-md border border-(--line) bg-(--chip-bg) px-1.5 py-0.5 font-mono text-[10px]">
              ↑
            </kbd>
            <kbd className="rounded-md border border-(--line) bg-(--chip-bg) px-1.5 py-0.5 font-mono text-[10px]">
              ↓
            </kbd>
            <span>to navigate</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-(--sea-ink-soft)">
            <kbd className="rounded-md border border-(--line) bg-(--chip-bg) px-1.5 py-0.5 font-mono text-[10px]">
              ↵
            </kbd>
            <span>to select</span>
          </div>
        </div>
      </Command.Dialog>

      {open && (
        <div
          className="fixed inset-0 z-40 animate-cmdk-overlay bg-black/50 backdrop-blur-sm"
          onClick={close}
        />
      )}
    </>
  );
}
