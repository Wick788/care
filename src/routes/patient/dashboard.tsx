import { createFileRoute, Link } from "@tanstack/react-router";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ArrowDownRight, ArrowUpRight, CalendarClock, Download, FileText, HeartPulse, Pill, Share2 } from "lucide-react";
import { AppShell, PageHead } from "@/components/app/shell";
import { ReportList } from "@/components/app/report-list";
import { ActivityRow, Chip, FactRow, SectionHead, Tile } from "@/components/app/pieces";
import { reports } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const trend = [{ m: "Oct", v: 132 }, { m: "Nov", v: 128 }, { m: "Dec", v: 130 }, { m: "Jan", v: 124 }, { m: "Feb", v: 121 }, { m: "Mar", v: 116 }];

export const Route = createFileRoute("/patient/dashboard")({
  head: () => ({
    meta: [
      { title: "Health Overview — Universal Diagnosis" },
      { name: "description", content: "Your recent results, health trends, and next care steps." },
      { property: "og:title", content: "Health Overview — Universal Diagnosis" },
      { property: "og:description", content: "Your recent results, health trends, and next care steps." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <AppShell role="patient">
      <PageHead
        eyebrow="Health overview · 18 March 2026"
        title="Good afternoon, Marisol"
        description="One result needs your attention. Everything else is stable or moving in the right direction."
        action={<Button variant="outline" onClick={() => toast.success("Health summary prepared for download")}><Download /><span className="hidden sm:inline">Summary</span></Button>}
      />

      <div className="grid gap-3.5 xl:grid-cols-[minmax(0,1.35fr)_minmax(0,.65fr)]">
        <div className="grid content-start gap-3.5">
          <section className="clay-lg p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wide text-accent">Priority result</p>
                <h2 className="mt-1.5 font-display text-2xl font-semibold">Lipid panel</h2>
              </div>
              <Chip tone="warning"><i className="size-1.5 rounded-full bg-current" />Needs review</Chip>
            </div>
            <div className="mt-4 grid gap-3.5 sm:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)]">
              <div className="clay-inset p-4">
                <p className="text-xs text-muted-foreground">LDL cholesterol</p>
                <p className="mt-1 font-display text-5xl font-semibold leading-none">142</p>
                <p className="mt-1.5 text-sm text-muted-foreground">mg/dL · target below 130</p>
                <p className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-accent"><ArrowUpRight className="size-4" />12 above range</p>
              </div>
              <div className="grid content-between gap-3">
                <p className="text-sm leading-6 text-muted-foreground">
                  Dr. Voss recommends a dietary review and a repeat profile in six to eight weeks. No urgent action is required.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button asChild><Link to="/patient/reports/$reportId" params={{ reportId: "lipid-panel" }}>Read full note <ArrowUpRight /></Link></Button>
                  <Button variant="outline" onClick={() => toast.success("Reminder set for 6 weeks")}>Remind me</Button>
                </div>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
            <Tile label="Blood pressure" value="124/78" note="Normal" tone="success" />
            <Tile label="Resting pulse" value="68" note="bpm · steady" />
            <Tile label="HbA1c" value="6.1%" note="In range" tone="success" />
            <Tile label="Weight" value="71 kg" note="−1.2 kg / 3 mo" />
          </div>

          <section>
            <SectionHead
              eyebrow="Clinical timeline"
              title="Latest records"
              action={<Link to="/patient/reports" className="flex items-center gap-1 text-sm font-semibold text-accent">Full archive <ArrowUpRight className="size-4" /></Link>}
            />
            <ReportList items={reports.slice(0, 4)} compact />
          </section>
        </div>

        <div className="grid content-start gap-3.5">
          <section className="clay-lg bg-primary p-5 text-primary-foreground">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs text-primary-foreground/60">Average glucose</p>
                <p className="mt-1 font-display text-3xl font-semibold">116 <span className="text-sm font-normal">mg/dL</span></p>
              </div>
              <span className="flex items-center rounded-full bg-primary-foreground/10 px-2.5 py-1 text-xs text-warning-soft"><ArrowDownRight className="size-4" />8%</span>
            </div>
            <div className="mt-4 h-28">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trend}>
                  <XAxis dataKey="m" axisLine={false} tickLine={false} tick={{ fill: "currentColor", fontSize: 10 }} />
                  <YAxis hide domain={[100, 140]} />
                  <Tooltip contentStyle={{ borderRadius: 14, border: "none", color: "var(--foreground)" }} />
                  <Area className="trace-in" dataKey="v" type="monotone" stroke="currentColor" fill="transparent" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-1 text-xs text-primary-foreground/55">Six-month direction · improving steadily</p>
          </section>

          <section className="clay grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 p-4">
            <span className="clay-flat grid size-12 place-items-center rounded-2xl text-warning"><CalendarClock className="size-5" /></span>
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">Next appointment</p>
              <p className="font-display text-lg font-semibold leading-tight">06 April · 09:30</p>
              <p className="truncate text-xs text-muted-foreground">Radiology L2 · Northgate Health</p>
            </div>
          </section>

          <section className="clay p-4">
            <SectionHead eyebrow="Care plan" title="Active guidance" />
            <FactRow label="Medication" value="Atorvastatin 10 mg" />
            <FactRow label="Diet review" value="Booked 24 Mar" />
            <FactRow label="Repeat panel" value="Early May" />
          </section>

          <section>
            <SectionHead eyebrow="Quick actions" title="Do it now" />
            <div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-1">
              <ActivityRow title="Share with a doctor" meta="Send a secure link" right={<Button size="icon" variant="ghost" aria-label="Share record" onClick={() => toast.success("Secure share link copied")}><Share2 /></Button>} />
              <ActivityRow title="Export full history" meta="CSV of every result" right={<Button size="icon" variant="ghost" aria-label="Export history" onClick={() => toast.success("Export started")}><FileText /></Button>} />
              <ActivityRow title="Log a symptom" meta="Adds to your timeline" right={<Button size="icon" variant="ghost" aria-label="Log symptom" onClick={() => toast.info("Symptom logging is part of the demo")}><HeartPulse /></Button>} />
              <ActivityRow title="Refill request" meta="Atorvastatin 10 mg" right={<Button size="icon" variant="ghost" aria-label="Request refill" onClick={() => toast.success("Refill requested")}><Pill /></Button>} />
            </div>
          </section>
        </div>
      </div>
    </AppShell>
  );
}
