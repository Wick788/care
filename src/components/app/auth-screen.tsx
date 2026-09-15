import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Building2, Check, Eye, EyeOff, ShieldCheck, UserRound } from "lucide-react";
import { Brand } from "./brand";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AuthScreen({ role }: { role: "patient" | "institution" }) {
  const [mode, setMode] = useState<"signin" | "create">("signin");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const patient = role === "patient";

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const form = new FormData(e.currentTarget as HTMLFormElement);
    if (!String(form.get("email")).includes("@") || String(form.get("password")).length < 6) {
      setError("Enter a valid email and a password of at least 6 characters.");
      return;
    }
    setError("");
    void navigate({ to: patient ? "/patient/dashboard" : "/institution/dashboard" });
  }

  const facts = [
    { k: "256-bit", v: "Encrypted" },
    { k: "24/7", v: "Available" },
    { k: "Demo", v: "Mock data" },
  ];

  return (
    <main className="min-h-screen bg-background p-3 sm:p-5">
      <div className="mx-auto grid max-w-[1400px] gap-4 lg:grid-cols-[minmax(0,.85fr)_minmax(0,1fr)]">
        <section className="clay-lg flex flex-col justify-between bg-primary p-6 text-primary-foreground sm:p-8">
          <Link to="/" className="inline-flex w-fit items-center gap-2 rounded-full bg-primary-foreground/10 px-3.5 py-2 text-xs font-semibold text-primary-foreground/80 transition-colors hover:bg-primary-foreground/20">
            <ArrowLeft className="size-4" />Workspace choice
          </Link>
          <div className="my-10 max-w-lg rise-in">
            <span className="grid size-12 place-items-center rounded-2xl bg-accent text-accent-foreground">{patient ? <UserRound /> : <Building2 />}</span>
            <p className="mt-7 text-[10px] font-bold uppercase tracking-wide text-warning-soft">{patient ? "Personal health record" : "Institution operations"}</p>
            <h1 className="mt-3 font-display text-4xl font-semibold leading-[1.05] sm:text-5xl">
              {patient ? "Understand what changed. Know what comes next." : "Move every report forward with confidence."}
            </h1>
            <p className="mt-4 max-w-md leading-7 text-primary-foreground/70">
              {patient ? "A clear sequence of results, physician context, and the decisions that follow." : "One calm workspace for intake, clinical review, and patient delivery."}
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2.5">
            {facts.map((f) => (
              <div key={f.k} className="rounded-2xl bg-primary-foreground/10 p-3">
                <b className="block font-display text-lg leading-none">{f.k}</b>
                <span className="text-[11px] text-primary-foreground/60">{f.v}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="flex items-center justify-center py-6">
          <div className="w-full max-w-lg">
            <Brand />
            <div className="mt-8">
              <p className="text-[10px] font-bold uppercase tracking-wide text-accent">Secure entry</p>
              <h2 className="mt-1.5 font-display text-3xl font-semibold">{mode === "signin" ? "Welcome back" : "Create your access"}</h2>
            </div>
            <div className="clay-inset mt-6 grid grid-cols-2 gap-1 rounded-full p-1">
              {(["signin", "create"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  aria-pressed={mode === m}
                  className={`h-10 rounded-full text-sm font-semibold transition-shadow ${mode === m ? "bg-surface shadow-[var(--clay-flat)]" : "text-muted-foreground"}`}
                >
                  {m === "signin" ? "Sign in" : "Create account"}
                </button>
              ))}
            </div>
            <form className="clay mt-4 space-y-4 p-5" onSubmit={submit} noValidate>
              {mode === "create" && (
                <div className="space-y-1.5">
                  <Label htmlFor="name">{patient ? "Full name" : "Institution name"}</Label>
                  <Input id="name" name="name" required placeholder={patient ? "e.g. Marisol Okafor" : "e.g. St. Alder's Laboratory"} />
                </div>
              )}
              <div className="space-y-1.5">
                <Label htmlFor="email">Email address</Label>
                <Input id="email" name="email" type="email" placeholder="name@example.com" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input id="password" name="password" type={show ? "text" : "password"} className="pr-12" />
                  <Button type="button" variant="ghost" size="icon" className="absolute right-1 top-0.5" onClick={() => setShow(!show)} aria-label={show ? "Hide password" : "Show password"}>
                    {show ? <EyeOff /> : <Eye />}
                  </Button>
                </div>
              </div>
              {error && <p role="alert" className="rounded-2xl bg-destructive/10 p-3 text-sm font-medium text-destructive">{error}</p>}
              <Button className="h-12 w-full justify-between px-5" type="submit">
                <span>{mode === "signin" ? "Continue securely" : "Create account"}</span>
                <ArrowUpRight />
              </Button>
              <p className="flex items-start gap-2 text-xs text-muted-foreground">
                <Check className="mt-0.5 size-4 shrink-0 text-success" />
                This prototype accepts any valid email and six-character password.
              </p>
            </form>
            <p className="mt-3 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="size-4 text-success" />No real patient data is stored in this demo.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
