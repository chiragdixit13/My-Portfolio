import { CalendarDays, GraduationCap, Trophy } from "lucide-react";
import { education } from "@/data/portfolio";
import { GlassCard, Reveal, Section } from "@/components/ui-kit";

export function Education() {
  return (
    <Section
      id="education"
      eyebrow="Education"
      title={
        <>
          The <span className="text-gradient">academic track</span>
        </>
      }
      description="Formal grounding in computer science, sharpened by projects shipped alongside every semester."
    >
      <div className="relative">
        <div className="absolute top-0 bottom-0 left-4 hidden w-px bg-gradient-to-b from-cyan/60 via-primary/30 to-transparent md:block" />
        <div className="space-y-8">
          {education.map((e, i) => (
            <Reveal key={e.course} delay={i * 0.1}>
              <div className="relative md:pl-16">
                <span className="absolute top-8 left-[0.32rem] hidden h-5 w-5 rounded-full border border-cyan/60 bg-background md:grid md:place-items-center">
                  <span className="h-2 w-2 rounded-full bg-cyan" />
                </span>
                <GlassCard className="group grid gap-0 md:grid-cols-[0.9fr_1.4fr]">
                  <div className="relative overflow-hidden md:min-h-[16rem]">
                    <img
                      src={e.photo}
                      alt={e.institute}
                      loading="lazy"
                      width={1280}
                      height={720}
                      className="h-56 w-full object-cover transition-transform duration-[900ms] group-hover:scale-110 md:h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                  </div>
                  <div className="p-7">
                    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
                      <div className="min-w-0">
                        <h3 className="text-xl leading-snug font-semibold text-balance">
                          {e.course}
                        </h3>
                        <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                          <GraduationCap className="h-4 w-4 shrink-0 text-cyan" />
                          <span className="truncate">{e.institute}</span>
                        </p>
                      </div>
                      <span className="glass shrink-0 rounded-full px-3 py-1.5 font-mono text-[0.7rem] text-muted-foreground">
                        <CalendarDays className="mr-1.5 inline h-3 w-3" />
                        {e.years}
                      </span>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-3">
                      <span className="glass rounded-xl px-4 py-2 text-xs">
                        CGPA <b className="text-gradient ml-1">{e.cgpa}</b>
                      </span>
                      <span className="glass rounded-xl px-4 py-2 text-xs">
                        Percentage <b className="text-gradient ml-1">{e.percentage}</b>
                      </span>
                    </div>

                    <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                      {e.description}
                    </p>

                    <ul className="mt-5 space-y-2">
                      {e.achievements.map((a) => (
                        <li key={a} className="flex gap-2.5 text-sm text-muted-foreground">
                          <Trophy className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan" />
                          {a}
                        </li>
                      ))}
                    </ul>
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
