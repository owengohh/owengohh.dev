import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import Socials from "../../components/Socials";

describe("Socials", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders GitHub link with correct href", () => {
    render(<Socials />);

    const links = screen.getAllByRole("link");
    const githubLink = links.find(
      (link) => link.getAttribute("href") === "https://github.com/owengohh",
    );
    expect(githubLink).toBeTruthy();
  });

  it("renders LinkedIn link with correct href", () => {
    render(<Socials />);

    const links = screen.getAllByRole("link");
    const linkedinLink = links.find(
      (link) => link.getAttribute("href") === "https://linkedin.com/in/owengohh",
    );
    expect(linkedinLink).toBeTruthy();
  });

  it("opens links in new tab", () => {
    render(<Socials />);

    const links = screen.getAllByRole("link");
    links.forEach((link) => {
      expect(link.getAttribute("target")).toBe("_blank");
      expect(link.getAttribute("rel")).toBe("noopener noreferrer");
    });
  });

  it("renders both social links", () => {
    render(<Socials />);

    const links = screen.getAllByRole("link");
    expect(links.length).toBe(2);
  });
});
