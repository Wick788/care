import { Link } from "@tanstack/react-router";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import { reports, type Report } from "@/data/mock";
import { Status } from "./status";

export function ReportList({ items = reports, compact = false }: { items?: Report[]; compact?: boolean }) {
  return (
    <div className="grid gap-2.5">
      {items.map((r) => (
        <article key={r.id} className="clay clay-press group grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 p-3.5">
          <div className="min-w-0">
            <div className="flex min-w-0 flex-wrap items-center gap-2">
              <h3 className="truncate font-display text-base font-semibold">{r.title}</h3>
              <Status value={r.status} />
            </div>
            <p className="mt-1 truncate text-xs text-muted-foreground">{r.institution} · {r.doctor} · {r.date}</p>
            {!compact && <p className="mt-1.5 line-clamp-2 max-w-2xl text-sm leading-5 text-muted-foreground">{r.summary}</p>}
          </div>
          <Link
            to="/patient/reports/$reportId"
            params={{ reportId: r.id }}
            aria-label={`Open ${r.title}`}
            className="clay-flat grid size-10 shrink-0 place-items-center rounded-full transition-colors group-hover:bg-accent group-hover:text-accent-foreground"
          >
            <ArrowUpRight className="size-4" />
          </Link>
        </article>
      ))}
    </div>
  );
}

export function EmptyReports() {
  return (
    <div className="clay-inset grid min-h-56 place-items-center p-8 text-center">
      <div>
        <CalendarDays className="mx-auto size-8 text-accent" />
        <h3 className="mt-3 font-display text-lg font-semibold">No reports in this view</h3>
        <p className="mt-1 text-sm text-muted-foreground">Change the search or clear the active filter.</p>
      </div>
    </div>
  );
}
