# owengohh.dev

Personal portfolio and blog built with TanStack Start.

## Tech Stack

- **Framework**: TanStack Start (React SSR framework)
- **Routing**: TanStack Router with file-based routing in `src/routes/`
- **Styling**: Tailwind CSS v4
- **Build Tool**: Vite+ (wraps Vite, Rolldown, Vitest)
- **Package Manager**: pnpm (via Vite+)
- **Deployment**: Netlify

## Commands

All commands use `vp` (Vite+ CLI):

```bash
vp dev       # Start dev server on port 3000
vp build     # Build for production
vp test      # Run tests
vp check     # Run format, lint, and type checks
```

Use `vp` instead of pnpm/npm directly for package operations:
```bash
vp add <package>    # Add dependency
vp remove <package> # Remove dependency
```

## Project Structure

```
src/
  routes/           # File-based routes
    __root.tsx      # Root layout (Header, Footer, theme script)
    index.tsx       # Home page
    about.tsx       # About page
  components/       # Reusable components
    Header.tsx
    Footer.tsx
    ThemeToggle.tsx
  styles.css        # Global styles + Tailwind import
  router.tsx        # Router config
```

## Key Patterns

- **Path aliases**: Use `#/*` imports (e.g., `import Foo from "#/components/Foo"`)
- **Layout**: Edit `src/routes/__root.tsx` for site-wide changes
- **Theme**: Dark/light/auto theme with localStorage persistence and SSR support
- **suppressHydrationWarning**: Required on `<html>` due to theme script

## Notes

- See AGENTS.md for Vite+ specific guidance
- Run `vp check` and `vp test` before committing changes
