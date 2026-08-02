import { AnimatePresence, motion } from "motion/react";
import { Quote, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { gitaQuotes, krishnaArt } from "@/data/portfolio";
import { Reveal, Section } from "@/components/ui-kit";

export function Inspiration() {
  const [i, setI] = useState(0);

  useEffect(() => {
    setI(Math.floor(Math.random() * gitaQuotes.length));
  }, []);

  const q = gitaQuotes[i]!;

  return (
    <Section id="inspiration" eyebrow="Inspiration">
      <Reveal>
        <div className="glass relative overflow-hidden rounded-[2rem]">
          <div className="grid gap-0 md:grid-cols-[0.85fr_1.15fr]">
            <div className="relative min-h-64 overflow-hidden">
              <img
                src={krishnaArt}
                alt="Krishna playing the flute — illustration"
                loading="lazy"
                width={1200}
                height={1200}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-background/20 to-background md:bg-gradient-to-r" />
            </div>

            <div className="relative p-8 sm:p-12">
              <svg
                aria-hidden
                viewBox="0 0 120 240"
                className="pointer-events-none absolute -top-6 right-4 h-56 w-28 opacity-25"
              >
                <defs>
                  <linearGradient id="feather" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="oklch(0.82 0.14 200)" />
                    <stop offset="100%" stopColor="oklch(0.66 0.2 300)" />
                  </linearGradient>
                </defs>
                <motion.path
                  d="M60 235 C60 160 50 120 60 60"
                  stroke="url(#feather)"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.6 }}
                />
                <ellipse cx="60" cy="45" rx="26" ry="42" fill="url(#feather)" opacity="0.35" />
                <ellipse cx="60" cy="42" rx="13" ry="20" fill="url(#feather)" opacity="0.6" />
                <circle cx="60" cy="40" r="6" fill="oklch(0.66 0.2 300)" />
              </svg>

              <Quote className="mb-6 h-7 w-7 text-cyan" />

              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={i}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.6 }}
                >
                  <p className="font-display text-2xl leading-snug font-medium text-balance sm:text-3xl">
                    “{q.sanskrit}”
                  </p>
                  <p className="mt-4 text-base text-muted-foreground sm:text-lg">— {q.meaning}</p>
                  <footer className="mt-6 font-mono text-xs tracking-widest text-cyan uppercase">
                    {q.chapter}
                  </footer>
                </motion.blockquote>
              </AnimatePresence>

              <button
                onClick={() => setI((n) => (n + 1) % gitaQuotes.length)}
                className="glass mt-8 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs hover:border-cyan/50"
              >
                <RefreshCw className="h-3.5 w-3.5 text-cyan" /> Another verse
              </button>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
