# MITRE ATT&CK Field Reference

*A plain-language field reference to the MITRE ATT&CK enterprise matrix, built for working SOC analysts.*

*Every tactic is written as an operational objective, every technique as something you can actually go look for, and every detection note names the log source instead of waving at "telemetry".*

*Live site: [mitreattack.lovable.app](https://mitreattack.lovable.app)*

## What is in here

- ***14 tactics** in kill-chain order, Reconnaissance through Impact.*
- ***211 techniques** with summaries, platforms and detection guidance.*
- ***468 sub-techniques** with their own detail pages and parent breadcrumbs.*
- ***5 triage playbooks** for the alerts that actually wake you up: PowerShell, LSASS dumping, persistence, lateral movement and defence evasion.*

## Pages

- ***`/`** — the matrix overview, kill-chain order, and a short "mapping an alert" triage guide.*
- ***`/matrix`** — a Navigator-style grid, tactic columns coloured by kill-chain phase.*
- ***`/tactics/{slug}`** — one page per tactic: objective, why it matters on shift, and its techniques.*
- ***`/techniques/{id}`** — one page per technique or sub-technique: detection notes, platforms, kill-chain context, and a link to the MITRE ATT&CK entry.*
- ***`/search`** — search across all techniques and sub-techniques by name, ID, or detection text, with tactic filters.*
- ***`/playbooks`** — alert triage workflows: trigger, data source, triage questions, escalation criteria.*
- ***`/sitemap.xml`** and **`/robots.txt`** — 697 URLs, absolute, no fragments.*

## Data

*The full enterprise catalog is generated from MITRE's official STIX bundle (Enterprise v17), so descriptions, detection guidance, platforms and source links stay faithful to ATT&CK itself. The tactic-level prose — objectives, "why it matters", and the triage playbooks — is hand-written for analysts.*

## Design

*Paper and ink: a warm off-white page, near-black ink, one cobalt accent. Source Serif 4 for reading, JetBrains Mono for IDs and log names, Inter for UI. A 980px measure, sharp corners, no gradients. Accessibility checked with axe-core — zero violations on the main templates.*

## SEO

*Per-route titles, descriptions, canonicals and Open Graph tags; JSON-LD for Organization, WebSite, CollectionPage and HowTo; a short home title under 60 characters; Google Search Console verified with the sitemap submitted.*

## Tech stack

*TanStack Start v1 on React 19, Vite 7, Tailwind CSS v4 with OKLCH design tokens, all content rendered from static data in `src/data/`.*

## Development

*Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).*

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Build with Lovable

*Continue developing this project in the [Lovable editor](https://lovable.dev/projects/08792fe9-b75d-4998-99a5-76fb55d2c294).*

- ***Ship faster**: describe what you want to build and Lovable handles the code.*
- ***Stay in sync**: every change made in Lovable is committed straight to this repository.*
- ***Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.*
