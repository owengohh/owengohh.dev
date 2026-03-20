export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-[var(--line)] px-4 py-6 text-[var(--sea-ink-soft)]">
      <div className="page-wrap flex items-center justify-center">
        <p className="m-0 text-sm">&copy; {year} Owen Goh. All rights reserved.</p>
      </div>
    </footer>
  );
}
