import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CalendarDays, Check, Clock3, MapPin, Video } from "lucide-react";
import { AppShell, PageHead } from "@/components/app/shell";
import { Chip, FactRow, SectionHead } from "@/components/app/pieces";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/patient/appointments")({
  head: () => ({ meta: [
    { title: "Appointments — Universal Diagnosis" },
    { name: "description", content: "Review upcoming visits and your recent appointment history." },
    { property: "og:title", content: "Appointments — Universal Diagnosis" },
    { property: "og:description", content: "Review upcoming visits and your recent appointment history." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: Page,
});

const pastVisits = [
  { date: "12 Mar", title: "Cardiology review", clinician: "Dr. Elena Voss", mode: "Northgate Health" },
  { date: "04 Feb", title: "Routine blood collection", clinician: "Nurse Amara Cole", mode: "St. Alder's Laboratory" },
  { date: "18 Dec", title: "Nutrition follow-up", clinician: "Mina Shah, RD", mode: "Video consultation" },
];

function Page() {
  const [reminder, setReminder] = useState(true);
  return (
    <AppShell role="patient">
      <PageHead eyebrow="Care schedule" title="Appointments" description="Your next visit, preparation notes, and recent consultations in one place." />
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.25fr)_minmax(300px,.75fr)]">
        <section className="clay-lg p-5 sm:p-7">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
            <div className="min-w-0">
              <Chip tone="accent">Next visit</Chip>
              <h2 className="mt-4 font-display text-2xl font-semibold sm:text-3xl">Radiology consultation</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">Review of your chest imaging with Dr. Owen Clarke.</p>
            </div>
            <div className="clay-flat shrink-0 px-4 py-3 text-center">
              <b className="block font-display text-2xl">06</b><span className="text-xs text-muted-foreground">April</span>
            </div>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="clay-flat flex items-center gap-3 p-4"><Clock3 className="size-5 text-accent" /><div><p className="text-sm font-semibold">09:30–10:00</p><p className="text-xs text-muted-foreground">Arrive 10 minutes early</p></div></div>
            <div className="clay-flat flex items-center gap-3 p-4"><MapPin className="size-5 text-accent" /><div><p className="text-sm font-semibold">Radiology, Level 2</p><p className="text-xs text-muted-foreground">Northgate Health Centre</p></div></div>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <Button onClick={() => toast.success("Appointment added to your calendar")}><CalendarDays />Add to calendar</Button>
            <Button variant="outline" onClick={() => toast.info("Rescheduling options requested")}>Reschedule</Button>
          </div>
        </section>
        <section className="clay p-5 sm:p-6">
          <SectionHead eyebrow="Before you arrive" title="Preparation" />
          <FactRow label="Bring" value="Photo ID" />
          <FactRow label="Fasting" value="Not required" />
          <FactRow label="Referral" value={<span className="text-success">Received</span>} />
          <div className="mt-5 border-t pt-5">
            <button type="button" className="grid w-full grid-cols-[auto_minmax(0,1fr)] items-center gap-3 text-left" onClick={() => setReminder(!reminder)}>
              <span className={`grid size-9 place-items-center rounded-full ${reminder ? "bg-success text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>{reminder ? <Check className="size-4" /> : <Clock3 className="size-4" />}</span>
              <span><b className="block text-sm">24-hour reminder</b><small className="text-muted-foreground">{reminder ? "Reminder is active" : "Tap to enable"}</small></span>
            </button>
          </div>
        </section>
      </div>
      <section className="mt-8">
        <SectionHead eyebrow="Recent care" title="Past visits" />
        <div className="grid gap-3 lg:grid-cols-3">
          {pastVisits.map((visit) => <article key={`${visit.date}-${visit.title}`} className="clay-flat p-4 sm:p-5"><p className="text-xs font-bold text-accent">{visit.date}</p><h3 className="mt-2 font-display text-lg font-semibold">{visit.title}</h3><p className="mt-2 text-sm text-muted-foreground">{visit.clinician}</p><p className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">{visit.mode.includes("Video") ? <Video className="size-3.5" /> : <MapPin className="size-3.5" />}{visit.mode}</p></article>)}
        </div>
      </section>
    </AppShell>
  );
}