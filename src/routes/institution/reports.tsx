import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Download, Search } from "lucide-react";
import { AppShell, PageHead } from "@/components/app/shell";
import { InstitutionQueue } from "@/components/app/institution-queue";
import { Tile } from "@/components/app/pieces";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export const Route = createFileRoute("/institution/reports")({
  head: () => ({
    meta: [
      { title: "Report Register — Universal Diagnosis" },
      { name: "description", content: "Review and manage institution diagnostic reports." },
      { property: "og:title", content: "Report Register — Universal Diagnosis" },
      { property: "og:description", content: "Review and manage institution diagnostic reports." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Page,
});

function Page() {
  const [filter, setFilter] = useState("All");
  return (
    <AppShell role="institution">
      <PageHead
        eyebrow="Clinical register"
        title="All reports"
        description="A live clinical ledger for reviewing, clearing, and delivering every incoming record."
        action={<Button variant="outline" onClick={() => toast.success("Queue exported as CSV")}><Download /><span className="hidden sm:inline">Export</span></Button>}
      />

      <div className="mb-3.5 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        <Tile label="Active records" value="05" note="In the ledger" />
        <Tile label="Need review" value="02" note="Priority first" tone="accent" />
        <Tile label="Median turnaround" value="46m" note="On target" />
        <Tile label="Delivered today" value="71" note="Patients notified" tone="success" />
      </div>

      <div className="mb-3.5 grid gap-2.5 md:grid-cols-[minmax(220px,1fr)_auto]">
        <div className="relative">
          <Search className="absolute left-4 top-3.5 size-4 text-muted-foreground" />
          <Input
            className="pl-10"
            placeholder="Search patient, report, or record ID"
            aria-label="Search records"
            onChange={(e) => { if (e.target.value) toast.info("Demo search is ready for connected data", { id: "search" }); }}
          />
        </div>
        <div className="clay-inset flex gap-1 overflow-x-auto rounded-full p-1">
          {["All", "Needs review", "Ready", "Delivered"].map((x) => (
            <button
              key={x}
              type="button"
              aria-pressed={filter === x}
              onClick={() => setFilter(x)}
              className={`h-9 whitespace-nowrap rounded-full px-3.5 text-xs font-semibold transition-shadow ${filter === x ? "bg-accent text-accent-foreground shadow-[var(--clay-flat)]" : "text-muted-foreground hover:text-foreground"}`}
            >
              {x}
            </button>
          ))}
        </div>
      </div>

      <InstitutionQueue filter={filter} />
    </AppShell>
  );
}
