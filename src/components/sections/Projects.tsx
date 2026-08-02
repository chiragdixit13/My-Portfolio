import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, ExternalLink, Github, Layers, X } from "lucide-react";
import { useState } from "react";
import { projects } from "@/data/portfolio";
import { GlassCard, MagneticButton, Reveal, Section, TiltCard } from "@/components/ui-kit";

type Project = (typeof projects)[number];

function CaseStudy({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[110] flex items-start justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-md sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} case study`}
    >
      <motion.article
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 24 }}
        className="glass my-4 w-full max-w-4xl overflow-hidden rounded-3xl"
      >
        <div className="relative">
          <img
            src={project.cover}
            alt={project.title}
            width={1280}
            height={800}
            className="h-56 w-full object-cover sm:h-72"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <button
            onClick={onClose}
            aria-label="Close case study"
            className="glass absolute top-4 right-4 rounded-full p-2 hover:bg-white/12"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="absolute right-6 bottom-5 left-6">
            <h3 className="font-display text-2xl font-semibold sm:text-3xl">{project.title}</h3>
            <p className="text-sm text-muted-foreground">{project.subtitle}</p>
          </div>
        </div>

        <div className="space-y-8 p-6 sm:p-8">
          <div className="grid gap-4 sm:grid-cols-3">
            {project.metrics.map((m) => (
              <div key={m.label} className="glass rounded-2xl p-4 text-center">
                <p className="font-display text-2xl font-semibold text-gradient">{m.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{m.label}</p>
              </div>
            ))}
          </div>

          {[
            { h: "Problem", b: project.problem },
            { h: "Solution", b: project.solution },
            { h: "Architecture", b: project.architecture },
            { h: "Timeline", b: project.timeline },
          ].map((s) => (
            <div key={s.h}>
              <h4 className="mb-2 text-xs tracking-[0.18em] text-cyan uppercase">{s.h}</h4>
              <p className="text-sm leading-relaxed text-muted-foreground">{s.b}</p>
            </div>
          ))}

          <div className="grid gap-6 sm:grid-cols-2">
            {[
              { h: "Features", items: project.features },
              { h: "Challenges", items: project.challenges },
              { h: "Results", items: project.results },
              { h: "Tech stack", items: project.stack },
            ].map((s) => (
              <div key={s.h}>
                <h4 className="mb-3 text-xs tracking-[0.18em] text-cyan uppercase">{s.h}</h4>
                <ul className="space-y-2">
                  {s.items.map((it) => (
                    <li key={it} className="flex gap-2.5 text-sm text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[image:var(--gradient-brand)]" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 border-t border-border pt-6">
            {project.links.github && (
              <MagneticButton variant="primary" as="a" href={project.links.github} target="_blank">
                <Github className="h-4 w-4" /> View code
              </MagneticButton>
            )}
            {project.links.demo && (
              <MagneticButton variant="outline" as="a" href={project.links.demo} target="_blank">
                <ExternalLink className="h-4 w-4" /> Live demo
              </MagneticButton>
            )}
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
}

export function Projects() {
  const [open, setOpen] = useState<Project | null>(null);

  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title={
        <>
          Work that <span className="text-gradient">ships and measures</span>
        </>
      }
      description="Every project below has a problem worth solving, a measurable outcome and code you can read."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.07}>
            <TiltCard intensity={5}>
              <GlassCard className="group h-full hover:border-cyan/40">
                <div className="relative overflow-hidden">
                  <img
                    src={p.cover}
                    alt={`${p.title} screenshot`}
                    loading="lazy"
                    width={1280}
                    height={800}
                    className="aspect-[16/10] w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.07]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/25 to-transparent" />
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <div
                      className="absolute inset-0"
                      style={{ background: "var(--gradient-halo)", opacity: 0.35 }}
                    />
                  </div>
                </div>

                <div className="p-7">
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                    <div className="min-w-0">
                      <h3 className="text-xl font-semibold text-balance">{p.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{p.subtitle}</p>
                    </div>
                    {p.slug !== "student-performance" && p.slug !== "house-price" && (
                      <span className="glass grid h-9 w-9 shrink-0 place-items-center rounded-full transition-transform group-hover:-translate-y-1 group-hover:translate-x-1">
                        <ArrowUpRight className="h-4 w-4 text-cyan" />
                      </span>
                    )}
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {p.stack.slice(0, 5).map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-border bg-white/5 px-3 py-1 text-[0.7rem] text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => setOpen(p)}
                      className="inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-brand)] px-4 py-2 text-xs font-semibold text-primary-foreground"
                    >
                      <Layers className="h-3.5 w-3.5" /> Case study
                    </button>
                    {p.links.github && (
                      <a
                        href={p.links.github}
                        target="_blank"
                        rel="noreferrer"
                        className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs hover:border-cyan/50"
                      >
                        <Github className="h-3.5 w-3.5" /> GitHub
                      </a>
                    )}
                    {p.slug !== "student-performance" && p.links.demo && (
                      <a
                        href={p.links.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs hover:border-cyan/50"
                      >
                        <ExternalLink className="h-3.5 w-3.5" /> Live demo
                      </a>
                    )}
                  </div>
                </div>
              </GlassCard>
            </TiltCard>
          </Reveal>
        ))}
      </div>

      <AnimatePresence>
        {open && <CaseStudy project={open} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </Section>
  );
}
