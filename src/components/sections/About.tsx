import portrait3 from "@/assets/portrait3.jpeg";
import { motion } from "motion/react";
import { Award, Download, Eye, GraduationCap, Rocket, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { profile } from "@/data/portfolio";
import { GlassCard, MagneticButton, Reveal, Section } from "@/components/ui-kit";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

const timeline = [
  {
    year: "2021",
    title: "Started B.Tech CSE",
    text: "Began Computer Science Engineering at Maharshi Dayanand University, Rohtak.",
    icon: GraduationCap,
  },
  {
    year: "2023",
    title: "Moved into Machine Learning",
    text: "Built first end-to-end regression pipelines with scikit-learn, pandas and seaborn.",
    icon: Sparkles,
  },
  {
    year: "2025",
    title: "Full stack + Java internships",
    text: "MERN and Java programmes with Vital Skills × Techkriti, IIT Kanpur.",
    icon: Rocket,
  },
  {
    year: "2026",
    title: "Generative AI analytics",
    text: "Tata GenAI Powered Data Analytics simulation via Forage — risk profiling and AI strategy.",
    icon: Award,
  },
];

export function About({ onResume }: { onResume: () => void }) {
  const [selectedPortrait, setSelectedPortrait] = useState<string | null>(null);

  return (
    <Section
      id="about"
      eyebrow="About"
      title={
        <>
          Engineer at the seam of <span className="text-gradient">data and product</span>
        </>
      }
      description="I don't stop at the notebook. Models only matter when someone can use them — so I build the pipeline, the evaluation and the interface."
    >
      <div className="space-y-10">
        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative mx-auto w-fit"
          >
            <button
              type="button"
              onClick={() => setSelectedPortrait(portrait3)}
              aria-label="View portrait in larger size"
              className="block cursor-pointer focus:outline-none"
            >
              <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle,_rgba(34,211,238,0.5),_transparent_70%)] blur-2xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-1.75 shadow-[0_14px_36px_rgba(34,211,238,0.22)] backdrop-blur-sm">
                <img
                  src={portrait3}
                  alt={`${profile.name} portrait alternative`}
                  width={360}
                  height={450}
                  className="aspect-[4/5] w-[10rem] rounded-[1.35rem] object-cover object-center sm:w-[12rem] md:w-[13.5rem] lg:w-[15rem] xl:w-[16.5rem]"
                />
              </div>
            </button>
          </motion.div>
        </div>

        <Dialog open={!!selectedPortrait} onOpenChange={(open) => !open && setSelectedPortrait(null)}>
          <DialogContent className="max-w-3xl border border-white/10 bg-[#070b14]/90 p-0 text-white shadow-[0_25px_80px_rgba(34,211,238,0.22)]">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
              <DialogTitle className="text-base font-medium">Portrait</DialogTitle>
              <button
                type="button"
                aria-label="Close portrait preview"
                onClick={() => setSelectedPortrait(null)}
                className="rounded-full p-2 text-muted-foreground hover:bg-white/5 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="p-4">
              <DialogDescription className="sr-only">Expanded portrait preview.</DialogDescription>
              {selectedPortrait && (
                <img
                  src={selectedPortrait}
                  alt={`${profile.name} portrait enlarged`}
                  className="max-h-[75vh] w-full rounded-2xl object-contain"
                />
              )}
            </div>
          </DialogContent>
        </Dialog>

        <div>
          {profile.intro.map((p, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <p className="mb-5 text-base leading-relaxed text-muted-foreground sm:text-lg">{p}</p>
            </Reveal>
          ))}

          <Reveal delay={0.15}>
            <div className="my-8 flex flex-wrap gap-2">
              {profile.lookingFor.map((r) => (
                <span
                  key={r}
                  className="glass rounded-full px-3.5 py-1.5 text-xs text-muted-foreground"
                >
                  {r}
                </span>
              ))}
            </div>
          </Reveal>

          <div className="relative mt-10 pl-6">
            <div className="absolute top-2 bottom-2 left-0 w-px bg-gradient-to-b from-cyan/70 via-primary/40 to-transparent" />
            {timeline.map((t, i) => (
              <Reveal key={t.year} delay={i * 0.08}>
                <div className="group relative mb-8 last:mb-0">
                  <motion.span
                    whileInView={{ scale: [0.4, 1] }}
                    viewport={{ once: true }}
                    className="absolute top-1.5 -left-[1.72rem] grid h-6 w-6 place-items-center rounded-full border border-cyan/50 bg-background"
                  >
                    <t.icon className="h-3 w-3 text-cyan" />
                  </motion.span>
                  <p className="font-mono text-xs text-cyan">{t.year}</p>
                  <h3 className="mt-1 text-lg font-semibold">{t.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <GlassCard className="mt-8 p-6">
              <h3 className="mb-4 text-sm tracking-[0.18em] text-muted-foreground uppercase">
                Achievements
              </h3>
              <ul className="space-y-3">
                {profile.achievements.map((a) => (
                  <li key={a} className="flex gap-3 text-sm text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[image:var(--gradient-brand)]" />
                    {a}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-7 flex flex-wrap gap-3">
              <MagneticButton variant="primary" onClick={onResume}>
                <Eye className="h-4 w-4" /> View Resume
              </MagneticButton>
              <MagneticButton
                variant="outline"
                as="a"
                href={profile.resumeUrl}
                target="_blank"
                className="px-5"
              >
                <Download className="h-4 w-4" /> Download Resume
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
