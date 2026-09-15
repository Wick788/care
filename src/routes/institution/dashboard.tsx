import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, FilePlus2 } from "lucide-react";
import { AppShell, PageHead } from "@/components/app/shell";
import { InstitutionQueue } from "@/components/app/institution-queue";
import { ActivityRow, Chip, FactRow, SectionHead, Tile } from "@/components/app/pieces";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/institution/dashboard")({
  head: () => ({
    meta: [
      { title: "Institution Operations — Universal Diagnosis" },
      { name: "description", content: "Monitor diagnostic report processing and delivery." },
      { property: "og:title", content: "Institution Operations — Universal Diagnosis" },
      { property: "og:description", content: "Monitor diagnostic report processing and delivery." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Page,
});

const metrics = [
  { label: "Reports today", value: "84", note: "+12% vs. yesterday" },
  { label: "Awaiting review", value: "04", note: "2 priority", tone: "accent" as const },
  { label: "Median turnaround", value: "46m", note: "On target" },
  { label: "On-time delivery", value: "96.4%", note: "Last 30 days", tone: "success" as const },
];

function Page() {
  return (
    <AppShell role="institution">
      <PageHead
        eyebrow="Operations · Tuesday, 15 September"
        title="Report control"
        description="The queue is moving normally. Two results require priority review before the 17:00 delivery window."
        action={<Button asChild><Link to="/institution/upload"><FilePlus2 /><span className="hidden sm:inline">Upload report</span></Link></Button>}
      />

      <div className="mb-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {metrics.map((m) => <Tile key={m.label} {...m} />)}
      </div>

      <div className="grid gap-7 xl:grid-cols-[minmax(0,1fr)_340px]">
        <section>
          <SectionHead
            eyebrow="Live intake"
            title="Latest reports"
            action={<Link to="/institution/reports" className="flex items-center gap-1 text-sm font-semibold text-accent">Open register <ArrowUpRight className="size-4" /></Link>}
          />
          <InstitutionQueue />
        </section>

        <div className="grid content-start gap-5 sm:grid-cols-2 xl:grid-cols-1">
          <section className="clay bg-warning-soft p-4">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-bold uppercase tracking-wide text-warning">Attention</p>
              <Chip tone="warning">Priority</Chip>
            </div>
            <p className="mt-3 font-display text-3xl font-semibold leading-none">02</p>
            <h3 className="mt-1.5 font-semibold">Outside reference range</h3>
            <p className="mt-1 text-sm text-muted-foreground">Clinical review recommended before delivery.</p>
          </section>

          <section className="clay p-4">
            <SectionHead eyebrow="Today" title="Shift summary" />
            <FactRow label="Collected" value="112 samples" />
            <FactRow label="Processed" value="84 reports" />
            <FactRow label="Delivered" value="71 patients" />
            <FactRow label="Rejected" value="03 samples" />
          </section>

          <section className="sm:col-span-2 xl:col-span-1"><SectionHead eyebrow="Team" title="On duty now" /><ActivityRow title="Dr. Elena Voss" meta="Chemistry · reviewing" right={<Chip tone="success">Active</Chip>} /></section>
        </div>
      </div>
    </AppShell>
  );
}
