import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Clock3, Mail, ShieldCheck, UserPlus } from "lucide-react";
import { AppShell, PageHead } from "@/components/app/shell";
import { Chip, SectionHead } from "@/components/app/pieces";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/institution/team")({
  head: () => ({ meta: [
    { title: "Clinical Team — Universal Diagnosis" },
    { name: "description", content: "Review clinical coverage, responsibilities, and team availability." },
    { property: "og:title", content: "Clinical Team — Universal Diagnosis" },
    { property: "og:description", content: "Review clinical coverage, responsibilities, and team availability." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }), component: Page,
});

const members = [
  { name: "Dr. Elena Voss", initials: "EV", specialty: "Clinical chemistry", duty: "Reviewing", load: "6 reports" },
  { name: "Dr. Priya Anand", initials: "PA", specialty: "Hematology", duty: "On call", load: "3 reports" },
  { name: "Dr. Owen Clarke", initials: "OC", specialty: "Diagnostic imaging", duty: "Available 14:00", load: "4 studies" },
  { name: "Nurse Amara Cole", initials: "AC", specialty: "Sample collection", duty: "Collecting", load: "12 patients" },
];

function Page() {
  const [shift, setShift] = useState("Day");
  return <AppShell role="institution">
    <PageHead eyebrow="Clinical coverage" title="Team" description="See who is available, where work is concentrated, and how today’s coverage is arranged." action={<Button onClick={() => toast.success("Invitation prepared")}><UserPlus /><span className="hidden sm:inline">Invite member</span></Button>} />
    <div className="mb-6 flex gap-2">{["Day", "Evening", "On call"].map((option) => <Button key={option} size="sm" variant={shift === option ? "default" : "outline"} onClick={() => setShift(option)}>{option}</Button>)}</div>
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
      <section><SectionHead eyebrow={`${shift} shift`} title="On duty" /><div className="grid gap-3 md:grid-cols-2">{members.map((member) => <article key={member.name} className="clay-flat p-5"><div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-3"><span className="grid size-11 place-items-center rounded-full bg-primary font-display text-sm font-semibold text-primary-foreground">{member.initials}</span><div className="min-w-0"><h2 className="truncate font-display text-lg font-semibold">{member.name}</h2><p className="text-xs text-muted-foreground">{member.specialty}</p></div><Chip tone={member.duty === "Reviewing" || member.duty === "Collecting" ? "success" : "muted"}>{member.duty}</Chip></div><div className="mt-5 flex items-center justify-between border-t pt-4"><span className="text-sm text-muted-foreground">Current load</span><b className="text-sm">{member.load}</b></div><Button variant="ghost" size="sm" className="mt-2" onClick={() => toast.info(`Message drafted for ${member.name}`)}><Mail />Message</Button></article>)}</div></section>
      <div className="grid content-start gap-5"><section className="clay p-5"><SectionHead eyebrow="Coverage" title="Today at a glance" /><Coverage icon={ShieldCheck} label="Clinical review" value="Covered" /><Coverage icon={Clock3} label="Evening handover" value="17:30" /><Coverage icon={ShieldCheck} label="Imaging escalation" value="Covered" /></section><section className="clay bg-warning-soft p-5"><Chip tone="warning">Handover</Chip><h2 className="mt-4 font-display text-xl font-semibold">One coverage note</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">Imaging moves to on-call coverage after 18:00. Four studies remain in the queue.</p></section></div>
    </div>
  </AppShell>;
}

function Coverage({ icon: Icon, label, value }: { icon: typeof ShieldCheck; label: string; value: string }) { return <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 border-b py-3 last:border-0"><Icon className="size-4 text-success" /><span className="text-sm text-muted-foreground">{label}</span><b className="text-sm">{value}</b></div>; }