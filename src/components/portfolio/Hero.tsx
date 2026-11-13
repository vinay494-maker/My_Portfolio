import { useEffect, useState } from "react";
import { ArrowRight, Download, Mail, Sparkles } from "lucide-react";
import { profile } from "@/lib/profile";
import { SocialLinks, btnGhost, btnPrimary, useResumeAvailable } from "./shared";
<<<<<<< HEAD
=======
import portraitAsset from "@/assets/vinay-portrait.jpeg.asset.json";
>>>>>>> b406820dec8530bf20089288d8bd0a74a52fc424

const phrases = ["Building Web Applications", "Developing Practical Software Solutions", "Exploring AI-Integrated Development"];

function useTyping() {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setText(phrases[i] ?? ""); return; }
    const full = phrases[i] ?? "";
    const t = setTimeout(() => {
      if (!del && text === full) return setDel(true);
      if (del && text === "") { setDel(false); setI((i + 1) % phrases.length); return; }
      setText(del ? full.slice(0, text.length - 1) : full.slice(0, text.length + 1));
    }, !del && text === full ? 1800 : del ? 35 : 70);
    return () => clearTimeout(t);
  }, [text, del, i]);
  return text;
}

function Portrait() {
  return (
    <div className="relative mx-auto w-full max-w-sm sm:max-w-md">
      <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-brand opacity-25 blur-3xl" aria-hidden="true" />
      <div className="glass relative rounded-[1.75rem] p-2 shadow-glow">
        <img
<<<<<<< HEAD
          src="/vinay-portrait.jpeg"
=======
          src={portraitAsset.url}
>>>>>>> b406820dec8530bf20089288d8bd0a74a52fc424
          alt="Vinay Kumar Madhugundu, Python Full Stack Developer, in a black blazer and white shirt"
          width={1254}
          height={1254}
          className="aspect-[4/5] w-full rounded-[1.4rem] object-cover object-[62%_center]"
        />
        <div className="pointer-events-none absolute inset-2 rounded-[1.4rem] ring-1 ring-inset ring-primary/25" aria-hidden="true" />
      </div>
      <div className="glass absolute -bottom-6 -left-4 w-[64%] rounded-2xl p-4 font-mono text-[11px] shadow-glow animate-float sm:-left-8 sm:text-xs">
        <div className="mb-3 flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-destructive/80" />
          <span className="h-2 w-2 rounded-full bg-primary/80" />
          <span className="h-2 w-2 rounded-full bg-success/80" />
        </div>
        <p><span className="text-violet">class</span> <span className="text-primary">Developer</span>:</p>
        <p className="pl-4 text-muted-foreground">self.stack = [<span className="text-success">"Python"</span>,</p>
        <p className="pl-10 text-success">"Django", "React"]</p>
      </div>
      <div className="glass absolute -right-3 top-8 rounded-xl px-3 py-2 font-mono text-[11px] sm:-right-6">
        <span className="text-primary">B.Tech</span> <span className="text-muted-foreground">Data Science</span>
      </div>
    </div>
  );
}

export function Hero() {
  const typed = useTyping();
  const resume = useResumeAvailable();
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-16">
      <div className="bg-grid absolute inset-0 -z-10" />
      <div className="absolute -left-32 top-20 -z-10 h-96 w-96 rounded-full bg-primary/20 blur-3xl animate-blob" />
      <div className="absolute -right-32 bottom-10 -z-10 h-96 w-96 rounded-full bg-violet/20 blur-3xl animate-blob" style={{ animationDelay: "-7s" }} />
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium">
            <span className="relative flex h-2 w-2"><span className="absolute h-full w-full animate-ping rounded-full bg-success opacity-75" /><span className="h-2 w-2 rounded-full bg-success" /></span>
            Open to Entry-Level Opportunities
          </span>
          <p className="mt-8 font-mono text-sm tracking-[0.3em] text-primary">HELLO, I'M</p>
          <h1 className="mt-3 text-4xl font-bold leading-[1.05] sm:text-6xl">{profile.name}</h1>
          <p className="mt-4 text-xl font-semibold text-gradient sm:text-2xl">{profile.title}</p>
          <p className="mt-3 flex h-7 items-center gap-2 font-mono text-sm text-muted-foreground sm:text-base">
            <Sparkles className="h-4 w-4 shrink-0 text-violet" />
            <span>{typed}</span><span className="caret text-primary">|</span>
          </p>
          <p className="mt-6 max-w-xl leading-relaxed text-muted-foreground">
            I'm a software developer passionate about Python, web development, and building reliable, user-focused applications. I enjoy transforming ideas into practical software solutions through programming, problem-solving, and continuous learning.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#projects" className={btnPrimary}>Explore My Projects <ArrowRight className="h-4 w-4" /></a>
            <a href={resume ? profile.resumePath : "#resume"} {...(resume ? { download: profile.resumeFileName } : {})} className={btnGhost}>
              <Download className="h-4 w-4" /> Download My Resume
            </a>
            <a href="#contact" className={btnGhost}><Mail className="h-4 w-4" /> Contact Me</a>
          </div>
          <SocialLinks className="mt-8" />
        </div>
        <Portrait />
      </div>
    </section>
  );
}
