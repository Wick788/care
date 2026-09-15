import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Circle, Dumbbell, Leaf, Pill, Target } from "lucide-react";
import { AppShell, PageHead } from "@/components/app/shell";
import { Chip, SectionHead } from "@/components/app/pieces";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/patient/care-plan")({
  head: () => ({ meta: [
    { title: "Care Plan — Universal Diagnosis" },
    { name: "description", content: "Follow your current treatment plan, goals, and next clinical steps." },
    { property: "og:title", content: "Care Plan — Universal Diagnosis" },
    { property: "og:description", content: "Follow your current treatment plan, goals, and next clinical steps." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: Page,
});

const actions = ["Take Atorvastatin after dinner", "Log today’s blood pressure", "Book dietary review"];

function Page() {
  const [done, setDone] = useState([true, false, false]);
  return (
    <AppShell role="patient">
      <PageHead eyebrow="Updated 18 March" title="My care plan" description="A focused view of what to do now, what is improving, and what your care team will review next." />
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(320px,.85fr)]">
        <section className="clay-lg p-5 sm:p-7">
          <div className="flex items-start justify-between gap-4"><div><Chip tone="success">On track</Chip><h2 className="mt-4 font-display text-2xl font-semibold">Lower LDL cholesterol</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">Aim for below 130 mg/dL before your repeat profile in early May.</p></div><Target className="size-7 shrink-0 text-accent" /></div>
          <div className="clay-inset mt-6 p-4 sm:p-5"><div className="flex items-end justify-between gap-4"><div><p className="text-xs text-muted-foreground">Current</p><p className="font-display text-3xl font-semibold">142 <span className="text-sm font-normal">mg/dL</span></p></div><div className="text-right"><p className="text-xs text-muted-foreground">Target</p><p className="font-display text-xl font-semibold text-success">&lt;130</p></div></div><div className="mt-4 h-2 overflow-hidden rounded-full bg-secondary"><div className="h-full w-[62%] rounded-full bg-accent" /></div></div>
          <SectionHead eyebrow="Today" title="Three simple actions" />
          <div className="mt-4 grid gap-3">
            {actions.map((action, index) => <Button key={action} variant="outline" className="h-auto min-h-14 justify-start whitespace-normal px-4 py-3 text-left" onClick={() => setDone((current) => current.map((value, i) => i === index ? !value : value))}>{done[index] ? <Check className="text-success" /> : <Circle />}<span className={done[index] ? "text-muted-foreground line-through" : ""}>{action}</span></Button>)}
          </div>
        </section>
        <div className="grid content-start gap-5">
          <section className="clay p-5"><SectionHead eyebrow="Medication" title="Current prescription" /><div className="flex items-start gap-4"><span className="clay-flat grid size-11 shrink-0 place-items-center rounded-2xl text-accent"><Pill /></span><div><h3 className="font-semibold">Atorvastatin 10 mg</h3><p className="mt-1 text-sm text-muted-foreground">Once daily · after evening meal</p><Button variant="link" className="mt-2 h-auto p-0" onClick={() => toast.success("Refill request sent")}>Request refill</Button></div></div></section>
          <section className="clay p-5"><SectionHead eyebrow="Habits" title="Weekly focus" /><div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1"><div className="clay-flat flex gap-3 p-4"><Leaf className="size-5 shrink-0 text-success" /><div><b className="text-sm">Heart-friendly meals</b><p className="text-xs text-muted-foreground">4 of 5 days logged</p></div></div><div className="clay-flat flex gap-3 p-4"><Dumbbell className="size-5 shrink-0 text-accent" /><div><b className="text-sm">Moderate activity</b><p className="text-xs text-muted-foreground">94 of 150 minutes</p></div></div></div></section>
        </div>
      </div>
    </AppShell>
  );
}