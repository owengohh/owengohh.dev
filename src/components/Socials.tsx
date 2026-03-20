import { Button } from "./ui/button";
import { SiRefinedgithub } from "@icons-pack/react-simple-icons";
import { LinkedinIcon, ArrowUpRight } from "lucide-react";

export default function Socials() {
  return (
    <div className="flex">
      <Button
        variant="outline"
        size="lg"
        asChild
        className="rounded-none border-(--line) text-(--sea-ink-soft)! hover:text-(--sea-ink)!"
      >
        <a
          href="https://github.com/owengohh"
          target="_blank"
          rel="noopener noreferrer"
          className="group"
        >
          <SiRefinedgithub data-icon="inline-start" />
          owengohh
          <ArrowUpRight className="opacity-0 transition-opacity group-hover:opacity-100" data-icon="inline-end" />
        </a>
      </Button>
      <Button
        variant="outline"
        size="lg"
        asChild
        className="rounded-none border-(--line) border-l-0 text-(--sea-ink-soft)! hover:text-(--sea-ink)!"
      >
        <a
          href="https://linkedin.com/in/owengohh"
          target="_blank"
          rel="noopener noreferrer"
          className="group"
        >
          <LinkedinIcon data-icon="inline-start" />
          owengohh
          <ArrowUpRight className="opacity-0 transition-opacity group-hover:opacity-100" data-icon="inline-end" />
        </a>
      </Button>
    </div>
  );
}
