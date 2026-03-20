import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Command } from "cmdk";
import { Search } from "lucide-react";

type ThemeMode = "light" | "dark" | "auto";

function applyThemeMode(mode: ThemeMode) {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const resolved = mode === "auto" ? (prefersDark ? "dark" : "light") : mode;

  document.documentElement.classList.remove("light", "dark");
  document.documentElement.classList.add(resolved);

  if (mode === "auto") {
    document.documentElement.removeAttribute("data-theme");
  } else {
    document.documentElement.setAttribute("data-theme", mode);
  }

  document.documentElement.style.colorScheme = resolved;
}

export default function CommandMenu() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

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
    setOpen(false);
  };

  const navigateTo = (to: string) => {
    navigate({ to });
    setOpen(false);
  };

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 animate-cmdk-overlay bg-black/50 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />
      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        className="fixed left-1/2 top-1/2 z-50 max-h-85 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 animate-cmdk-dialog overflow-hidden rounded-2xl border border-(--line) bg-(--header-bg) p-0 shadow-2xl backdrop-blur-xl"
      >
        <div className="flex items-center border-b border-(--line) px-4">
          <Search className="h-4 w-4 text-(--sea-ink-soft)" />
          <Command.Input
            placeholder="Type a command or search..."
            className="h-12 w-full bg-transparent px-3 text-sm text-(--sea-ink) outline-none placeholder:text-(--sea-ink-soft)"
          />
          <kbd className="pointer-events-none ml-auto hidden h-6 shrink-0 select-none items-center gap-1 rounded-md border border-(--line) bg-(--chip-bg) px-2 font-mono text-[10px] font-medium text-(--sea-ink-soft) sm:flex">
            ESC
          </kbd>
        </div>
        <Command.List className="max-h-80 overflow-y-auto p-2">
          <Command.Empty className="py-8 text-center text-sm text-(--sea-ink-soft)">
            No results found.
          </Command.Empty>
          <Command.Group
            heading="Navigation"
            className="**:[[cmdk-group-heading]]:mb-2 **:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:text-xs `**:[[cmdk-group-heading]]:font-medium **:[[cmdk-group-heading]]:text-(--sea-ink-soft)"
          >
            <Command.Item
              onSelect={() => navigateTo("/")}
              className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-(--sea-ink) data-[selected=true]:bg-(--link-bg-hover)"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-(--chip-bg) text-xs font-medium text-(--sea-ink-soft)">
                H
              </span>
              Home
            </Command.Item>
          </Command.Group>
          <Command.Group
            heading="Theme"
            className="mt-4 **:[[cmdk-group-heading]]:mb-2 **:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:text-xs `**:[[cmdk-group-heading]]:font-medium **:[[cmdk-group-heading]]:text-(--sea-ink-soft)"
          >
            <Command.Item
              onSelect={() => setTheme("light")}
              className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-(--sea-ink) data-[selected=true]:bg-(--link-bg-hover)"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-(--chip-bg) text-xs font-medium text-(--sea-ink-soft)">
                L
              </span>
              Light
            </Command.Item>
            <Command.Item
              onSelect={() => setTheme("dark")}
              className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-(--sea-ink) data-[selected=true]:bg-(--link-bg-hover)"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-(--chip-bg) text-xs font-medium text-(--sea-ink-soft)">
                D
              </span>
              Dark
            </Command.Item>
            <Command.Item
              onSelect={() => setTheme("auto")}
              className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-(--sea-ink) data-[selected=true]:bg-(--link-bg-hover)"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-(--chip-bg) text-xs font-medium text-(--sea-ink-soft)">
                S
              </span>
              System
            </Command.Item>
          </Command.Group>
        </Command.List>
        <div className="flex items-center justify-between border-t border-(--line) px-4 py-3">
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
    </>
  );
}
