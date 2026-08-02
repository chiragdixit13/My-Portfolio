import { AnimatePresence, motion } from "motion/react";
import { Download, Eye, X } from "lucide-react";
import { useState } from "react";
import { certificates } from "@/data/portfolio";
import { GlassCard, Reveal, Section } from "@/components/ui-kit";

export function Certificates() {
  const [open, setOpen] = useState<number | null>(null);
  const active = open === null ? null : certificates[open];

  return (
    <Section
      id="certificates"
      eyebrow="Certificates"
      title={
        <>
          Verified <span className="text-gradient">credentials</span>
        </>
      }
      description="Every certificate is viewable and downloadable — add more anytime from the central data file."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {certificates.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.07}>
            <GlassCard className="group h-full hover:border-cyan/40">
              <button
                onClick={() => setOpen(i)}
                className="relative block w-full overflow-hidden"
                aria-label={`Preview ${c.title}`}
              >
                <img
                  src={c.image}
                  alt={c.title}
                  loading="lazy"
                  width={1200}
                  height={850}
                  className="aspect-[4/3] w-full bg-white object-contain transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute inset-0 grid place-items-center bg-background/70 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                  <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs">
                    <Eye className="h-3.5 w-3.5 text-cyan" /> Preview
                  </span>
                </span>
              </button>
              <div className="p-6">
                <h3 className="text-base leading-snug font-semibold text-balance">{c.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{c.org}</p>
                <p className="mt-0.5 font-mono text-xs text-muted-foreground">{c.date}</p>
                <div className="mt-5 flex gap-2">
                  <button
                    onClick={() => setOpen(i)}
                    className="inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-brand)] px-4 py-2 text-xs font-semibold text-primary-foreground"
                  >
                    <Eye className="h-3.5 w-3.5" /> View
                  </button>
                  <a
                    href={c.file}
                    download
                    className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs hover:border-cyan/50"
                  >
                    <Download className="h-3.5 w-3.5" /> Download
                  </a>
                </div>
              </div>
            </GlassCard>
          </Reveal>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[110] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            role="dialog"
            aria-modal="true"
            aria-label={active.title}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.94, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0 }}
              className="glass w-full max-w-4xl overflow-hidden rounded-3xl"
            >
              <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{active.title}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {active.org} · {active.date}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  <a
                    href={active.file}
                    download
                    aria-label="Download certificate"
                    className="rounded-full p-2 text-muted-foreground hover:bg-white/8 hover:text-foreground"
                  >
                    <Download className="h-4 w-4" />
                  </a>
                  <button
                    onClick={() => setOpen(null)}
                    aria-label="Close preview"
                    className="rounded-full p-2 text-muted-foreground hover:bg-white/8 hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="max-h-[78vh] overflow-auto bg-black/30 p-4">
                {active.type === "image" ? (
                  <img
                    src={active.file}
                    alt={active.title}
                    className="mx-auto w-full rounded-xl bg-white object-contain"
                  />
                ) : (
                  <object
                    data={active.file}
                    type="application/pdf"
                    className="h-[70vh] w-full rounded-xl"
                    aria-label={active.title}
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
