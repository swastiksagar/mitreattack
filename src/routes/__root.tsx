import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useNavigate,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-[980px] flex-col justify-center px-7">
      <p className="font-mono text-xs tracking-wide text-ink-dim">ERR_404</p>
      <h1 className="mt-4 font-serif text-5xl font-semibold">Page not found</h1>
      <p className="mt-3 max-w-[60ch] font-serif text-lg text-ink-dim">
        That tactic or technique isn't in this reference. Head back to the matrix.
      </p>
      <div className="mt-7">
        <Link
          to="/"
          className="inline-flex rounded-sm border border-foreground bg-foreground px-4 py-2.5 font-mono text-xs text-background transition-colors hover:border-accent hover:bg-accent"
        >
          Back to the matrix
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-[980px] flex-col justify-center px-7">
      <p className="font-mono text-xs tracking-wide text-ink-dim">ERR_500</p>
      <h1 className="mt-4 font-serif text-4xl font-semibold">This page didn't load</h1>
      <p className="mt-3 max-w-[60ch] font-serif text-lg text-ink-dim">
        Something failed on our end. Try again, or go back to the matrix.
      </p>
      <div className="mt-7 flex flex-wrap gap-3">
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="inline-flex rounded-sm border border-foreground bg-foreground px-4 py-2.5 font-mono text-xs text-background transition-colors hover:border-accent hover:bg-accent"
        >
          Try again
        </button>
        <a
          href="/"
          className="inline-flex rounded-sm border border-line-hard px-4 py-2.5 font-mono text-xs text-ink-dim transition-colors hover:border-foreground hover:text-foreground"
        >
          Go home
        </a>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "google-site-verification", content: "XCU8PsfE6vqyPRfX_QmKhNhc9B-wt-h0RifjSORjMRE" },
      { title: "MITRE ATT&CK Matrix — Plain-Language Field Reference" },
      {
        name: "description",
        content:
          "All 14 MITRE ATT&CK enterprise tactics in kill-chain order, each with key techniques and the exact telemetry that detects them. Written for working SOC analysts.",
      },
      { property: "og:site_name", content: "ATT&CK Field Reference" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "MITRE ATT&CK Matrix — Plain-Language Field Reference" },
      { name: "twitter:title", content: "MITRE ATT&CK Matrix — Plain-Language Field Reference" },
      { property: "og:description", content: "All 14 MITRE ATT&CK enterprise tactics in kill-chain order, each with key techniques and the exact telemetry that detects them. Written for working SOC analysts." },
      { name: "twitter:description", content: "All 14 MITRE ATT&CK enterprise tactics in kill-chain order, each with key techniques and the exact telemetry that detects them. Written for working SOC analysts." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/6405aaa0-5f86-4808-834c-3181aec3ba98" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/6405aaa0-5f86-4808-834c-3181aec3ba98" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,400;8..60,500;8..60,600;8..60,700&family=JetBrains+Mono:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap",
      },
      { rel: "icon", href: "/favicon.svg?v=3", type: "image/svg+xml", sizes: "any" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": "https://mitreattack.lovable.app/#organization",
              name: "ATT&CK Field Reference",
              url: "https://mitreattack.lovable.app",
              description:
                "A plain-language field reference to the MITRE ATT&CK enterprise matrix for SOC analysts.",
            },
            {
              "@type": "WebSite",
              "@id": "https://mitreattack.lovable.app/#website",
              name: "ATT&CK Field Reference",
              url: "https://mitreattack.lovable.app",
              publisher: { "@id": "https://mitreattack.lovable.app/#organization" },
              description:
                "A plain-language field reference to the MITRE ATT&CK enterprise matrix for SOC analysts.",
            },
          ],
        }),
      },

    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/92 backdrop-blur-sm">
      <div className="mx-auto flex h-[60px] max-w-[980px] items-center justify-between gap-4 px-7">
        <Link to="/" className="flex shrink-0 items-center gap-2.5 font-mono text-[13px] font-semibold tracking-wide">
          <span className="flex h-5 w-5 items-center justify-center border-[1.5px] border-foreground text-[11px] font-bold">
            A
          </span>
          ATT&amp;CK Field Reference
        </Link>
        <nav aria-label="Primary" className="hidden gap-5 font-mono text-xs text-ink-dim lg:flex">
          <Link to="/matrix" activeProps={{ className: "text-foreground" }} className="transition-colors hover:text-foreground">
            Matrix
          </Link>
          <Link to="/search" activeProps={{ className: "text-foreground" }} className="transition-colors hover:text-foreground">
            Search
          </Link>
          <Link to="/playbooks" activeProps={{ className: "text-foreground" }} className="transition-colors hover:text-foreground">
            Playbooks
          </Link>
          <a href="/#how" className="transition-colors hover:text-foreground">
            How to read it
          </a>
        </nav>
        <HeaderSearch />
      </div>
    </header>
  );
}

function HeaderSearch() {
  const navigate = useNavigate({ from: "/" });
  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const input = form.elements.namedItem("q") as HTMLInputElement;
        navigate({ to: "/search", search: { q: input.value, tactic: "", sort: "relevance" } });
      }}
      className="hidden sm:block"
    >
      <label htmlFor="header-search" className="sr-only">
        Search techniques
      </label>
      <input
        id="header-search"
        name="q"
        type="search"
        placeholder="T1059, LSASS…"
        className="w-40 rounded-sm border border-border bg-background px-2.5 py-1.5 font-mono text-xs text-foreground placeholder:text-ink-faint focus:border-accent focus:outline-none lg:w-48"
      />
    </form>
  );
}

function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border py-10">
      <div className="mx-auto max-w-[980px] px-7 font-mono text-xs leading-relaxed text-ink-dim">
        <p>
          Independent study reference. ATT&amp;CK® is a registered trademark of The MITRE
          Corporation, which does not endorse this page. Canonical source:{" "}
          <a
            href="https://attack.mitre.org"
            className="link-inline"
            target="_blank"
            rel="noreferrer"
          >
            attack.mitre.org
          </a>
          .
        </p>
        <p className="mt-3">Enterprise matrix · 14 tactics · free to use · no signup</p>
      </div>
    </footer>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <SiteHeader />
      <main>
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
      </main>
      <SiteFooter />
    </QueryClientProvider>
  );
}
