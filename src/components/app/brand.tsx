import { Activity } from "lucide-react";
export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex min-w-0 items-center gap-2.5">
      <span className="clay grid size-9 shrink-0 place-items-center rounded-2xl bg-accent text-accent-foreground"><Activity className="size-4.5" /></span>
      {!compact && (
        <span className="min-w-0 leading-none">
          <strong className="block truncate font-display text-[15px] font-semibold">Universal Diagnosis</strong>
          <small className="mt-1 block text-[9px] font-semibold uppercase tracking-wide text-muted-foreground">Evidence, clearly ordered</small>
        </span>
      )}
    </div>
  );
}
