import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <main className="flex min-h-[calc(100vh-200px)] flex-col items-center justify-center px-4 py-16">
      <div className="text-center">
        <h1 className="mb-4 text-5xl font-bold tracking-tight text-(--sea-ink) sm:text-6xl">
          owengohh.dev
        </h1>
        <p className="mb-8 text-lg text-(--sea-ink-soft)">Coming soon</p>
      </div>
    </main>
  );
}
