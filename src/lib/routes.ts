export const routes = [
  { path: "/", name: "Home" },
  { path: "/about", name: "About" }
] as const;

export type Route = (typeof routes)[number];
