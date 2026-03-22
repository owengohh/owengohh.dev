const STORAGE_KEY = "owengohh-recent-tabs";
const MAX_RECENT = 5;

export interface RecentTab {
  path: string;
  title?: string;
}

export function getRecentTabs(): RecentTab[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];

  const parsed = JSON.parse(stored);

  // Migrate old format (array of strings) to new format (array of objects)
  if (parsed.length > 0 && typeof parsed[0] === "string") {
    const migrated = parsed.map((path: string) => ({ path }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
    return migrated;
  }

  return parsed;
}

export function addRecentTab(path: string, title?: string): void {
  const tabs = getRecentTabs();

  // Remove if exists (dedupe)
  const filtered = tabs.filter((t) => t.path !== path);

  // Add to front
  const updated = [{ path, title }, ...filtered].slice(0, MAX_RECENT);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}
