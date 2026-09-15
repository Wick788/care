import { createFileRoute } from "@tanstack/react-router";
import { Building2, Bell, ShieldCheck } from "lucide-react";
import { AppShell, PageHead } from "@/components/app/shell";
import { SectionHead } from "@/components/app/pieces";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/institution/settings")({
  head: () => ({ meta: [
    { title: "Workspace Settings — Universal Diagnosis" },
    { name: "description", content: "Manage institution identity, delivery preferences, and workspace security." },
    { property: "og:title", content: "Workspace Settings — Universal Diagnosis" },
    { property: "og:description", content: "Manage institution identity, delivery preferences, and workspace security." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }), component: Page,
});

function Page() {
  return <AppShell role="institution">
    <PageHead eyebrow="Administration" title="Workspace settings" description="Manage the details and defaults shared across St. Alder’s Laboratory." />
    <form className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(300px,.9fr)]" onSubmit={(event) => { event.preventDefault(); toast.success("Workspace settings saved"); }}>
      <section className="clay-lg p-5 sm:p-7"><SectionHead eyebrow="Institution" title="Workspace identity" /><div className="mt-5 grid gap-5 sm:grid-cols-2"><div className="space-y-2 sm:col-span-2"><Label htmlFor="institution-name">Institution name</Label><Input id="institution-name" defaultValue="St. Alder's Laboratory" /></div><div className="space-y-2"><Label htmlFor="institution-code">Provider code</Label><Input id="institution-code" defaultValue="SAL-2048" disabled /></div><div className="space-y-2"><Label htmlFor="institution-phone">Main telephone</Label><Input id="institution-phone" defaultValue="+44 20 7946 0231" /></div><div className="space-y-2 sm:col-span-2"><Label htmlFor="institution-address">Primary location</Label><Input id="institution-address" defaultValue="18 Northgate Road, London" /></div></div><Button className="mt-6" type="submit">Save workspace</Button></section>
      <div className="grid content-start gap-5"><section className="clay p-5"><div className="flex gap-4"><span className="clay-flat grid size-11 shrink-0 place-items-center rounded-2xl text-accent"><Building2 /></span><div><h2 className="font-display text-xl font-semibold">St. Alder’s</h2><p className="text-sm text-muted-foreground">Diagnostic institution · Verified</p></div></div></section><section className="clay p-5"><SectionHead eyebrow="Delivery" title="Notifications" /><Setting icon={Bell} title="Priority result alerts" note="Clinical leads and reviewers" /><Setting icon={Bell} title="Patient delivery receipts" note="Operations inbox" /></section><section className="clay p-5"><SectionHead eyebrow="Access" title="Security policy" /><div className="flex gap-3"><ShieldCheck className="size-5 shrink-0 text-success" /><p className="text-sm leading-6 text-muted-foreground">Two-step verification and 30-minute session limits are active for all clinical accounts.</p></div><Button variant="outline" className="mt-4" type="button" onClick={() => toast.info("Access policy opened")}>Review access policy</Button></section></div>
    </form>
  </AppShell>;
}

function Setting({ icon: Icon, title, note }: { icon: typeof Bell; title: string; note: string }) { return <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 border-b py-3 last:border-0"><Icon className="size-4 text-accent" /><div><p className="text-sm font-semibold">{title}</p><p className="text-xs text-muted-foreground">{note}</p></div><span className="size-2.5 rounded-full bg-success" aria-label="Enabled" /></div>; }