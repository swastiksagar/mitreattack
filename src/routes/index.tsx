import { createFileRoute, Link } from "@tanstack/react-router";
import { TACTICS, TACTIC_COUNT, TECHNIQUE_COUNT, SUBTECHNIQUE_COUNT } from "@/data/attack";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MITRE ATT&CK Enterprise Matrix — Plain-Language Field Reference" },
      {
        name: "description",
        content:
          "All 14 MITRE ATT&CK enterprise tactics in kill-chain order, each with key techniques and the exact telemetry that detects them. Written for working SOC analysts.",
      },
      {
        property: "og:title",
        content: "MITRE ATT&CK Enterprise Matrix — Plain-Language Field Reference",
      },
      {
        property: "og:description",
        content:
          `14 tactics, ${TECHNIQUE_COUNT} techniques, ${SUBTECHNIQUE_COUNT} sub-techniques, and the log sources that catch them. A free field reference for SOC analysts.`,
      },
      { property: "og:url", content: "/" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const STATS = [
  { label: "Tactics", value: String(TACTIC_COUNT) },
  { label: "Techniques", value: String(TECHNIQUE_COUNT) },
  { label: "Sub-techniques", value: String(SUBTECHNIQUE_COUNT) },
  { label: "Matrix", value: "Enterprise" },
  { label: "Kill-chain order", value: "Recon → Impact" },
];

function Index() {
  return (
    <>
      <section className="mx-auto max-w-[980px] px-7 pt-[70px] pb-11">
        <p className="mb-5 font-mono text-xs tracking-wide text-ink-dim">
          FIG_001 · enterprise matrix · v17 · reference · free
        </p>
        <h1 className="font-serif text-[clamp(38px,6vw,64px)] font-semibold leading-[1.02] tracking-tight">
          MITRE ATT&amp;CK <span className="font-normal text-ink-dim">in kill-chain order</span>
        </h1>
        <p className="my-5 max-w-[62ch] font-serif text-lg text-ink-dim">
          Fourteen tactics, {TECHNIQUE_COUNT} techniques, {SUBTECHNIQUE_COUNT} sub-techniques, and for every single one, the log source
          that actually catches it. Not a taxonomy exercise — a reference you keep open in the
          second monitor while a queue fills up.
        </p>
        <p className="mb-7 font-mono text-[12.5px] text-ink-dim">
          Every tactic opens into what the adversary is trying to do, why it matters on shift, and
          a technique-by-technique detection note.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="#matrix"
            className="rounded-sm border border-foreground bg-foreground px-[18px] py-[11px] font-mono text-[12.5px] text-background transition-colors hover:border-accent hover:bg-accent"
          >
            Open the matrix →
          </a>
          <a
            href="#how"
            className="rounded-sm border border-line-hard px-[18px] py-[11px] font-mono text-[12.5px] text-ink-dim transition-colors hover:border-foreground hover:text-foreground"
          >
            How to read it
          </a>
        </div>
      </section>

      <div className="border-y border-border bg-paper-alt py-8">
        <dl className="mx-auto grid max-w-[980px] grid-cols-2 gap-6 px-7 sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label}>
              <dt className="font-mono text-[11px] uppercase tracking-wide text-ink-dim">
                {s.label}
              </dt>
              <dd className="mt-1 font-serif text-xl font-semibold">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <section id="how" className="mx-auto max-w-[980px] scroll-mt-20 px-7 py-14">
        <h2 className="mb-4 font-serif text-2xl font-semibold">How to read the matrix</h2>
        <p className="mb-3.5 max-w-[68ch] text-[15.5px] text-ink-dim">
          A <strong className="font-semibold text-foreground">tactic</strong> is the adversary's
          goal — the <em>why</em>. A <strong className="font-semibold text-foreground">technique</strong>{" "}
          is how they achieve it, and carries an ID like{" "}
          <code className="font-mono text-[13px] text-foreground">T1059</code>. The matrix reads
          left to right as a rough kill chain, but real intrusions loop: an adversary discovers,
          moves laterally, discovers again, escalates, and returns to credential access half a dozen
          times before impact.
        </p>
        <p className="mb-3.5 max-w-[68ch] text-[15.5px] text-ink-dim">
          Use it three ways. As a{" "}
          <strong className="font-semibold text-foreground">triage vocabulary</strong>, so your
          alert notes say "T1003 OS credential dumping" instead of "weird lsass thing". As a{" "}
          <strong className="font-semibold text-foreground">coverage map</strong>, colouring in the
          techniques your detections actually cover and staring at the gaps. And as a{" "}
          <strong className="font-semibold text-foreground">hunting backlog</strong> — pick one
          uncovered technique per week and go looking.
        </p>
        <p className="max-w-[68ch] text-[15.5px] text-ink-dim">
          What the matrix will not tell you is priority. Fourteen tactics are not equally likely.
          Initial access, execution, credential access, and lateral movement account for most of
          what a Tier 1 analyst sees in a year.
        </p>
      </section>

      <section id="matrix" className="mx-auto max-w-[980px] scroll-mt-20 px-7 pb-4">
        <p className="mb-2 font-mono text-xs tracking-wide text-ink-dim">
          Enterprise · {TACTIC_COUNT} tactics · {TECHNIQUE_COUNT} techniques · {SUBTECHNIQUE_COUNT} sub-techniques
        </p>
        <h2 className="mb-4 font-serif text-2xl font-semibold">The matrix</h2>
        <p className="mb-7 max-w-[68ch] text-[15.5px] text-ink-dim">
          Each column is a tactic, listed in the order an intrusion typically progresses. Open one
          to read its full write-up and the detection notes for every technique inside it.
        </p>

        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {TACTICS.map((t) => (
            <li key={t.slug}>
              <Link
                to="/tactics/$slug"
                params={{ slug: t.slug }}
                className="group flex h-full flex-col rounded-sm border border-border bg-paper-alt p-4 transition-colors hover:border-foreground"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-mono text-[11px] text-ink-dim">
                    {String(t.order).padStart(2, "0")} · {t.id}
                  </span>
                  <span className="font-mono text-[11px] text-ink-dim">
                    {t.techniques.length} tech
                  </span>
                </div>
                <h3 className="mt-2 font-serif text-lg font-semibold group-hover:text-accent">
                  {t.name}
                </h3>
                <p className="mt-1.5 text-[14px] leading-relaxed text-ink-dim">{t.objective}</p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {t.techniques.slice(0, 3).map((tech) => (
                    <li
                      key={tech.id}
                      className="rounded-sm border border-border bg-background px-1.5 py-0.5 font-mono text-[10.5px] text-ink-dim"
                    >
                      {tech.id}
                    </li>
                  ))}
                  {t.techniques.length > 3 && (
                    <li className="px-1 py-0.5 font-mono text-[10.5px] text-ink-dim">
                      +{t.techniques.length - 3}
                    </li>
                  )}
                </ul>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section id="triage" className="mx-auto max-w-[980px] scroll-mt-20 px-7 py-14">
        <h2 className="mb-4 font-serif text-2xl font-semibold">Mapping an alert on shift</h2>
        <p className="mb-6 max-w-[68ch] text-[15.5px] text-ink-dim">
          Four questions turn a raw alert into an ATT&amp;CK-mapped ticket that the next analyst can
          actually pick up.
        </p>
        <ol className="divide-y divide-border rule-top">
          {[
            {
              q: "What was the adversary trying to achieve?",
              a: "That answer is the tactic. If lsass.exe was accessed, the goal was credentials — TA0006, regardless of which tool did it.",
            },
            {
              q: "What specific method did they use?",
              a: "That is the technique. Credential access via comsvcs.dll minidump is T1003.001, LSASS Memory. Record the sub-technique when you can prove it.",
            },
            {
              q: "What came before it?",
              a: "Pivot backwards a tactic. Credential access implies execution implies initial access. Go find those events — they are almost always in your telemetry already.",
            },
            {
              q: "What comes next if I am wrong about scope?",
              a: "Pivot forwards. After credential access comes lateral movement. Search for Type 3 logons from that host in the following hour before you close the ticket.",
            },
          ].map((row, i) => (
            <li key={row.q} className="flex gap-5 py-5">
              <span className="font-mono text-xs text-ink-dim">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="font-serif text-lg font-semibold">{row.q}</h3>
                <p className="mt-1.5 max-w-[64ch] text-[15px] text-ink-dim">{row.a}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
