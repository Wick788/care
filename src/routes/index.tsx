import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Building2, Check, FileText, ShieldCheck, UserRound } from "lucide-react";
import { Brand } from "@/components/app/brand";
import { ActivityRow, Chip, SectionHead } from "@/components/app/pieces";
import { Status } from "@/components/app/status";
import { reports } from "@/data/mock";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Universal Diagnosis — Medical Reports, Clearly Organized" },
      { name: "description", content: "A calm healthcare portal for patients and diagnostic institutions to manage reports." },
      { property: "og:title", content: "Universal Diagnosis" },
      { property: "og:description", content: "Medical reports, clearly organized for patients and institutions." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const pulse = [42, 47, 44, 51, 49, 55, 53, 62, 59, 68, 64, 72];

function Index() {
  return (
    <main className="min-h-screen bg-background px-4 pb-10 sm:px-6">
      <header className="mx-auto flex h-20 max-w-[1440px] items-center justify-between gap-3">
        <Brand />
        <div className="clay-flat flex shrink-0 items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
          <i className="size-2 rounded-full bg-success" /><span className="hidden sm:inline">Systems operational</span><span className="sm:hidden">Online</span>
        </div>

      </header>

      <div className="mx-auto grid max-w-[1440px] gap-6 lg:min-h-[calc(100vh-7rem)] lg:grid-cols-[minmax(0,1.08fr)_minmax(420px,.92fr)] lg:items-start xl:gap-8">
        <div className="grid content-start gap-7">
          <section className="clay-lg p-6 sm:p-8 lg:p-10 rise-in">
            <p className="text-[10px] font-bold uppercase tracking-wide text-accent">Your evidence, in one clear sequence</p>
            <h1 className="mt-4 max-w-[15ch] font-display text-[2.4rem] font-semibold leading-[1.05] sm:text-5xl lg:text-6xl">
              Health records that move care forward.
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
              Every result, note, and next step for patients and the clinical teams behind them.
            </p>
          </section>

          <section>
            <SectionHead eyebrow="Choose workspace" title="Where are you working today?" action={<Chip>Demo access</Chip>} />
            <div className="grid gap-4 sm:grid-cols-2">
              <Link to="/patient" className="clay clay-press group grid min-h-24 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 bg-primary p-5 text-primary-foreground">
                <span className="grid size-12 place-items-center rounded-2xl bg-accent text-accent-foreground"><UserRound className="size-5" /></span>
                <span className="min-w-0">
                  <strong className="block font-display text-base">Patient record</strong>
                  <small className="block truncate text-primary-foreground/60">Results, trends, care plan</small>
                </span>
                <ArrowUpRight className="size-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
              <Link to="/institution" className="clay clay-press group grid min-h-24 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 p-5">
                <span className="clay-flat grid size-12 place-items-center rounded-2xl text-accent"><Building2 className="size-5" /></span>
                <span className="min-w-0">
                  <strong className="block font-display text-base">Clinical team</strong>
                  <small className="block truncate text-muted-foreground">Review, upload, deliver</small>
                </span>
                <ArrowUpRight className="size-5 text-accent transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </section>

          <section className="hidden sm:block">
            <SectionHead eyebrow="Latest activity" title="Recently added" />
            <div className="grid gap-3 sm:grid-cols-2">
              {reports.slice(0, 2).map((r) => (
                <ActivityRow key={r.id} title={r.title} meta={`${r.institution} · ${r.date}`} right={<Status value={r.status} />} />
              ))}
            </div>
          </section>
        </div>

        <div className="grid content-start gap-6">
          <section className="clay-lg bg-primary p-6 text-primary-foreground sm:p-8">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wide text-primary-foreground/55">Featured record · Mar 18</p>
                <h2 className="mt-1.5 font-display text-2xl font-semibold">Lipid panel</h2>
              </div>
              <span className="rounded-full bg-warning-soft px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-warning">Needs review</span>
            </div>
            <div className="mt-7 flex items-end justify-between">
              <div>
                <span className="font-display text-5xl font-semibold leading-none">142</span>
                <span className="ml-2 text-sm text-primary-foreground/60">mg/dL LDL</span>
              </div>
              <span className="text-xs text-warning-soft">12 above target</span>
            </div>
            <svg viewBox="0 0 440 100" className="mt-5 h-24 w-full" aria-label="LDL trend over twelve months">
              <polyline className="trace-in" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" points={pulse.map((v, i) => `${i * 40},${100 - v}`).join(" ")} />
              <line x1="0" y1="62" x2="440" y2="62" stroke="currentColor" opacity=".2" strokeDasharray="4 4" />
            </svg>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-primary-foreground/10 p-4">
                <p className="text-[10px] font-bold uppercase tracking-wide text-primary-foreground/50">Reviewed by</p>
                <p className="mt-1 text-sm font-semibold">Dr. Elena Voss</p>
              </div>
              <div className="rounded-2xl bg-primary-foreground/10 p-4">
                <p className="text-[10px] font-bold uppercase tracking-wide text-primary-foreground/50">Next step</p>
                <p className="mt-1 text-sm font-semibold">Repeat in 6–8 weeks</p>
              </div>
            </div>
          </section>

          <section className="clay p-5 sm:p-6">
            <SectionHead eyebrow="Assurance" title="Why this record is trusted" />
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { i: FileText, t: "Verified source", s: "St. Alder's Lab" },
                { i: ShieldCheck, t: "Encrypted", s: "256-bit at rest" },
              ].map(({ i: Icon, t, s }) => (
                <div key={t} className="clay-flat p-3">
                  <Icon className="size-4 text-accent" />
                  <b className="mt-2 block text-sm">{t}</b>
                  <span className="text-[11px] text-muted-foreground">{s}</span>
                </div>
              ))}
            </div>
          </section>

          <p className="flex items-center justify-center gap-2 text-[11px] text-muted-foreground">
            <Check className="size-3.5 text-success" />No account needed — both workspaces open with any demo credentials.
          </p>
        </div>
      </div>
    </main>
  );
}
