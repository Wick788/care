import { Link, useRouterState } from "@tanstack/react-router";
import { Building2, CalendarDays, ClipboardList, FilePlus2, HeartPulse, Home, LogOut, MoreHorizontal, Settings, UserRound, UsersRound } from "lucide-react";
import { Brand } from "./brand";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const patientNav = [
  { to: "/patient/dashboard", label: "Overview", icon: Home },
  { to: "/patient/reports", label: "Reports", icon: ClipboardList },
  { to: "/patient/appointments", label: "Appointments", icon: CalendarDays },
  { to: "/patient/care-plan", label: "Care plan", icon: HeartPulse },
  { to: "/patient/profile", label: "Profile", icon: UserRound },
];
const institutionNav = [
  { to: "/institution/dashboard", label: "Operations", icon: Building2 },
  { to: "/institution/reports", label: "Reports", icon: ClipboardList },
  { to: "/institution/patients", label: "Patients", icon: UserRound },
  { to: "/institution/team", label: "Team", icon: UsersRound },
  { to: "/institution/upload", label: "Upload", icon: FilePlus2 },
  { to: "/institution/settings", label: "Settings", icon: Settings },
];

export function AppShell({ role, children }: { role: "patient" | "institution"; children: React.ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const nav = role === "patient" ? patientNav : institutionNav;
  const isActive = (to: string) => path === to || path.startsWith(to + "/");
  const links = nav.map(({ to, label, icon: Icon }) => (
    <Link
      key={to}
      to={to}
      className={cn(
        "flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-semibold transition-shadow",
        isActive(to) ? "bg-accent text-accent-foreground shadow-[var(--clay-raised)]" : "text-muted-foreground hover:bg-surface hover:text-foreground hover:shadow-[var(--clay-flat)]",
      )}
    >
      <Icon className="size-4 shrink-0" />
      {label}
    </Link>
  ));

  return (
    <div className="min-h-screen bg-background">
      <header className="app-shell-header sticky top-0 z-40 bg-background/95 backdrop-blur">
        <div className="mx-auto grid h-16 max-w-[1440px] grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 sm:px-6 lg:h-[4.5rem]">
          <Brand />
          <div className="flex shrink-0 items-center gap-2.5">
            <span className="clay-flat hidden rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground sm:inline">
              {role === "patient" ? "Marisol Okafor · PT-0291" : "St. Alder's Laboratory"}
            </span>
            <span className="clay grid size-9 place-items-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
              {role === "patient" ? "MO" : "SA"}
            </span>
          </div>
        </div>
        <nav className="mx-auto hidden max-w-[1440px] items-center gap-1 overflow-x-auto px-6 pb-3 md:flex" aria-label={`${role} sections`}>
          {links}
          <Link to="/" className="ml-auto flex shrink-0 items-center gap-2 rounded-full px-3.5 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground"><LogOut className="size-4" />Switch</Link>
        </nav>
      </header>
      <main className="mx-auto min-w-0 max-w-[1440px] px-4 py-6 pb-28 sm:px-6 md:pt-8 lg:pb-12">{children}</main>
      <nav
        className="app-mobile-nav clay fixed inset-x-3 bottom-3 z-40 grid grid-cols-4 gap-1 rounded-full p-1.5 pb-[max(.375rem,env(safe-area-inset-bottom))] md:hidden"
      >
        {nav.slice(0, 3).map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className={cn(
              "flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-full text-[11px] font-semibold transition-shadow",
              isActive(to) ? "bg-accent text-accent-foreground shadow-[var(--clay-flat)]" : "text-muted-foreground",
            )}
          >
            <Icon className="size-5" />
            {label}
          </Link>
        ))}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="flex h-auto min-h-12 flex-col gap-0.5 px-1 text-[11px] text-muted-foreground"><MoreHorizontal className="size-5" />More</Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="rounded-t-3xl pb-[max(1.5rem,env(safe-area-inset-bottom))]">
            <SheetTitle className="mb-5">{role === "patient" ? "Patient workspace" : "Institution workspace"}</SheetTitle>
            <nav className="grid grid-cols-2 gap-2">{links}</nav>
            <Link to="/" className="mt-4 flex items-center justify-center gap-2 rounded-full px-3.5 py-3 text-sm font-semibold text-muted-foreground"><LogOut className="size-4" />Switch workspace</Link>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
}

export function PageHead({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: React.ReactNode }) {
  return (
    <header className="mb-7 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
      <div className="min-w-0">
        <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wide text-accent">{eyebrow}</p>
        <h1 className="font-display text-3xl font-semibold leading-tight sm:text-4xl">{title}</h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground sm:text-base">{description}</p>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </header>
  );
}
