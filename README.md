# owengohh.dev

My personal portfolio and blog.

[![Netlify Status](https://api.netlify.com/api/v1/badges/e246ed1a-713e-4966-9b2b-aa68f8f54a38/deploy-status)](https://app.netlify.com/projects/owengohh-dev/deploys)

## Tech Stack

### Framework: TanStack Start

A full-stack React framework with SSR built on top of TanStack Router. Provides:

- Server-side rendering with streaming
- Server functions for API calls
- File-based routing
- Type-safe navigation

### Build Tool: Vite+

Unified toolchain that wraps Vite, Rolldown, and Vitest. All commands use `vp`:

```bash
vp dev       # Start dev server
vp build     # Production build
vp test      # Run tests
vp check     # Format, lint, typecheck
vp add       # Add dependency
```

### Routing: TanStack Router

File-based routing in `src/routes/`. Routes are auto-generated from file structure:

```
src/routes/
  __root.tsx      # Root layout
  index.tsx       # /
  about.tsx       # /about
  writing.$slug.tsx  # /writing/:slug
```

### Data Fetching: TanStack Query

Used with custom hooks for blog data from Zenblog:

```tsx
// Hook pattern
const { data, error, isLoading } = useZenblogPosts({ limit: 100 });

// Internally uses server functions + TanStack Query
const fetchPosts = useServerFn(getZenblogPosts);
useQuery({ queryKey: ["zenblog", "posts"], queryFn: fetchPosts });
```

### Styling: Tailwind CSS v4

Utility-first CSS with custom properties for theming. Light/dark/auto themes via CSS variables.

### CMS: Zenblog

Headless blog CMS. Server functions fetch posts/tags server-side to keep API keys secure.

## Development

```bash
pnpm install
vp dev
```

## Testing

```bash
vp test
```

Tests use Vitest with jsdom environment. Component tests are in `src/test/`.

## Project Structure

```
src/
  routes/           # File-based routes
  components/       # React components
    ui/             # UI primitives (button, etc.)
  hooks/            # Custom hooks (useZenblogPosts, etc.)
  lib/              # Utilities and server functions
    zenblog.ts      # Zenblog client
    zenblog-*.ts    # Server functions
    routes.ts       # Route definitions for CommandMenu
  test/             # Test files
  styles.css        # Global styles + Tailwind
```

## Deploy

Deployed on Netlify with automatic builds from main branch.
