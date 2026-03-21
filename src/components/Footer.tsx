export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="site-footer px-4 py-6 text-(--sea-ink-soft)"
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 1.5rem)" }}
    >
      <div className="page-wrap flex items-center justify-center">
        <p className="m-0 text-sm">&copy; {year} owengohh.dev</p>
      </div>
    </footer>
  );
}
