import ThemeToggle from "@/components/ThemeToggle";
import ProductCard from "@/components/ProductCard";
import { getLatestRelease, getLatestPrefixedRelease } from "@/lib/releases";

export default async function Home() {
  const [phoebeos, celestia, noc] = await Promise.all([
    getLatestRelease("zaicv/phoebeos-releases"),
    getLatestPrefixedRelease("zaicv/the-noc-releases", "celestia-v"),
    getLatestPrefixedRelease("zaicv/the-noc-releases", "v", "celestia-v"),
  ]);

  const products = [
    {
      name: "PhoebeOS",
      tagline: "An adaptive companion, always on.",
      description:
        "A personal operating layer that learns how you work and quietly keeps everything in sync across your devices.",
      icon: "/icons/phoebeos.png",
      accent: "radial-gradient(circle, var(--glow-a), transparent 70%)",
      requirement: "macOS · Apple Silicon & Intel",
      ...phoebeos,
    },
    {
      name: "Celestia",
      tagline: "Your vault, as a place in Finder.",
      description:
        "Celestia turns your notes into a real macOS location — browse, search, and drop files into your vault like any other folder.",
      icon: "/icons/celestia.png",
      accent: "radial-gradient(circle, var(--glow-b), transparent 70%)",
      requirement: "macOS 26.2+",
      ...celestia,
    },
    {
      name: "The N.O.C.",
      tagline: "Command center for your knowledge.",
      description:
        "The N.O.C. is a native control room for your vault — agents, notes, and search, built for speed and built to stay out of your way.",
      icon: "/icons/noc.png",
      accent: "radial-gradient(circle, var(--glow-a), transparent 70%)",
      requirement: "macOS · Universal",
      ...noc,
    },
  ];

  return (
    <div className="relative min-h-dvh overflow-hidden">
      <div className="glow-blob h-96 w-96 opacity-40" style={{ top: "-6rem", left: "-6rem", background: "var(--glow-a)" }} />
      <div className="glow-blob h-96 w-96 opacity-30" style={{ top: "20%", right: "-8rem", background: "var(--glow-b)" }} />
<Image src="/icon-market.png" alt="The Market" width={96} height={96} className="mx-auto mb-6" priority />
      <header className="relative z-10 mx-auto flex max-w-5xl items-center justify-between px-6 py-8">
        <span className="text-lg font-semibold tracking-tight">The Market</span>
        <ThemeToggle />
      </header>

      <main className="relative z-10 mx-auto max-w-5xl px-6 pb-24">
        <section className="py-14 text-center sm:py-20">
          <div className="glass-card mx-auto mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Native macOS apps, built independently
          </div>
          <Image src="/icon-market.png" alt="The Market" width={96} height={96} className="mx-auto mb-6" priority />
          <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
            Everything I build,
            <br />
            <span className="text-secondary">in one place.</span>
          </h1>
          <p className="text-secondary mx-auto mt-5 max-w-xl text-base sm:text-lg">
            Download links for every app, always pointed at the latest release. No accounts, no tracking &mdash; just the .dmg.
          </p>
        </section>

        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.name} product={p} />
          ))}
        </section>
      </main>

      <footer className="text-secondary relative z-10 mx-auto max-w-5xl px-6 pb-10 text-center text-xs">
        Built by Isaiah Briggs. Releases pulled live from GitHub.
      </footer>
    </div>
  );
}

export const revalidate = 300;
