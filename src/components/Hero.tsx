import Socials from "./Socials";

export default function Hero() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8 text-left sm:px-6 lg:px-8">
      <h1 className="text-xl font-bold tracking-tight text-(--sea-ink)">
        owengohh.dev
      </h1>
      <p className="text-md text-(--sea-ink-soft)">software engineer</p>
      <div className="mt-4">
        <Socials />
      </div>
    </div>
  );
}
