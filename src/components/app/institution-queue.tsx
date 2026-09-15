import { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { queue } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { Chip } from "./pieces";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

const tone: Record<string, "accent" | "warning" | "success" | "muted"> = {
  "Needs review": "accent",
  Ready: "warning",
  Delivered: "success",
};

export function InstitutionQueue({ filter = "All" }: { filter?: string }) {
  const [rows, setRows] = useState(queue);
  const shown = rows.filter((r) => filter === "All" || r.status === filter);
  function update(id: string, status: string) {
    setRows((v) => v.map((r) => (r.id === id ? { ...r, status } : r)));
    toast.success(`Report ${id} marked ${status.toLowerCase()}`);
  }
  if (!shown.length)
    return <div className="clay-inset grid min-h-40 place-items-center p-6 text-center text-sm text-muted-foreground">No records with this status right now.</div>;
  return (
    <div className="grid gap-2.5">
      {shown.map((r) => (
        <article key={r.id} className="clay clay-press grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 p-3.5 md:grid-cols-[5.5rem_minmax(0,1.1fr)_minmax(0,1fr)_5rem_8.5rem_2.5rem]">
          <span className="clay-flat hidden rounded-full px-2.5 py-1 text-center text-[11px] font-bold text-muted-foreground md:inline">{r.id}</span>
          <div className="min-w-0">
            <p className="truncate font-display text-sm font-semibold">{r.patient}</p>
            <p className="truncate text-[11px] text-muted-foreground md:hidden">{r.id} · {r.report} · {r.time}</p>
          </div>
          <span className="hidden truncate text-sm md:block">{r.report}</span>
          <span className="hidden text-[11px] text-muted-foreground md:block">{r.time}</span>
          <span className="hidden md:block"><Chip tone={tone[r.status] ?? "muted"}><i className="size-1.5 rounded-full bg-current" />{r.status}</Chip></span>
          <div className="flex shrink-0 items-center gap-2">
            <span className="md:hidden"><Chip tone={tone[r.status] ?? "muted"}>{r.status}</Chip></span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="size-9" aria-label={`Actions for ${r.id}`}><MoreHorizontal /></Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => update(r.id, "Ready")}>Mark ready</DropdownMenuItem>
                <DropdownMenuItem onClick={() => update(r.id, "Delivered")}>Mark delivered</DropdownMenuItem>
                <DropdownMenuItem onClick={() => toast.info(`Opening ${r.id}`)}>Open record</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </article>
      ))}
    </div>
  );
}
