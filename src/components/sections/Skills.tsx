import { motion } from "motion/react";
import { Braces, Boxes, Database, Layers } from "lucide-react";
import { skillGroups } from "@/data/portfolio";
import { GlassCard, Reveal, Section, TiltCard } from "@/components/ui-kit";

const icons = [Braces, Boxes, Layers, Database];

function Ring({ value, label }: { value: number; label: string }) {
  const c = 2 * Math.PI * 26;
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative h-16 w-16">
        <svg viewBox="0 0 60 60" className="h-full w-full -rotate-90">
          <circle cx="30" cy="30" r="26" fill="none" stroke="oklch(1 0 0 / 10%)" strokeWidth="4" />
          <motion.circle
            cx="30"
            cy="30"
            r="26"
            fill="none"
            stroke="url(#ringGrad)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={c}
            initial={{ strokeDashoffset: c }}
            whileInView={{ strokeDashoffset: c - (c * value) / 100 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          />
          <defs>
            <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="oklch(0.68 0.17 255)" />
              <stop offset="100%" stopColor="oklch(0.82 0.14 200)" />
            </linearGradient>
          </defs>
        </svg>
        <span className="absolute inset-0 grid place-items-center font-mono text-xs">{value}</span>
      </div>
      <span className="text-[0.7rem] text-muted-foreground">{label}</span>
    </div>
  );
}

export function Skills() {
  const highlights = skillGroups.flatMap((g) => g.skills).slice(0, 5);

  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title={
        <>
          A stack built for <span className="text-gradient">intelligent products</span>
        </>
      }
      description="From data wrangling and model selection to production interfaces — these are the tools I use every week."
    >
      <div className="grid gap-5 md:grid-cols-2">
        {skillGroups.map((group, gi) => {
          const Icon = icons[gi % icons.length]!;
          return (
            <Reveal key={group.title} delay={gi * 0.08}>
              <TiltCard>
                <GlassCard className="group h-full p-7 hover:border-cyan/40">
                  <div
                    className="pointer-events-none absolute -top-24 -right-20 h-56 w-56 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: "var(--gradient-halo)" }}
                  />
                  <div className="relative">
                    <div className="mb-5 flex items-center gap-3">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[image:var(--gradient-brand)] text-primary-foreground">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div className="min-w-0">
                        <h3 className="truncate text-lg font-semibold">{group.title}</h3>
                        <p className="truncate text-xs text-muted-foreground">{group.blurb}</p>
                      </div>
                    </div>

                    <ul className="space-y-3.5">
                      {group.skills.map((s, si) => (
                        <li key={s.name}>
                          <div className="mb-1.5 flex items-center justify-between text-xs">
                            <span className="font-medium">{s.name}</span>
                            <span className="font-mono text-muted-foreground">{s.level}%</span>
                          </div>
                          <div className="h-1.5 overflow-hidden rounded-full bg-white/8">
                            <motion.div
                              className="h-full rounded-full bg-[image:var(--gradient-brand)]"
                              initial={{ width: 0 }}
                              whileInView={{ width: `${s.level}%` }}
                              viewport={{ once: true }}
                              transition={{
                                duration: 1.1,
                                delay: si * 0.06,
                                ease: [0.22, 1, 0.36, 1],
                              }}
                            />
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </GlassCard>
              </TiltCard>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={0.1}>
        <GlassCard className="mt-6 flex flex-wrap items-center justify-around gap-6 p-7">
          {highlights.map((s) => (
            <Ring key={s.name} value={s.level} label={s.name} />
          ))}
        </GlassCard>
      </Reveal>
    </Section>
  );
}
