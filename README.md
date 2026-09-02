<div align="center">

# The Market

**Everything I build, in one place.**

Download links for every app, always pointed at the latest release.
No accounts, no tracking — just the `.dmg`.

[![Live Site](https://img.shields.io/badge/live-the--market--three.vercel.app-black?style=flat-square)](https://the-market-three.vercel.app)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vercel](https://img.shields.io/badge/deployed%20on-Vercel-black?style=flat-square&logo=vercel)

</div>

---

## What is this?

**The Market** is the single landing page for every native macOS app I build — a tiny, self-hosted "app store" that skips the App Store entirely. No sign-in, no analytics, no update-check pings home. Just a clean page, a version number, and a direct link to a signed `.dmg`.

It exists because I kept sending people three different GitHub release links for three different apps. Now there's one.

## Currently listed

| App | What it does | Platform |
|---|---|---|
| **PhoebeOS** | A personal operating layer that learns how you work and quietly keeps everything in sync across your devices. | Apple Silicon & Intel |
| **Celestia** | Turns your notes into a real macOS location — browse, search, and drop files into your vault like any other Finder folder. | macOS 26.2+ |
| **The N.O.C.** | A native command center for your vault — agents, notes, and search, built for speed and built to stay out of your way. | Universal |

Each card pulls its version and file size at build time, so the page never drifts out of sync with what's actually being shipped.

## Stack

- **Next.js** (App Router) + **TypeScript**
- **Tailwind / PostCSS** for styling
- Static app metadata, no database — release info lives in the repo and ships with the build
- Deployed on **Vercel**, redeployed automatically on push to `main`

## Project structure

```
the-market/
├── src/               # App shell, pages, and components
├── public/icons/      # App icons used on the cards
├── AGENTS.md          # Notes for coding agents working in this repo
├── CLAUDE.md          # Claude-specific project context
├── next.config.ts
└── tsconfig.json
```

## Running locally

```bash
git clone https://github.com/zaicv/the-market.git
cd the-market
npm install
npm run dev
```

Then open [localhost:3000](http://localhost:3000).

## Adding a new app

Each card is driven by a small entry describing the app's name, tagline, description, icon, current version, file size, and download URL. Drop a new entry in and the page picks it up — no layout changes required.

## Philosophy

No accounts. No tracking. No telemetry riding along with the download link. If you want an app, you click the button and you get the `.dmg`. That's the whole product.

---

<div align="center">

Built independently by [zaicv](https://github.com/zaicv)

</div>
