import portrait2 from "@/assets/portrait2.png";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import {
  ArrowDown,
  Download,
  Eye,
  Github,
  Linkedin,
  Mail,
  PlayCircle,
  Sparkles,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { profile, stats } from "@/data/portfolio";
import { Counter, MagneticButton } from "@/components/ui-kit";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

function Typewriter({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index % words.length] ?? "";
    const delay = deleting ? 45 : text === word ? 1500 : 85;
    const t = window.setTimeout(() => {
      if (!deleting && text === word) return setDeleting(true);
      if (deleting && text === "") {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
        return;
      }
      setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
    }, delay);
    return () => window.clearTimeout(t);
  }, [text, deleting, index, words]);

  return (
    <span className="text-gradient">
      {text}
      <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.12em] animate-pulse bg-cyan" />
    </span>
  );
}

export function Hero({
  onResume,
  onTour,
}: {
  onResume: () => void;
  onTour: () => void;
}) {
  const [isPortraitHovered, setIsPortraitHovered] = useState(false);
  const [selectedPortrait, setSelectedPortrait] = useState<string | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 60, damping: 20 });
  const py = useSpring(my, { stiffness: 60, damping: 20 });
  const rotX = useTransform(py, [-0.5, 0.5], [8, -8]);
  const rotY = useTransform(px, [-0.5, 0.5], [-10, 10]);
  const driftX = useTransform(px, [-0.5, 0.5], [-18, 18]);
  const driftY = useTransform(py, [-0.5, 0.5], [-14, 14]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my]);

  const name = profile.name.split("");

  return (
    <section
      id="hero"
      data-section="hero"
      className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-5 pt-32 pb-20 sm:px-8"
    >
      <div className="mx-auto w-full max-w-5xl">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="glass mb-7 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs text-muted-foreground"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
            </span>
            Open to AI / ML & Software Engineering roles
          </motion.div>

          <div className="group relative mb-3 flex items-start justify-between gap-5 sm:gap-6">
            <div className="min-w-0 flex-1">
              <h1 className="mt-4 font-display text-[clamp(2.75rem,8vw,5.5rem)] leading-[0.9] font-semibold sm:mt-2">
                <span className="sr-only">{profile.name}</span>
                <span aria-hidden className="flex flex-wrap">
                  {name.map((ch, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 40, rotateX: -60 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      transition={{ delay: 0.25 + i * 0.035, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      className="inline-block"
                    >
                      {ch === " " ? "\u00A0" : ch}
                    </motion.span>
                  ))}
                </span>
              </h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-2 font-display text-2xl font-medium sm:text-3xl md:text-4xl"
              >
                <Typewriter words={profile.typingRoles} />
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.95, duration: 0.7 }}
                className="mt-2 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
              >
                {profile.tagline} I design, train and ship machine learning systems — and the
                interfaces that make them useful.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="relative ml-auto shrink-0 -translate-y-7 sm:mt-0 sm:translate-x-2"
              whileHover={{ y: -6, rotate: -1.5, scale: 1.06 }}
              onHoverStart={() => setIsPortraitHovered(true)}
              onHoverEnd={() => setIsPortraitHovered(false)}
            >
              <button
                type="button"
                onClick={() => setSelectedPortrait(profile.portrait)}
                aria-label="View portrait image in larger size"
                className="group block cursor-pointer focus:outline-none"
              >
                <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle,_rgba(34,211,238,0.48),_transparent_70%)] blur-2xl opacity-100 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-1.75 shadow-[0_14px_36px_rgba(34,211,238,0.22)] backdrop-blur-sm">
                  <img
                    src={isPortraitHovered ? portrait2 : profile.portrait}
                    alt={`${profile.name} portrait`}
                    width={360}
                    height={450}
                    className="aspect-[4/5] w-[10rem] rounded-[1.35rem] object-cover object-center transition-transform duration-500 ease-out sm:w-[12rem] md:w-[13.5rem] lg:w-[15rem] xl:w-[16.5rem] group-hover:scale-[1.05]"
                  />
                </div>
              </button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.7 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <MagneticButton variant="primary" onClick={onTour}>
              <PlayCircle className="h-4 w-4" /> Take a Portfolio Tour
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
            <MagneticButton variant="outline" onClick={onResume} className="px-5">
              <Eye className="h-4 w-4" /> View Resume
            </MagneticButton>
            <MagneticButton
              variant="outline"
              onClick={() =>
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-5"
            >
              <Sparkles className="h-4 w-4" /> View Projects
            </MagneticButton>
            <MagneticButton
              variant="outline"
              onClick={() =>
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-5"
            >
              <Mail className="h-4 w-4" /> Hire Me
            </MagneticButton>
            <MagneticButton
              as="a"
              href={profile.socials.github}
              target="_blank"
              variant="outline"
              ariaLabel="GitHub"
              className="px-4"
            >
              <Github className="h-4 w-4" />
            </MagneticButton>
            <MagneticButton
              as="a"
              href={profile.socials.linkedin}
              target="_blank"
              variant="outline"
              ariaLabel="LinkedIn"
              className="px-4"
            >
              <Linkedin className="h-4 w-4" />
            </MagneticButton>
          </motion.div>
        </div>

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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3, duration: 0.8 }}
        className="mt-20 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4"
      >
        {stats.map((s) => (
          <div
            key={s.label}
            className="glass rounded-2xl p-5 transition-colors hover:border-cyan/40"
          >
            <p className="font-display text-3xl font-semibold text-gradient sm:text-4xl">
              <Counter value={s.value} suffix={s.suffix} decimals={s.decimals ?? 0} />
            </p>
            <p className="mt-1 text-xs tracking-wide text-muted-foreground uppercase">{s.label}</p>
          </div>
        ))}
      </motion.div>

      <motion.button
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        aria-label="Scroll to about section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="mx-auto mt-14 flex flex-col items-center gap-2 text-xs tracking-[0.25em] text-muted-foreground uppercase"
      >
        Scroll
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-4 w-4" />
        </motion.span>
      </motion.button>
    </section>
  );
}
