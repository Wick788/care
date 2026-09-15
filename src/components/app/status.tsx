import { Chip } from "./pieces";
export function Status({ value }: { value: string }) {
  const tone = value.toLowerCase().includes("review") ? "warning" : value === "Scheduled" ? "accent" : "success";
  return <Chip tone={tone}><i className="size-1.5 rounded-full bg-current" />{value}</Chip>;
}
