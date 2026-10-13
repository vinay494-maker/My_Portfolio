import { useState } from "react";
import {
  Award, BookOpen, Brain, Briefcase, Code2, Database, Download, FileWarning, Github, GitBranch, GraduationCap,
  Languages, Layers, Library, Network, Server, Sparkles, Terminal, Users, X, ExternalLink, Wrench, Globe,
} from "lucide-react";
import { profile } from "@/lib/profile";
import { Reveal, SectionHeading, btnGhost, btnPrimary, useResumeAvailable } from "./shared";

const Wrap = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <section id={id} className="relative py-24"><div className="mx-auto max-w-6xl px-6">{children}</div></section>
);

export function About() {
  const cards = [
    { Icon: Layers, t: "Full Stack Development", d: "Responsive frontends with HTML, CSS, JavaScript and React, backed by Django and MySQL." },
    { Icon: Terminal, t: "Python Programming", d: "A strong foundation in Python for backend logic, data handling and problem-solving." },
    { Icon: Brain, t: "AI-Integrated Applications", d: "Exploring ML and NLP concepts, such as graph-based learning for fake news detection." },
  ];
  const journey = [
    ["2022", "Began B.Tech in Data Science"],
    ["2025", "Web Development Intern at ExcelR"],
    ["2025–26", "AI-Integrated Full Stack Intern at Spheronix"],
    ["2026", "Graduating & seeking entry-level roles"],
  ];
  return (
    <Wrap id="about">
      <SectionHeading eyebrow="01 — About" title="About Me" />
      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <Reveal className="space-y-5 leading-relaxed text-muted-foreground">
          <p>I'm <span className="text-foreground font-medium">Vinay Kumar Madhugundu</span>, a B.Tech graduate in Data Science from Dr. K.V. Subba Reddy Institute of Technology, Kurnool. I have a foundation in Python programming, SQL, frontend development, and backend technologies. Through my internships at Spheronix Technologies and ExcelR, I gained practical exposure to responsive web development, form validation, dynamic user interfaces, and real-world development workflows.</p>
          <p>I have developed projects such as Fake News Detection using Graph Neural Networks and a Library Management System using Django, Python, and MySQL. I am interested in building useful applications, strengthening my technical knowledge, and contributing to software development teams.</p>
        </Reveal>
        <Reveal delay={100} className="glass rounded-2xl p-6">
          <h3 className="mb-5 font-semibold">My Journey</h3>
          <ol className="space-y-4 border-l border-border pl-5">
            {journey.map(([y, t]) => (
              <li key={t} className="relative">
                <span className="absolute -left-[26px] top-1.5 h-2.5 w-2.5 rounded-full bg-gradient-brand" />
                <p className="font-mono text-xs text-primary">{y}</p>
                <p className="text-sm">{t}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {cards.map(({ Icon, t, d }, i) => (
          <Reveal key={t} delay={i * 100}>
            <div className="glass card-lift h-full rounded-2xl p-6">
              <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-gradient-brand text-primary-foreground"><Icon className="h-6 w-6" /></div>
              <h3 className="font-semibold">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Wrap>
  );
}

export function Skills() {
  const groups = [
    { Icon: Code2, t: "Programming Languages", s: ["Python", "SQL", "JavaScript"] },
    { Icon: Globe, t: "Frontend Technologies", s: ["HTML5", "CSS3", "React.js"] },
    { Icon: Server, t: "Backend Technologies", s: ["Django", "MySQL", "REST APIs", "Next.js (Basic Knowledge)"] },
    { Icon: Wrench, t: "Development Tools", s: ["Git", "GitHub", "Visual Studio Code", "Microsoft Office"] },
    { Icon: Users, t: "Professional Skills", s: ["Problem-Solving", "Team Management", "Communication Skills"] },
  ];
  return (
    <Wrap id="skills">
      <SectionHeading eyebrow="02 — Skills" title="Technical Skills" sub="The languages, frameworks and tools I work with." />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map(({ Icon, t, s }, i) => (
          <Reveal key={t} delay={i * 80}>
            <div className="glass card-lift group h-full rounded-2xl p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-accent text-primary transition group-hover:bg-gradient-brand group-hover:text-primary-foreground"><Icon className="h-5 w-5" /></div>
                <h3 className="font-semibold">{t}</h3>
              </div>
              <ul className="flex flex-wrap gap-2">
                {s.map((x) => <li key={x} className="rounded-lg border border-border bg-muted px-3 py-1.5 text-sm">{x}</li>)}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Wrap>
  );
}

type Project = {
  title: string; Icon: typeof Network; overview: string; problem: string; solution: string;
  tech: string[]; features: string[]; approach: string; art: "nn" | "lib";
};
const projects: Project[] = [
  {
    title: "Fake News Detection using Graph Neural Networks", Icon: Network, art: "nn",
    overview: "Developed a fake news detection system that uses Graph Neural Networks to analyze relationships between news articles and identify potentially misleading information. Applied data preprocessing and machine learning concepts to extract useful patterns and support news classification.",
    problem: "Misleading news spreads quickly online, and judging articles in isolation misses the relationships between them that can signal misinformation.",
    solution: "A web application that preprocesses news text and applies graph-based learning concepts to the relationships between articles to support classification.",
    tech: ["React.js", "Node.js", "NLP", "Graph Neural Networks", "Python ML concepts"],
    features: ["Fake news classification", "News text preprocessing", "Relationship-based analysis", "Graph-based learning concepts", "Web application development", "Machine learning integration"],
    approach: "News text is cleaned and preprocessed with NLP techniques, relationships between articles are modelled as a graph, and graph-based learning concepts support classification — surfaced through a React and Node.js web interface.",
  },
  {
    title: "Library Management System", Icon: Library, art: "lib",
    overview: "Developed a web-based Library Management System to manage books, members, issue and return records, and user authentication through an intuitive interface.",
    problem: "Manual library record-keeping makes it hard to track books, members, issued items and due dates accurately.",
    solution: "A Django web application backed by MySQL that centralises book, member and circulation records behind secure login.",
    tech: ["Python", "Django", "MySQL"],
    features: ["Book management", "Member management", "CRUD operations", "Book search", "Book issue and return management", "Due-date tracking", "Database integration", "User authentication"],
    approach: "Built with Django's model-view-template structure, using MySQL for persistent storage and Django authentication to protect administrative actions.",
  },
];

function ProjectArt({ kind }: { kind: "nn" | "lib" }) {
  if (kind === "nn") {
    const L = [[3, 40], [4, 140], [4, 240], [2, 340]] as const;
    const pts = L.map(([n, x]) => Array.from({ length: n }, (_, i) => [x, 100 / (n + 1) * (i + 1) * 1.6 + 10]));
    return (
      <svg viewBox="0 0 380 180" className="h-full w-full" aria-hidden="true">
        {pts.slice(0, -1).map((col, c) => col.map(([x1, y1]) => pts[c + 1].map(([x2, y2], k) => (
          <line key={`${c}${x1}${y1}${k}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--primary)" strokeOpacity=".3" />
        ))))}
        {pts.flat().map(([x, y], k) => <circle key={k} cx={x} cy={y} r="7" fill={k % 2 ? "var(--violet)" : "var(--primary)"} className="animate-pulse-node" style={{ animationDelay: `${k * 0.2}s` }} />)}
      </svg>
    );
  }
  return (
    <div className="grid h-full grid-cols-[80px_1fr] gap-3 p-5" aria-hidden="true">
      <div className="space-y-2 rounded-lg bg-muted p-2">{[1, 2, 3, 4].map((i) => <div key={i} className={`h-3 rounded ${i === 1 ? "bg-primary/70" : "bg-accent"}`} />)}</div>
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-2">{["bg-primary/40", "bg-violet/40", "bg-success/40"].map((c) => <div key={c} className={`h-10 rounded-lg ${c}`} />)}</div>
        <div className="space-y-1.5 rounded-lg bg-muted p-2">{[1, 2, 3, 4].map((i) => <div key={i} className="flex gap-2"><div className="h-2.5 w-1/3 rounded bg-accent" /><div className="h-2.5 flex-1 rounded bg-accent/60" /></div>)}</div>
      </div>
    </div>
  );
}

export function Projects() {
  const [open, setOpen] = useState<Project | null>(null);
  return (
    <Wrap id="projects">
      <SectionHeading eyebrow="03 — Work" title="Featured Projects" sub="Practical projects that combine web development, databases and machine learning concepts." />
      <div className="grid gap-6 lg:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.title} delay={i * 120}>
            <article className="glass card-lift flex h-full flex-col overflow-hidden rounded-3xl">
              <div className="relative h-48 border-b border-border bg-muted/40"><ProjectArt kind={p.art} /></div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-2 text-primary"><p.Icon className="h-5 w-5" /><span className="font-mono text-xs uppercase tracking-widest">Project 0{i + 1}</span></div>
                <h3 className="mt-3 text-xl font-bold">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.overview}</p>
                <ul className="mt-4 flex flex-wrap gap-2">{p.tech.map((t) => <li key={t} className="rounded-md bg-accent px-2.5 py-1 font-mono text-xs">{t}</li>)}</ul>
                <div className="mt-auto flex flex-wrap gap-3 pt-6">
                  <button onClick={() => setOpen(p)} className={btnPrimary}>View Details</button>
                  <span className={`${btnGhost} cursor-not-allowed opacity-60`} title="Repository link coming soon"><Github className="h-4 w-4" /> Code coming soon</span>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
      {open && (
        <div role="dialog" aria-modal="true" aria-label={open.title} className="fixed inset-0 z-[60] grid place-items-center bg-background/80 p-4 backdrop-blur-sm animate-in fade-in" onClick={() => setOpen(null)}>
          <div className="glass max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-3xl p-7 animate-in zoom-in-95" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-2xl font-bold">{open.title}</h3>
              <button autoFocus onClick={() => setOpen(null)} aria-label="Close" className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent"><X className="h-4 w-4" /></button>
            </div>
            {[["The Problem", open.problem], ["The Solution", open.solution], ["Development Approach", open.approach]].map(([h, t]) => (
              <div key={h} className="mt-6"><h4 className="font-mono text-xs uppercase tracking-widest text-primary">{h}</h4><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t}</p></div>
            ))}
            <h4 className="mt-6 font-mono text-xs uppercase tracking-widest text-primary">Key Features</h4>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">{open.features.map((f) => <li key={f} className="flex items-center gap-2 text-sm"><Sparkles className="h-3.5 w-3.5 text-violet" />{f}</li>)}</ul>
            <h4 className="mt-6 font-mono text-xs uppercase tracking-widest text-primary">Technology Stack</h4>
            <ul className="mt-3 flex flex-wrap gap-2">{open.tech.map((t) => <li key={t} className="rounded-md bg-accent px-2.5 py-1 font-mono text-xs">{t}</li>)}</ul>
          </div>
        </div>
      )}
    </Wrap>
  );
}

export function Experience() {
  const jobs = [
    { role: "AI-Integrated Full Stack Development Intern", org: "Spheronix Technologies Pvt. Ltd., India", date: "December 2025 – April 2026",
      items: ["Developed responsive web pages using HTML, CSS, and JavaScript.", "Worked on user-friendly interfaces and cross-browser compatibility.", "Implemented frontend features such as form validation and dynamic content handling.", "Gained exposure to practical software development workflows."] },
    { role: "Web Development Intern", org: "ExcelR, India", date: "May 2025 – July 2025",
      items: ["Developed responsive web pages using HTML, CSS, and JavaScript.", "Worked on improving user experience and cross-browser compatibility.", "Implemented interactive features, including form validation and dynamic UI updates.", "Gained practical exposure to web development workflows and development best practices."] },
  ];
  return (
    <Wrap id="experience">
      <SectionHeading eyebrow="04 — Experience" title="Internship Experience" />
      <ol className="relative space-y-8 border-l border-border pl-8 md:pl-10">
        {jobs.map((j, i) => (
          <li key={j.org}>
            <Reveal delay={i * 100}>
              <span className="absolute -left-[9px] mt-7 grid h-[18px] w-[18px] place-items-center rounded-full bg-gradient-brand ring-4 ring-background" />
              <div className="glass card-lift rounded-2xl p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold">{j.role}</h3>
                    <p className="mt-1 flex items-center gap-2 text-sm text-primary"><Briefcase className="h-4 w-4" />{j.org}</p>
                  </div>
                  <span className="rounded-full bg-accent px-3 py-1 font-mono text-xs">{j.date}</span>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {j.items.map((t) => <li key={t} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet" />{t}</li>)}
                </ul>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </Wrap>
  );
}

export function Education() {
  const edu = [
    { t: "Bachelor of Technology (Data Science)", s: "Dr. K.V. Subba Reddy Institute of Technology, Kurnool", d: "2022 – 2026", p: "75%" },
    { t: "Intermediate — MPC (BIEAP)", s: "Deeksha Junior College, Yemmiganur, Kurnool District", d: "2020 – 2022", p: "85%" },
    { t: "Secondary School (BSEAP)", s: "Government High School, Yemmiganur, Kurnool District", d: "2019 – 2020", p: "96%" },
  ];
  return (
    <Wrap id="education">
      <SectionHeading eyebrow="05 — Education" title="Education & Training" />
      <div className="grid gap-5 md:grid-cols-3">
        {edu.map((e, i) => (
          <Reveal key={e.t} delay={i * 100}>
            <div className="glass card-lift h-full rounded-2xl p-6">
              <div className="flex items-center justify-between"><GraduationCap className="h-6 w-6 text-primary" /><span className="font-mono text-xs text-muted-foreground">{e.d}</span></div>
              <h3 className="mt-4 font-semibold">{e.t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{e.s}</p>
              <p className="mt-4 text-2xl font-bold text-gradient font-display">{e.p}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <div className="glass card-lift relative h-full overflow-hidden rounded-2xl p-6">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-violet/20 blur-2xl" />
            <p className="font-mono text-xs uppercase tracking-widest text-primary">Courses & Professional Training</p>
            <div className="mt-4 flex items-center gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-brand text-primary-foreground"><Award className="h-6 w-6" /></div>
              <div><h3 className="font-semibold">Python Full Stack Developer Trainee</h3><p className="text-sm text-muted-foreground">Destination Career</p></div>
            </div>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div className="glass h-full rounded-2xl p-6">
            <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-primary"><Languages className="h-4 w-4" /> Languages</p>
            <ul className="mt-4 flex flex-wrap gap-2">{["Telugu", "English", "Kannada"].map((l) => <li key={l} className="rounded-lg border border-border bg-muted px-4 py-2 text-sm">{l}</li>)}</ul>
          </div>
        </Reveal>
      </div>
    </Wrap>
  );
}

export function Resume() {
  const ok = useResumeAvailable();
  return (
    <section id="resume" className="py-16">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-10 text-center sm:p-14">
            <div className="absolute inset-0 bg-gradient-brand opacity-10" />
            <BookOpen className="relative mx-auto h-10 w-10 text-primary" />
            <h2 className="relative mt-4 text-3xl font-bold">Want to Know More About Me?</h2>
            <p className="relative mx-auto mt-3 max-w-xl text-muted-foreground">Explore my resume to learn more about my technical skills, projects, internships, and educational background.</p>
            {ok ? (
              <a href={profile.resumePath} download="Vinay_Kumar_Madhugundu_Resume.pdf" className={`${btnPrimary} relative mt-8`}><Download className="h-4 w-4" /> Download Resume PDF</a>
            ) : ok === false ? (
              <p className="relative mx-auto mt-8 inline-flex items-center gap-2 rounded-xl border border-border bg-muted px-4 py-3 text-sm text-muted-foreground">
                <FileWarning className="h-4 w-4 text-primary" /> Resume PDF not uploaded yet — add it as <code className="font-mono text-foreground">resume.pdf</code> to enable download.
              </p>
            ) : null}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export { Database, GitBranch, ExternalLink };
