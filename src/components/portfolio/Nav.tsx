import { useEffect, useState } from "react";
import { Download, Menu, X } from "lucide-react";
import { profile } from "@/lib/profile";
import { useResumeAvailable } from "./shared";

const links = ["home", "about", "skills", "projects", "experience", "education", "contact"];

export function Nav() {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const resume = useResumeAvailable();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    links.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => { window.removeEventListener("scroll", onScroll); io.disconnect(); };
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled ? "py-2" : "py-4"}`}>
      <nav aria-label="Main" className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-2.5 transition-all ${scrolled ? "glass mx-4 lg:mx-auto" : ""}`}>
        <a href="#home" className="font-display text-lg font-bold">
          <span className="text-gradient">VK</span><span className="text-muted-foreground">.dev</span>
        </a>
        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((id) => (
            <li key={id}>
              <a href={`#${id}`} aria-current={active === id ? "true" : undefined}
                className={`rounded-lg px-3 py-2 text-sm capitalize transition ${active === id ? "bg-accent text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                {id}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <a href={resume ? profile.resumePath : "#resume"} {...(resume ? { download: "Vinay_Kumar_Madhugundu_Resume.pdf" } : {})}
            className="hidden items-center gap-2 rounded-xl bg-gradient-brand px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:brightness-110 sm:inline-flex">
            <Download className="h-4 w-4" /> Resume
          </a>
          <button onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}
            className="glass grid h-10 w-10 place-items-center rounded-xl lg:hidden">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>
      {open && (
        <div className="glass mx-4 mt-2 rounded-2xl p-3 lg:hidden animate-in fade-in slide-in-from-top-2">
          {links.map((id) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)}
              className={`block rounded-lg px-4 py-3 capitalize ${active === id ? "bg-accent text-foreground" : "text-muted-foreground"}`}>
              {id}
            </a>
          ))}
          <a href={resume ? profile.resumePath : "#resume"} onClick={() => setOpen(false)} {...(resume ? { download: true } : {})}
            className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-gradient-brand px-4 py-3 text-sm font-semibold text-primary-foreground">
            <Download className="h-4 w-4" /> Download Resume
          </a>
        </div>
      )}
    </header>
  );
}
