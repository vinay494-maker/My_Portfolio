import { useEffect, useState } from "react";
import { ArrowRight, Download, Mail, Sparkles } from "lucide-react";
import { profile } from "@/lib/profile";
import { SocialLinks, btnGhost, btnPrimary, useResumeAvailable } from "./shared";

const phrases = ["Building Web Applications", "Developing Practical Software Solutions", "Exploring AI-Integrated Development"];

function useTyping() {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setText(phrases[i]); return; }
    const full = phrases[i];
    const t = setTimeout(() => {
      if (!del && text === full) return setDel(true);
      if (del && text === "") { setDel(false); setI((i + 1) % phrases.length); return; }
      setText(del ? full.slice(0, text.length - 1) : full.slice(0, text.length + 1));
    }, !del && text === full ? 1800 : del ? 35 : 70);
    return () => clearTimeout(t);
  }, [text, del, i]);
  return text;
}

function CodeIllustration() {
  const nodes = [[60, 70], [230, 40], [330, 150], [180, 190], [70, 260], [300, 300], [200, 330]];
  const edges = [[0, 1], [1, 2], [0, 3], [3, 2], [3, 4], [4, 6], [6, 5], [2, 5], [3, 6]];
  return (
    <div className="relative mx-auto aspect-square w-full max-w-md" aria-hidden="true">
      <div className="absolute inset-8 rounded-full bg-gradient-brand opacity-20 blur-3xl" />
      <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="g" x1="0" x2="1"><stop offset="0" stopColor="var(--primary)" /><stop offset="1" stopColor="var(--violet)" /></linearGradient>
        </defs>
        {edges.map(([a, b], k) => (
          <line key={k} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke="url(#g)" strokeOpacity=".5" strokeWidth="1.5" className="animate-dash" />
        ))}
        {nodes.map(([x, y], k) => (
          <g key={k} className="animate-pulse-node" style={{ animationDelay: `${k * 0.4}s` }}>
            <circle cx={x} cy={y} r="14" fill="url(#g)" opacity=".15" />
            <circle cx={x} cy={y} r="5" fill="url(#g)" />
          </g>
        ))}
      </svg>
      <div className="glass absolute left-1/2 top-1/2 w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-2xl p-5 font-mono text-xs shadow-glow animate-float sm:text-sm">
        <div className="mb-4 flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-destructive/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-primary/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-success/80" />
        </div>
        <p><span className="text-violet">class</span> <span className="text-primary">Developer</span>:</p>
        <p className="pl-4"><span className="text-violet">def</span> <span className="text-primary">__init__</span>(self):</p>
        <p className="pl-8 text-muted-foreground">self.name = <span className="text-success">"Vinay"</span></p>
        <p className="pl-8 text-muted-foreground">self.stack = [<span className="text-success">"Python"</span>,</p>
        <p className="pl-16 text-success">"Django", "React"]</p>
        <p className="pl-8 text-muted-foreground">self.learning = <span className="text-violet">True</span></p>
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
            <a href={resume ? profile.resumePath : "#resume"} {...(resume ? { download: "Vinay_Kumar_Madhugundu_Resume.pdf" } : {})} className={btnGhost}>
              <Download className="h-4 w-4" /> Download My Resume
            </a>
            <a href="#contact" className={btnGhost}><Mail className="h-4 w-4" /> Contact Me</a>
          </div>
          <SocialLinks className="mt-8" />
        </div>
        <CodeIllustration />
      </div>
    </section>
  );
}
