import { createFileRoute, Link } from "@tanstack/react-router";
import { TACTICS, TECHNIQUE_COUNT, SUBTECHNIQUE_COUNT } from "@/data/attack";

export const Route = createFileRoute("/matrix")({
  head: () => {
    const title = "ATT&CK Navigator Matrix — MITRE ATT&CK Field Reference";
    const description =
      `A lightweight kill-chain grid of all 14 MITRE ATT&CK enterprise tactics, ${TECHNIQUE_COUNT} techniques and ${SUBTECHNIQUE_COUNT} sub-techniques.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: "/matrix" },
        { property: "og:type", content: "website" },
      ],
      links: [{ rel: "canonical", href: "/matrix" }],
    };
  },
  component: MatrixPage,
});

const GROUPS = [
  { label: "Pre-access", slugs: ["reconnaissance", "resource-development"], color: "bg-ink-faint/20" },
  { label: "Access", slugs: ["initial-access", "execution"], color: "bg-amber/15" },
  { label: "Persistence & privilege", slugs: ["persistence", "privilege-escalation"], color: "bg-accent/10" },
  { label: "Evasion & credentials", slugs: ["defense-evasion", "credential-access"], color: "bg-red/10" },
  { label: "Discovery & movement", slugs: ["discovery", "lateral-movement"], color: "bg-green/10" },
  { label: "Collection & C2", slugs: ["collection", "command-and-control"], color: "bg-ink-faint/20" },
  { label: "Exfiltration & impact", slugs: ["exfiltration", "impact"], color: "bg-red/15" },
];

function groupColor(slug: string) {
  return GROUPS.find((g) => g.slugs.includes(slug))?.color ?? "bg-paper-alt";
}

function MatrixPage() {
  return (
    <div className="mx-auto max-w-[980px] px-7 pt-12 pb-4">
      <nav aria-label="Breadcrumb" className="mb-6 font-mono text-xs text-ink-dim">
        <Link to="/" className="link-inline">
          Matrix
        </Link>
        <span className="px-2">/</span>
        <span>Navigator</span>
      </nav>

      <h1 className="font-serif text-[clamp(32px,5vw,52px)] font-semibold leading-[1.05] tracking-tight">
        ATT&amp;CK navigator
      </h1>
      <p className="mt-3 max-w-[62ch] text-[15.5px] text-ink-dim">
        A lightweight kill-chain grid. Each column is a tactic, each cell is a technique. Click any
        cell to open its detail page.
      </p>

      <div className="rule-top mt-8 flex flex-wrap gap-3 pt-6 font-mono text-[11px]">
        {GROUPS.map((g) => (
          <div key={g.label} className="flex items-center gap-2">
            <span className={`h-3 w-3 rounded-sm ${g.color}`} />
            <span className="text-ink-dim">{g.label}</span>
          </div>
        ))}
      </div>

      <div className="rule-top mt-6 overflow-x-auto pb-2">
        <div className="grid min-w-[1100px] grid-cols-14 gap-2">
          {TACTICS.map((tactic) => (
            <div key={tactic.slug} className="flex flex-col">
              <Link
                to="/tactics/$slug"
                params={{ slug: tactic.slug }}
                className="mb-2 border-b border-border pb-2 font-mono text-[11px] leading-tight text-ink-dim transition-colors hover:text-foreground"
              >
                <span className="block text-[10px]">{tactic.id}</span>
                {tactic.name}
              </Link>
              <ol className="flex flex-col gap-2">
                {tactic.techniques.map((tech) => (
                  <li key={tech.id}>
                    <Link
                      to="/techniques/$id"
                      params={{ id: tech.id }}
                      className={`group flex flex-col gap-1 rounded-sm border border-border ${groupColor(
                        tactic.slug,
                      )} p-2 transition-colors hover:border-foreground hover:bg-background`}
                    >
                      <span className="font-mono text-[10px] text-ink-dim">{tech.id}</span>
                      <span className="font-serif text-[13px] font-semibold leading-snug group-hover:text-accent">
                        {tech.name}
                      </span>
                      {tech.subTechniques && tech.subTechniques.length > 0 && (
                        <span className="font-mono text-[10px] text-ink-dim">
                          {tech.subTechniques.length} sub
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-6 max-w-[68ch] text-[15px] text-ink-dim">
        The matrix reads left to right, but real intrusions loop. Use this view as a coverage map:
        mark the techniques your detections catch and hunt the gaps.
      </p>
    </div>
  );
}
