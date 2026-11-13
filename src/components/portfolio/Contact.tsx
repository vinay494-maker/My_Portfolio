import { useEffect, useState } from "react";
import { ArrowUp, CheckCircle2, Loader2, Mail, MapPin, Phone, Send } from "lucide-react";
import { z } from "zod";
import { profile } from "@/lib/profile";
import { Reveal, SectionHeading, SocialLinks, btnPrimary } from "./shared";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name (at least 2 characters).").max(100),
  email: z.string().trim().email("Please enter a valid email address.").max(255),
  subject: z.string().trim().min(3, "Please add a short subject.").max(150),
  message: z.string().trim().min(10, "Message should be at least 10 characters.").max(2000),
});
type Form = z.infer<typeof contactSchema>;
const empty: Form = { name: "", email: "", subject: "", message: "" };

export function Contact() {
  const [form, setForm] = useState<Form>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = contactSchema.safeParse(form);
    if (!r.success) {
      const errs: typeof errors = {};
      r.error.issues.forEach((i) => { errs[i.path[0] as keyof Form] ??= i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus("loading");
    const body = `Hi Vinay,\n\n${r.data.message}\n\n— ${r.data.name} (${r.data.email})`;
    setTimeout(() => {
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(r.data.subject)}&body=${encodeURIComponent(body)}`;
      setStatus("done");
    }, 500);
  };

  const field = (k: keyof Form, label: string, type = "text") => (
    <div>
      <label htmlFor={k} className="mb-1.5 block text-sm font-medium">{label}</label>
      {k === "message" ? (
        <textarea id={k} rows={5} value={form[k]} onChange={(e) => setForm({ ...form, [k]: e.target.value })} aria-invalid={!!errors[k]} aria-describedby={`${k}-err`}
          className="w-full resize-none rounded-xl border border-input bg-muted px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/30" />
      ) : (
        <input id={k} type={type} value={form[k]} onChange={(e) => setForm({ ...form, [k]: e.target.value })} aria-invalid={!!errors[k]} aria-describedby={`${k}-err`}
          className="w-full rounded-xl border border-input bg-muted px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/30" />
      )}
      {errors[k] && <p id={`${k}-err`} className="mt-1.5 text-xs text-destructive">{errors[k]}</p>}
    </div>
  );

  const info = [
    { Icon: Phone, l: "Phone", v: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}` },
    { Icon: Mail, l: "Email", v: profile.email, href: `mailto:${profile.email}` },
    { Icon: MapPin, l: "Location", v: profile.location },
  ];

  return (
    <section id="contact" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="06 — Contact" title="Let's Connect" sub="I'm interested in entry-level software development opportunities and projects where I can apply my technical skills, learn from experienced professionals, and contribute to meaningful solutions." />
        <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          <Reveal className="space-y-4">
            {info.map(({ Icon, l, v, href }) => (
              <div key={l} className="glass flex items-center gap-4 rounded-2xl p-5">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent text-primary"><Icon className="h-5 w-5" /></div>
                <div className="min-w-0"><p className="text-xs text-muted-foreground">{l}</p>
                  {href ? <a href={href} className="break-all font-medium hover:text-primary">{v}</a> : <p className="font-medium">{v}</p>}</div>
              </div>
            ))}
            <div className="glass rounded-2xl p-5"><p className="mb-3 text-xs text-muted-foreground">GitHub & LinkedIn</p><SocialLinks /></div>
          </Reveal>
          <Reveal delay={100}>
            {status === "done" ? (
              <div className="glass flex h-full flex-col items-center justify-center rounded-3xl p-10 text-center">
                <CheckCircle2 className="h-12 w-12 text-success" />
                <h3 className="mt-4 text-xl font-semibold">Your email app should now be open</h3>
                <p className="mt-2 max-w-sm text-sm text-muted-foreground">Your message is pre-filled — just press send there. If nothing opened, email me directly at <a className="text-primary" href={`mailto:${profile.email}`}>{profile.email}</a>.</p>
                <button onClick={() => { setForm(empty); setStatus("idle"); }} className="mt-6 text-sm text-primary underline-offset-4 hover:underline">Write another message</button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate className="glass space-y-4 rounded-3xl p-6 sm:p-8">
                <div className="grid gap-4 sm:grid-cols-2">{field("name", "Name")}{field("email", "Email", "email")}</div>
                {field("subject", "Subject")}
                {field("message", "Message")}
                <button type="submit" disabled={status === "loading"} className={`${btnPrimary} w-full`}>
                  {status === "loading" ? <><Loader2 className="h-4 w-4 animate-spin" /> Preparing…</> : <><Send className="h-4 w-4" /> Send Message</>}
                </button>
                <p className="text-center text-xs text-muted-foreground">Opens your email app with the message ready to send.</p>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const f = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 text-sm text-muted-foreground sm:flex-row">
        <p>© {new Date().getFullYear()} {profile.name}</p>
        <p className="font-mono text-xs">Built with React, TypeScript & Tailwind CSS</p>
      </div>
      <a href="#home" aria-label="Back to top"
        className={`fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center rounded-xl bg-gradient-brand text-primary-foreground shadow-glow transition ${show ? "opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}>
        <ArrowUp className="h-5 w-5" />
      </a>
    </footer>
  );
}
