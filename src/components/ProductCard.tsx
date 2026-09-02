import Image from "next/image";

type Product = {
  name: string;
  tagline: string;
  description: string;
  icon: string;
  accent: string;
  downloadUrl: string | null;
  releasesPageUrl: string;
  version: string | null;
  sizeMb: number | null;
  requirement: string;
};

export default function ProductCard({ product }: { product: Product }) {
  const { name, tagline, description, icon, accent, downloadUrl, releasesPageUrl, version, sizeMb, requirement } =
    product;
  const available = Boolean(downloadUrl);

  return (
    <div className="glass-card relative flex flex-col gap-5 overflow-hidden rounded-3xl p-8 transition-transform duration-300 hover:-translate-y-1">
      <div
        className="glow-blob h-40 w-40 -translate-y-1/2 translate-x-1/3 opacity-70"
        style={{ top: 0, right: 0, background: accent }}
      />
      <div className="relative z-10 flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="h-16 w-16 shrink-0 overflow-hidden rounded-[18px] shadow-lg ring-1 ring-black/5">
            <Image src={icon} alt={`${name} icon`} width={64} height={64} className="h-full w-full object-cover" />
          </div>
          <div>
            <h3 className="text-xl font-semibold tracking-tight">{name}</h3>
            <p className="text-secondary text-sm">{tagline}</p>
          </div>
        </div>
        {available && (
          <span className="glass-card shrink-0 rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap">
            {version ?? "latest"}
          </span>
        )}
      </div>
      <p className="text-secondary relative z-10 text-sm leading-relaxed">{description}</p>
      <div className="relative z-10 mt-auto flex flex-col gap-3">
        {available ? (
          
            href={downloadUrl!}
            className="flex items-center justify-center gap-2 rounded-2xl bg-[var(--text-primary)] px-5 py-3 text-[var(--bg-from)] transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <svg width="16" height="16" viewBox="0 0 384 512" fill="currentColor" aria-hidden>
              <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
            </svg>
            <span className="font-medium whitespace-nowrap">Download for macOS</span>
          </a>
        ) : (
          
            href={releasesPageUrl}
            className="glass-card flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-medium transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Coming soon &mdash; follow releases
          </a>
        )}
        <p className="text-secondary text-center text-xs">
          {available ? `${requirement}${sizeMb ? ` · ${sizeMb} MB` : ""}` : requirement}
        </p>
      </div>
    </div>
  );
}
