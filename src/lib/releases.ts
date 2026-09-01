export type ReleaseInfo = {
  version: string | null;
  downloadUrl: string | null;
  releasesPageUrl: string;
  sizeMb: number | null;
};

type GhAsset = {
  name: string;
  browser_download_url: string;
  size: number;
};

type GhRelease = {
  tag_name: string;
  assets: GhAsset[];
  draft: boolean;
  prerelease: boolean;
};

async function ghFetch<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`https://api.github.com${path}`, {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

function dmgAsset(release: GhRelease | null | undefined): GhAsset | null {
  if (!release) return null;
  return release.assets.find((a) => a.name.toLowerCase().endsWith(".dmg")) ?? null;
}

// Latest single-app release, e.g. zaicv/PhoebeOS.
export async function getLatestRelease(repo: string): Promise<ReleaseInfo> {
  const release = await ghFetch<GhRelease>(`/repos/${repo}/releases/latest`);
  const asset = dmgAsset(release);
  return {
    version: release?.tag_name ?? null,
    downloadUrl: asset?.browser_download_url ?? null,
    releasesPageUrl: `https://github.com/${repo}/releases`,
    sizeMb: asset ? Math.round((asset.size / 1024 / 1024) * 10) / 10 : null,
  };
}

// The N.O.C. and Celestia both ship out of zaicv/the-noc-releases, tagged
// `vX.Y.Z` for the N.O.C. and `celestia-vX.Y.Z` for Celestia (see
// scripts/ship-celestia.sh) — pick the newest release matching the prefix.
export async function getLatestPrefixedRelease(
  repo: string,
  tagPrefix: string,
  excludePrefix?: string
): Promise<ReleaseInfo> {
  const releases = await ghFetch<GhRelease[]>(`/repos/${repo}/releases?per_page=30`);
  const match = releases
    ?.filter((r) => !r.draft && !r.prerelease)
    .filter((r) => r.tag_name.startsWith(tagPrefix))
    .filter((r) => !excludePrefix || !r.tag_name.startsWith(excludePrefix))[0];
  const asset = dmgAsset(match);
  return {
    version: match?.tag_name ?? null,
    downloadUrl: asset?.browser_download_url ?? null,
    releasesPageUrl: `https://github.com/${repo}/releases`,
    sizeMb: asset ? Math.round((asset.size / 1024 / 1024) * 10) / 10 : null,
  };
}
