import { useEffect, useRef, useState, type ReactNode } from "react";
import { Github, Linkedin } from "lucide-react";
import { profile } from "@/lib/profile";

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export function SectionHeading({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <Reveal className="mb-12 max-w-2xl">
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-primary">{eyebrow}</p>
      <h2 className="text-3xl font-bold sm:text-4xl">{title}</h2>
      {sub && <p className="mt-4 text-muted-foreground">{sub}</p>}
    </Reveal>
  );
}

export function useResumeAvailable() {
  const [ok, setOk] = useState<boolean | null>(null);
  useEffect(() => {
    fetch(profile.resumePath, { method: "HEAD" })
      .then((r) => setOk(r.ok && (r.headers.get("content-type") ?? "").includes("pdf")))
      .catch(() => setOk(false));
  }, []);
  return ok;
}

export function SocialLinks({ className = "" }: { className?: string }) {
  const items = [
    { href: profile.github, label: "GitHub", Icon: Github },
    { href: profile.linkedin, label: "LinkedIn", Icon: Linkedin },
  ];
  return (
    <div className={`flex gap-3 ${className}`}>
      {items.map(({ href, label, Icon }) =>
        href ? (
          <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={`${label} profile`}
            className="glass grid h-11 w-11 place-items-center rounded-xl text-muted-foreground transition hover:text-primary hover:-translate-y-0.5">
            <Icon className="h-5 w-5" />
          </a>
        ) : (
          <span key={label} title={`${label} link coming soon`} aria-label={`${label} link coming soon`}
            className="glass grid h-11 w-11 cursor-not-allowed place-items-center rounded-xl text-muted-foreground/50">
            <Icon className="h-5 w-5" />
          </span>
        ),
      )}
    </div>
  );
}

export const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-brand px-5 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:-translate-y-0.5 hover:brightness-110 disabled:opacity-60 disabled:hover:translate-y-0";
export const btnGhost =
  "glass inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-foreground transition hover:-translate-y-0.5 hover:border-primary/50";
