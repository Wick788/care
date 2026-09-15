import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Filter, Search, X } from "lucide-react";
import { AppShell, PageHead } from "@/components/app/shell";
import { EmptyReports, ReportList } from "@/components/app/report-list";
import { Tile } from "@/components/app/pieces";
import { reports } from "@/data/mock";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export const Route = createFileRoute("/patient/reports/")({
  head: () => ({
    meta: [
      { title: "My Reports — Universal Diagnosis" },
      { name: "description", content: "Search and filter your diagnostic report history." },
      { property: "og:title", content: "My Reports — Universal Diagnosis" },
      { property: "og:description", content: "Search and filter your diagnostic report history." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Page,
});

function Filters({ status, setStatus }: { status: string; setStatus: (s: string) => void }) {
  return (
    <div className="clay-inset grid gap-1 rounded-3xl p-1.5 sm:flex sm:rounded-full sm:p-1">
      {["All", "Reviewed", "Needs review", "Scheduled"].map((s) => (
        <button
          key={s}
          type="button"
          aria-pressed={status === s}
          onClick={() => setStatus(s)}
          className={`h-9 whitespace-nowrap rounded-full px-3.5 text-xs font-semibold transition-shadow ${status === s ? "bg-accent text-accent-foreground shadow-[var(--clay-flat)]" : "text-muted-foreground hover:text-foreground"}`}
        >
          {s}
        </button>
      ))}
    </div>
  );
}

function Page() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const filtered = useMemo(
    () => reports.filter((r) => (status === "All" || r.status === status) && `${r.title} ${r.institution} ${r.doctor}`.toLowerCase().includes(query.toLowerCase())),
    [query, status],
  );

  return (
    <AppShell role="patient">
      <PageHead eyebrow="Clinical archive · 2026" title="My reports" description="Five reports across three care providers, arranged as one continuous health record." />

      <div className="mb-3.5 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        <Tile label="This year" value="05" note="Reports filed" />
        <Tile label="Needs review" value="01" note="Lipid panel" tone="accent" />
        <Tile label="Providers" value="03" note="Verified" />
        <Tile label="Showing" value={String(filtered.length).padStart(2, "0")} note="Matching filters" />
      </div>

      <div className="mb-3.5 grid grid-cols-[minmax(0,1fr)_auto] gap-2.5">
        <div className="relative">
          <Search className="absolute left-4 top-3.5 size-4 text-muted-foreground" />
          <Input className="pl-10" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search reports, doctors, or institutions" aria-label="Search reports" />
        </div>
        <div className="hidden sm:block"><Filters status={status} setStatus={setStatus} /></div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="sm:hidden" aria-label="Filter reports"><Filter /></Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="rounded-t-3xl">
            <SheetHeader><SheetTitle>Filter reports</SheetTitle></SheetHeader>
            <div className="mt-5 pb-6"><Filters status={status} setStatus={setStatus} /></div>
          </SheetContent>
        </Sheet>
      </div>

      {(query || status !== "All") && (
        <div className="mb-2.5 flex items-center justify-between text-xs text-muted-foreground">
          <span>{filtered.length} matching {filtered.length === 1 ? "report" : "reports"}</span>
          <Button variant="ghost" size="sm" onClick={() => { setQuery(""); setStatus("All"); }}><X />Clear</Button>
        </div>
      )}

      {filtered.length ? <ReportList items={filtered} /> : <EmptyReports />}
    </AppShell>
  );
}
