import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowUpRight, Check, FileText, UploadCloud } from "lucide-react";
import { AppShell, PageHead } from "@/components/app/shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/institution/upload")({
  head: () => ({
    meta: [
      { title: "Upload Report — Universal Diagnosis" },
      { name: "description", content: "Prepare and review a diagnostic report for patient delivery." },
      { property: "og:title", content: "Upload Report — Universal Diagnosis" },
      { property: "og:description", content: "Prepare and review a diagnostic report for patient delivery." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Page,
});

const steps = ["Add source", "Verify record", "Enter queue"];

function Page() {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState("");
  const [error, setError] = useState("");

  function next() {
    if (step === 1 && !file) {
      setError("Select a report file before continuing.");
      return;
    }
    setError("");
    setStep((v) => Math.min(3, v + 1));
  }

  return (
    <AppShell role="institution">
      <PageHead
        eyebrow={`New clinical record · Step ${step} of 3`}
        title={step === 3 ? "Report ready" : "Upload report"}
        description="Add the source document, confirm its clinical details, then place it in the review queue."
      />

      <div className="grid gap-3.5 xl:grid-cols-[230px_minmax(0,780px)]">
        <aside className="grid content-start gap-2.5">
          {steps.map((label, i) => {
            const n = i + 1;
            const done = step > n;
            return (
              <div key={label} className={`grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 p-3 ${step === n ? "clay text-foreground" : "clay-flat text-muted-foreground"}`}>
                <span className={`grid size-8 place-items-center rounded-full text-xs font-bold ${done ? "bg-success-soft text-success" : step === n ? "bg-accent text-accent-foreground" : "bg-secondary"}`}>
                  {done ? <Check className="size-4" /> : `0${n}`}
                </span>
                <span className="text-sm font-semibold">{label}</span>
              </div>
            );
          })}
          <Progress value={(step / 3) * 100} className="mt-1" />
        </aside>

        <div>
          {step === 1 && (
            <section className="clay-lg rise-in p-5 sm:p-6">
              <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">Source document</p>
                  <h2 className="mt-1 font-display text-2xl font-semibold">Select the clinical report</h2>
                </div>
                <span className="text-xs text-muted-foreground">PDF, PNG or JPG · 20 MB max</span>
              </div>
              <label className="clay-inset mt-4 grid min-h-48 cursor-pointer place-items-center p-6 text-center transition-shadow hover:shadow-[var(--clay-raised)]">
                <input type="file" className="sr-only" accept=".pdf,.png,.jpg,.jpeg" onChange={(e) => { setFile(e.target.files?.[0]?.name ?? ""); setError(""); }} />
                <span>
                  <UploadCloud className="mx-auto size-9 text-accent" />
                  <strong className="mt-3 block font-display text-lg">Choose a file or drop it here</strong>
                  <small className="mt-1 block text-muted-foreground">The record remains private until clinical approval.</small>
                </span>
              </label>
              {file && (
                <div className="clay-flat mt-2.5 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 bg-success-soft p-3 text-sm">
                  <FileText className="size-4 text-success" />
                  <span className="min-w-0 truncate font-semibold">{file}</span>
                  <span className="text-xs font-semibold text-success">Ready</span>
                </div>
              )}
              {error && <p role="alert" className="mt-2.5 rounded-2xl bg-destructive/10 p-3 text-sm font-medium text-destructive">{error}</p>}
              <Button className="mt-4" onClick={next}>Continue to details <ArrowUpRight /></Button>
            </section>
          )}

          {step === 2 && (
            <section className="clay-lg rise-in p-5 sm:p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wide text-accent">Record details</p>
                  <h2 className="mt-1 font-display text-2xl font-semibold">Verify before submission</h2>
                </div>
                <FileText className="text-accent" />
              </div>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5"><Label htmlFor="patient-id">Patient ID</Label><Input id="patient-id" defaultValue="PT-0291" /></div>
                <div className="space-y-1.5"><Label htmlFor="test">Report type</Label><Input id="test" defaultValue="Lipid Panel" /></div>
                <div className="space-y-1.5"><Label htmlFor="doctor">Reviewing clinician</Label><Input id="doctor" defaultValue="Dr. Elena Voss" /></div>
                <div className="space-y-1.5"><Label htmlFor="date">Collection date</Label><Input id="date" type="date" defaultValue="2026-09-15" /></div>
              </div>
              <div className="mt-5 flex gap-2">
                <Button variant="outline" onClick={() => setStep(1)}><ArrowLeft />Back</Button>
                <Button onClick={next}>Verify and submit <ArrowUpRight /></Button>
              </div>
            </section>
          )}

          {step === 3 && (
            <section className="clay-lg rise-in p-5 sm:p-6">
              <span className="grid size-12 place-items-center rounded-2xl bg-success text-primary-foreground"><Check /></span>
              <p className="mt-5 text-[10px] font-bold uppercase tracking-wide text-success">Submission complete</p>
              <h2 className="mt-1.5 max-w-xl font-display text-3xl font-semibold leading-tight">Report RX-8044 entered the review queue.</h2>
              <p className="mt-2.5 max-w-xl text-sm leading-6 text-muted-foreground">
                The source and details are secured. The patient will only be notified after a clinician approves the record.
              </p>
              <div className="mt-5 grid gap-2.5 sm:grid-cols-3">
                <div className="clay-flat p-3"><p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">Record</p><p className="mt-1 font-semibold">RX-8044</p></div>
                <div className="clay-flat p-3"><p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">Patient</p><p className="mt-1 font-semibold">PT-0291</p></div>
                <div className="clay-flat p-3"><p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">Status</p><p className="mt-1 font-semibold text-warning">Awaiting review</p></div>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <Button asChild><Link to="/institution/reports">Open report register <ArrowUpRight /></Link></Button>
                <Button variant="outline" onClick={() => { setStep(1); setFile(""); }}>Upload another</Button>
              </div>
            </section>
          )}
        </div>
      </div>
    </AppShell>
  );
}
