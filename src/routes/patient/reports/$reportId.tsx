import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Download, Printer, Share2 } from "lucide-react";
import { AppShell } from "@/components/app/shell";
import { Status } from "@/components/app/status";
import { Chip, FactRow, SectionHead } from "@/components/app/pieces";
import { reports } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/patient/reports/$reportId")({
  loader: ({ params }) => {
    const report = reports.find((r) => r.id === params.reportId);
    if (!report) throw notFound();
    return report;
  },
  head: ({ loaderData: r }) => ({
    meta: [
      { title: r ? `${r.title} — Universal Diagnosis` : "Report unavailable — Universal Diagnosis" },
      { name: "description", content: r ? `View ${r.title} results from ${r.institution}.` : "This diagnostic report is unavailable." },
      { property: "og:title", content: r ? `${r.title} — Universal Diagnosis` : "Report unavailable" },
      { property: "og:description", content: r ? `View ${r.title} results from ${r.institution}.` : "This diagnostic report is unavailable." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Page,
  notFoundComponent: () => (
    <main className="grid min-h-screen place-items-center p-6">
      <div className="clay-lg p-8 text-center">
        <h1 className="font-display text-3xl font-semibold">Report not found</h1>
        <p className="mt-2 text-sm text-muted-foreground">This record may have been moved or never existed.</p>
        <Button asChild className="mt-5"><Link to="/patient/reports">Return to reports</Link></Button>
      </div>
    </main>
  ),
});

function Page() {
  const r = Route.useLoaderData();
  const flagged = r.results.filter((x) => x.flag === "Above range").length;

  return (
    <AppShell role="patient">
      <Link to="/patient/reports" className="clay-flat mb-3.5 inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground">
        <ArrowLeft className="size-4" />Clinical archive
      </Link>

      <header className="clay-lg mb-3.5 grid gap-4 p-5 sm:grid-cols-[minmax(0,1fr)_auto]">
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-wide text-accent">Diagnostic report · {r.category}</p>
          <h1 className="mt-1.5 font-display text-3xl font-semibold leading-tight sm:text-4xl">{r.title}</h1>
          <div className="mt-3 flex flex-wrap gap-2">
            <Chip>{r.date}</Chip>
            <Chip>{r.institution}</Chip>
            <Chip>{r.doctor}</Chip>
            <Status value={r.status} />
          </div>
        </div>
        <div className="flex flex-wrap items-start gap-2">
          <Button variant="outline" size="icon" onClick={() => window.print()} aria-label="Print report"><Printer /></Button>
          <Button variant="outline" size="icon" onClick={() => toast.success("Secure share link copied")} aria-label="Share report"><Share2 /></Button>
          <Button onClick={() => toast.success("Report PDF prepared")}><Download />PDF</Button>
        </div>
      </header>

      <div className="grid gap-3.5 lg:grid-cols-[minmax(0,1.5fr)_minmax(280px,.65fr)]">
        <div className="grid content-start gap-3.5">
          <section>
            <SectionHead eyebrow="Measured values" title="Results" action={<Chip tone={flagged ? "accent" : "success"}>{flagged ? `${flagged} above range` : "All in range"}</Chip>} />
            <div className="grid gap-2.5">
              {r.results.map((x, i) => (
                <div key={x.label} className="clay clay-press grid grid-cols-[2rem_minmax(0,1fr)_auto] items-center gap-3 p-3.5">
                  <span className="text-xs font-bold text-muted-foreground">0{i + 1}</span>
                  <div className="min-w-0">
                    <p className="truncate font-semibold">{x.label}</p>
                    <p className="truncate text-xs text-muted-foreground">Reference {x.range}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-lg font-semibold">{x.value}</p>
                    <p className={x.flag === "Above range" ? "text-[11px] font-semibold text-accent" : "text-[11px] font-semibold text-success"}>{x.flag}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="clay-inset p-4">
            <p className="text-[10px] font-bold uppercase tracking-wide text-accent">Clinical summary</p>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              {r.summary} Results should be interpreted alongside your medical history. Contact your care team if you notice new symptoms.
            </p>
          </section>
        </div>

        <div className="grid content-start gap-3.5">
          <aside className="clay-lg bg-primary p-5 text-primary-foreground">
            <p className="text-[10px] font-bold uppercase tracking-wide text-warning-soft">Physician note</p>
            <blockquote className="mt-4 font-display text-lg leading-7">
              “{r.status === "Needs review"
                ? "LDL remains elevated against target. I recommend a dietary review and repeat profile in six to eight weeks. No urgent action is required."
                : "Values are consistent with your previous results. Continue the current care plan and we will review at your next visit."}”
            </blockquote>
            <div className="mt-5 rounded-2xl bg-primary-foreground/10 p-3">
              <p className="text-sm font-semibold">{r.doctor}</p>
              <p className="text-xs text-primary-foreground/55">Consultant, Internal Medicine</p>
            </div>
          </aside>

          <section className="clay p-4">
            <SectionHead eyebrow="Record" title="Details" />
            <FactRow label="Report ID" value={r.id.toUpperCase()} />
            <FactRow label="Collected" value={r.date} />
            <FactRow label="Category" value={r.category} />
            <FactRow label="Source" value={r.institution} />
          </section>
        </div>
      </div>
    </AppShell>
  );
}
