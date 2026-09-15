import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Small reusable clay pieces. Pages are composed from these, never from bespoke blocks. */

export function Tile({ label, value, note, tone = "plain", className }: { label: string; value: ReactNode; note?: string; tone?: "plain" | "accent" | "warning" | "success" | "solid"; className?: string }) {
  const toneClass = { plain: "", accent: "text-accent", warning: "text-warning", success: "text-success", solid: "" }[tone];
  return (
    <div className={cn("clay clay-press p-4 sm:p-5", tone === "solid" && "bg-primary text-primary-foreground", className)}>
      <p className={cn("text-[10px] font-bold uppercase tracking-wide", tone === "solid" ? "text-primary-foreground/60" : "text-muted-foreground")}>{label}</p>
      <p className={cn("mt-2 font-display text-2xl font-semibold leading-none", toneClass)}>{value}</p>
      {note && <p className={cn("mt-1.5 text-[11px]", tone === "solid" ? "text-primary-foreground/60" : "text-muted-foreground")}>{note}</p>}
    </div>
  );
}

export function Chip({ children, tone = "muted", className }: { children: ReactNode; tone?: "muted" | "accent" | "warning" | "success"; className?: string }) {
  const tones = {
    muted: "bg-secondary text-muted-foreground",
    accent: "bg-accent-soft text-accent",
    warning: "bg-warning-soft text-warning",
    success: "bg-success-soft text-success",
  };
  return <span className={cn("inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide", tones[tone], className)}>{children}</span>;
}

export function SectionHead({ eyebrow, title, action }: { eyebrow: string; title: string; action?: ReactNode }) {
  return (
    <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-wide text-accent">{eyebrow}</p>
        <h2 className="font-display text-xl font-semibold leading-tight">{title}</h2>
      </div>
      {action}
    </div>
  );
}

export function Panel({ children, className, inset = false }: { children: ReactNode; className?: string; inset?: boolean }) {
  return <section className={cn(inset ? "clay-inset" : "clay", "p-5 sm:p-6", className)}>{children}</section>;
}

export function ActivityRow({ title, meta, right }: { title: string; meta: string; right?: ReactNode }) {
  return (
    <div className="clay-flat clay-press grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 p-4">
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold">{title}</p>
        <p className="truncate text-[11px] text-muted-foreground">{meta}</p>
      </div>
      {right}
    </div>
  );
}

export function FactRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 py-2 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="truncate font-semibold">{value}</span>
    </div>
  );
}
