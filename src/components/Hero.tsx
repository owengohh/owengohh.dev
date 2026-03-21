import Socials from "./Socials";
import CommandMenu from "./CommandMenu";

export default function Hero() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8 text-left sm:px-6 lg:px-8">
      <h1 className="text-xl font-bold tracking-tight text-(--sea-ink)">
        owengohh.dev
      </h1>
      <p className="text-md text-(--sea-ink-soft)">software engineer</p>
      <div className="mt-4">
        <Socials />
      </div>
      <div className="mt-6 flex items-center gap-4">
        <CommandMenu />
        <p className="hidden text-sm text-(--sea-ink-soft) lg:block">
          Press <kbd className="rounded border border-(--line) bg-(--surface) px-1.5 py-0.5 font-mono text-xs">⌘K</kbd> to navigate
        </p>
      </div>
    </div>
  );
}
