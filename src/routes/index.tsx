import { createFileRoute } from "@tanstack/react-router";
import Hero from "../components/Hero";


export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <main className="min-h-[calc(100vh-200px)] flex-col justify-center px-4 py-16">
      <div className="text-center">
        <Hero />
      </div>
    </main>
  );
}
