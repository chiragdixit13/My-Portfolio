import { BadgeCheck, Briefcase } from "lucide-react";
import { experience } from "@/data/portfolio";
import { GlassCard, Reveal, Section } from "@/components/ui-kit";

export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title={
        <>
          Internships that <span className="text-gradient">shipped something</span>
        </>
      }
      description="Hands-on programmes across full stack engineering and core Java."
    >
      <div className="relative">
        <div className="absolute top-0 bottom-0 left-4 hidden w-px bg-gradient-to-b from-violet/60 via-primary/30 to-transparent md:block" />
        <div className="space-y-6">
          {experience.map((x, i) => (
            <Reveal key={x.role} delay={i * 0.09}>
              <div className="relative md:pl-16">
                <span className="absolute top-9 left-[0.32rem] hidden h-5 w-5 place-items-center rounded-full border border-violet/60 bg-background md:grid">
                  <Briefcase className="h-2.5 w-2.5 text-violet" />
                </span>
                <GlassCard className="group p-7 transition-transform duration-500 hover:-translate-y-1 hover:border-cyan/40">
                  <div className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-4 sm:grid-cols-[auto_minmax(0,1fr)_auto]">
                    <img
                      src={x.logo}
                      alt={x.company}
                      loading="lazy"
                      width={96}
                      height={96}
                      className="h-12 w-12 shrink-0 rounded-xl object-cover ring-1 ring-border"
                    />
                    <div className="min-w-0">
                      <h3 className="text-lg leading-snug font-semibold text-balance">{x.role}</h3>
                      <p className="truncate text-sm text-muted-foreground">{x.company}</p>
                    </div>
                    <span className="glass col-span-2 w-fit rounded-full px-3 py-1.5 font-mono text-[0.7rem] text-muted-foreground sm:col-span-1">
                      {x.duration}
                    </span>
                  </div>

                  <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                    {x.responsibilities.map((r) => (
                      <li key={r} className="flex gap-2.5 text-sm text-muted-foreground">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[image:var(--gradient-brand)]" />
                        {r}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-2 border-t border-border pt-5">
                    {x.achievements.map((a) => (
                      <span
                        key={a}
                        className="inline-flex items-center gap-2 rounded-full border border-cyan/25 bg-cyan/8 px-3 py-1.5 text-xs text-muted-foreground"
                      >
                        <BadgeCheck className="h-3.5 w-3.5 text-cyan" /> {a}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
