import { Button } from "./ui/button";
import { SiRefinedgithub } from "@icons-pack/react-simple-icons";
import { ArrowUpRight } from "lucide-react";

function LinkedinGlyph(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 30 30" aria-hidden="true" fill="currentColor" {...props}>
      <path d="M24,4H6C4.895,4,4,4.895,4,6v18c0,1.105,0.895,2,2,2h18c1.105,0,2-0.895,2-2V6C26,4.895,25.105,4,24,4z M10.954,22h-2.95v-9.492h2.95V22z M9.449,11.151c-0.951,0-1.72-0.771-1.72-1.72c0-0.949,0.77-1.719,1.72-1.719c0.948,0,1.719,0.771,1.719,1.719C11.168,10.38,10.397,11.151,9.449,11.151z M22.004,22h-2.948v-4.616c0-1.101-0.02-2.517-1.533-2.517c-1.535,0-1.771,1.199-1.771,2.437V22h-2.948v-9.492h2.83v1.297h0.04c0.394-0.746,1.356-1.533,2.791-1.533c2.987,0,3.539,1.966,3.539,4.522V22z" />
    </svg>
  );
}

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
          <ArrowUpRight
            className="opacity-0 transition-opacity group-hover:opacity-100"
            data-icon="inline-end"
          />
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
          <LinkedinGlyph className="size-5" data-icon="inline-start" />
          owengohh
          <ArrowUpRight
            className="opacity-0 transition-opacity group-hover:opacity-100"
            data-icon="inline-end"
          />
        </a>
      </Button>
    </div>
  );
}
