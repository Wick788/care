import { createFileRoute } from "@tanstack/react-router";
import { Bell, ShieldCheck, UserRound } from "lucide-react";
import { AppShell, PageHead } from "@/components/app/shell";
import { SectionHead } from "@/components/app/pieces";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/patient/profile")({
  head: () => ({ meta: [
    { title: "Profile & Preferences — Universal Diagnosis" },
    { name: "description", content: "Manage your personal details and health record preferences." },
    { property: "og:title", content: "Profile & Preferences — Universal Diagnosis" },
    { property: "og:description", content: "Manage your personal details and health record preferences." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: Page,
});

function Page() {
  return (
    <AppShell role="patient">
      <PageHead eyebrow="Account" title="Profile & preferences" description="Keep your contact information current and choose how your care team reaches you." />
      <form className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(300px,.9fr)]" onSubmit={(event) => { event.preventDefault(); toast.success("Profile changes saved"); }}>
        <section className="clay-lg p-5 sm:p-7"><SectionHead eyebrow="Personal details" title="About you" /><div className="mt-5 grid gap-5 sm:grid-cols-2"><div className="space-y-2"><Label htmlFor="profile-name">Full name</Label><Input id="profile-name" defaultValue="Marisol Okafor" /></div><div className="space-y-2"><Label htmlFor="profile-id">Patient ID</Label><Input id="profile-id" defaultValue="PT-0291" disabled /></div><div className="space-y-2"><Label htmlFor="profile-email">Email</Label><Input id="profile-email" type="email" defaultValue="marisol@example.com" /></div><div className="space-y-2"><Label htmlFor="profile-phone">Mobile</Label><Input id="profile-phone" defaultValue="+44 7700 900 291" /></div><div className="space-y-2 sm:col-span-2"><Label htmlFor="profile-address">Address</Label><Input id="profile-address" defaultValue="42 Alder Lane, London" /></div></div><Button className="mt-6" type="submit">Save changes</Button></section>
        <div className="grid content-start gap-5">
          <section className="clay p-5"><div className="flex gap-4"><span className="clay-flat grid size-11 shrink-0 place-items-center rounded-2xl text-accent"><UserRound /></span><div><h2 className="font-display text-xl font-semibold">Marisol Okafor</h2><p className="text-sm text-muted-foreground">Member since August 2023</p></div></div></section>
          <section className="clay p-5"><SectionHead eyebrow="Communication" title="Notifications" /><Preference icon={Bell} title="New results" note="Email and mobile notification" /><Preference icon={Bell} title="Appointment reminders" note="24 hours before each visit" /></section>
          <section className="clay p-5"><SectionHead eyebrow="Privacy" title="Record security" /><div className="flex gap-3"><ShieldCheck className="size-5 shrink-0 text-success" /><p className="text-sm leading-6 text-muted-foreground">Two-step verification is active. Your last secure access was today at 14:22.</p></div><Button variant="outline" className="mt-4" type="button" onClick={() => toast.info("Security settings opened")}>Review security</Button></section>
        </div>
      </form>
    </AppShell>
  );
}

function Preference({ icon: Icon, title, note }: { icon: typeof Bell; title: string; note: string }) {
  return <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 border-b py-3 last:border-0"><Icon className="size-4 text-accent" /><div><p className="text-sm font-semibold">{title}</p><p className="text-xs text-muted-foreground">{note}</p></div><span className="size-2.5 rounded-full bg-success" aria-label="Enabled" /></div>;
}