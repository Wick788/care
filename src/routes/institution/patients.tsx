import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowUpRight, Search, UserRound } from "lucide-react";
import { AppShell, PageHead } from "@/components/app/shell";
import { Chip, SectionHead } from "@/components/app/pieces";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export const Route = createFileRoute("/institution/patients")({
  head: () => ({ meta: [
    { title: "Patients — Universal Diagnosis" },
    { name: "description", content: "Find patients and review their recent diagnostic activity." },
    { property: "og:title", content: "Patients — Universal Diagnosis" },
    { property: "og:description", content: "Find patients and review their recent diagnostic activity." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }), component: Page,
});

const patients = [
  { id: "PT-0291", name: "Marisol Okafor", age: 42, reports: 5, latest: "Lipid panel", status: "Needs review" },
  { id: "PT-0314", name: "Noah Bennett", age: 35, reports: 3, latest: "Full blood count", status: "Reviewed" },
  { id: "PT-0277", name: "Aisha Rahman", age: 57, reports: 8, latest: "HbA1c", status: "Reviewed" },
  { id: "PT-0341", name: "Theo Martins", age: 29, reports: 2, latest: "Chest X-ray", status: "Scheduled" },
  { id: "PT-0259", name: "Grace Liu", age: 64, reports: 11, latest: "Renal profile", status: "Delivered" },
];

function Page() {
  const [query, setQuery] = useState("");
  const results = useMemo(() => patients.filter((patient) => `${patient.name} ${patient.id} ${patient.latest}`.toLowerCase().includes(query.toLowerCase())), [query]);
  return <AppShell role="institution">
    <PageHead eyebrow="Clinical directory" title="Patients" description="Find a patient, understand their latest activity, and continue to the right clinical task." />
    <div className="mb-6 max-w-2xl"><div className="relative"><Search className="absolute left-4 top-3.5 size-4 text-muted-foreground" /><Input className="pl-10" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search name, patient ID, or latest report" aria-label="Search patients" /></div></div>
    <SectionHead eyebrow="Directory" title={`${results.length} patients`} />
    {results.length ? <div className="grid gap-3 lg:grid-cols-2">{results.map((patient) => <article key={patient.id} className="clay-flat grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 p-4 sm:p-5"><span className="clay grid size-11 shrink-0 place-items-center rounded-full text-accent"><UserRound /></span><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><h2 className="font-display text-lg font-semibold">{patient.name}</h2><Chip tone={patient.status === "Needs review" ? "warning" : patient.status === "Reviewed" || patient.status === "Delivered" ? "success" : "muted"}>{patient.status}</Chip></div><p className="mt-1 text-xs text-muted-foreground">{patient.id} · Age {patient.age} · {patient.reports} reports</p><p className="mt-2 text-sm">Latest: <b>{patient.latest}</b></p></div><Button size="icon" variant="ghost" aria-label={`Open ${patient.name}`} onClick={() => toast.info(`${patient.name}'s record opened`)}><ArrowUpRight /></Button></article>)}</div> : <div className="clay-inset p-8 text-center"><p className="font-semibold">No matching patients</p><p className="mt-1 text-sm text-muted-foreground">Try a name, patient ID, or report type.</p></div>}
  </AppShell>;
}