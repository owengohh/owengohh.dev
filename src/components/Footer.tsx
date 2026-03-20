export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto px-4 py-6 text-(--sea-ink-soft)">
      <div className="page-wrap flex items-center justify-center">
        <p className="m-0 text-sm">&copy; {year} owengohh.dev</p>
      </div>
    </footer>
  );
}
