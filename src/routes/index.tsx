import { createFileRoute } from "@tanstack/react-router";
import Hero from "../components/Hero";
import WritingIndex from "../components/WritingIndex";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <main className="page-wrap flex min-h-[calc(100vh-200px)] flex-col gap-10 px-4 py-12 sm:py-16">
      <div className="text-center">
        <Hero />
      </div>
      <WritingIndex />
    </main>
  );
}
