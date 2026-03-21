export default function About() {
  return (
    <main className="page-wrap px-4 py-12 sm:py-16" aria-labelledby="about-title">
      <div className="mx-auto flex max-w-3xl flex-col gap-10">
        <section className="space-y-3">
          <p className="island-kicker">About</p>
          <h1
            id="about-title"
            className="text-3xl font-bold tracking-tight text-(--sea-ink) sm:text-4xl"
          >
            a little more about me.
          </h1>
          <p className="max-w-2xl text-base text-(--sea-ink-soft)">
            i like to experiment with new technologies and build useful and scalable solutions.
          </p>
        </section>

        <section className="border-t border-(--line) pt-8">
          <h2 className="text-xl font-semibold text-(--sea-ink)">hobbies</h2>
          <div className="mt-4 max-w-2xl space-y-4 text-base leading-8 text-(--sea-ink-soft)">
            <p>
              Outside of work, I love unwinding with friends over games—mostly Valorant and
              Hearthstone Battlegrounds. I’m also a frequent gym-goer, and lately I’ve been trying
              to build a better running habit. I recently picked up pickleball (and I’m having a lot
              of fun with it), and I’m also making a conscious effort to read more consistently.
            </p>
          </div>
        </section>

        <section className="border-t border-(--line) pt-8">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-(--sea-ink)">experiences</h2>
            <a
              href="/owen-goh-resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex border border-(--line) px-4 py-2 text-sm font-medium text-(--sea-ink) no-underline hover:bg-(--link-bg-hover)"
            >
              resume
            </a>
          </div>
          <div className="mt-5 space-y-6">
            <article className="grid gap-2 border-l border-(--line) pl-4 sm:grid-cols-[140px_1fr] sm:gap-4 sm:pl-5">
              <p className="text-sm text-(--sea-ink-soft)">Jun 2025 - Mar 2026</p>
              <div className="space-y-1">
                <p className="text-base font-medium text-(--sea-ink)">
                  software engineer intern, govtech
                </p>
                <p className="text-sm text-(--sea-ink-soft)">ai program - maestro</p>
              </div>
            </article>

            <article className="grid gap-2 border-l border-(--line) pl-4 sm:grid-cols-[140px_1fr] sm:gap-4 sm:pl-5">
              <p className="text-sm text-(--sea-ink-soft)">Jan 2025 - May 2025</p>
              <div className="space-y-1">
                <p className="text-base font-medium text-(--sea-ink)">
                  software engineer intern, gic
                </p>
                <p className="text-sm text-(--sea-ink-soft)">digital enterprise solutions</p>
              </div>
            </article>

            <article className="grid gap-2 border-l border-(--line) pl-4 sm:grid-cols-[140px_1fr] sm:gap-4 sm:pl-5">
              <p className="text-sm text-(--sea-ink-soft)">May 2024 - Oct 2024</p>
              <div className="space-y-1">
                <p className="text-base font-medium text-(--sea-ink)">
                  software engineer intern, govtech
                </p>
                <p className="text-sm text-(--sea-ink-soft)">government digital services</p>
              </div>
            </article>
          </div>
        </section>
      </div>
    </main>
  );
}
