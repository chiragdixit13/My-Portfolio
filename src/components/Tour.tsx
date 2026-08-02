import { AnimatePresence, motion } from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  Gauge,
  Pause,
  Play,
  X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { sections, tourScript } from "@/data/portfolio";

const splitSentences = (t: string) =>
  t
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);

export function Tour({ active, onExit }: { active: boolean; onExit: () => void }) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [line, setLine] = useState(0);
  const programmatic = useRef(false);
  const timer = useRef<number | null>(null);

  const section = sections[index]!;
  const sentences = splitSentences(tourScript[section.id] ?? "");

  const stopSpeech = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    if (timer.current) {
      window.clearTimeout(timer.current);
      timer.current = null;
    }
  }, []);

  // Highlight + scroll to the active section
  useEffect(() => {
    if (!active) return;
    document.querySelectorAll("[data-section]").forEach((el) => el.classList.remove("tour-active"));
    const el = document.getElementById(section.id);
    if (!el) return;
    el.classList.add("tour-active");
    programmatic.current = true;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    const t = window.setTimeout(() => (programmatic.current = false), 1400);
    return () => window.clearTimeout(t);
  }, [active, index, section.id]);

  // Narration
  useEffect(() => {
    if (!active || !playing) return;
    setLine(0);
    const supported = typeof window !== "undefined" && "speechSynthesis" in window;
    let cancelled = false;

    const advance = () => {
      if (cancelled) return;
      timer.current = window.setTimeout(() => {
        setIndex((i) => {
          if (i >= sections.length - 1) {
            setPlaying(false);
            return i;
          }
          return i + 1;
        });
      }, 1200 / speed);
    };

    if (!supported) {
      timer.current = window.setTimeout(advance, 6000 / speed);
      return () => {
        cancelled = true;
        stopSpeech();
      };
    }

    window.speechSynthesis.cancel();
    sentences.forEach((s, i) => {
      const u = new SpeechSynthesisUtterance(s);
      u.rate = 0.98 * speed;
      u.pitch = 1;
      u.onstart = () => !cancelled && setLine(i);
      if (i === sentences.length - 1) u.onend = () => !cancelled && advance();
      window.speechSynthesis.speak(u);
    });

    return () => {
      cancelled = true;
      stopSpeech();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, playing, index, speed]);

  // Pause when the user scrolls manually
  useEffect(() => {
    if (!active) return;
    const onManual = () => {
      if (programmatic.current) return;
      setPlaying(false);
      stopSpeech();
    };
    window.addEventListener("wheel", onManual, { passive: true });
    window.addEventListener("touchmove", onManual, { passive: true });
    return () => {
      window.removeEventListener("wheel", onManual);
      window.removeEventListener("touchmove", onManual);
    };
  }, [active, stopSpeech]);

  // Cleanup on exit
  useEffect(() => {
    if (active) return;
    stopSpeech();
    document.querySelectorAll("[data-section]").forEach((el) => el.classList.remove("tour-active"));
    setIndex(0);
    setPlaying(true);
  }, [active, stopSpeech]);

  const move = (delta: number) => {
    stopSpeech();
    setIndex((i) => Math.min(sections.length - 1, Math.max(0, i + delta)));
  };

  return (
    <AnimatePresence>
      {active && (
        <>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="glass fixed bottom-5 left-1/2 z-[100] w-[min(46rem,calc(100vw-2rem))] -translate-x-1/2 rounded-3xl p-4"
            role="region"
            aria-label="Portfolio tour controls"
          >
            <div className="mb-3 flex items-center gap-3">
              <span className="rounded-full bg-cyan/15 px-3 py-1 text-[0.65rem] tracking-[0.18em] text-cyan uppercase">
                {section.label}
              </span>
              <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-[image:var(--gradient-brand)]"
                  animate={{ width: `${((index + 1) / sections.length) * 100}%` }}
                  transition={{ duration: 0.6 }}
                />
              </div>
              <span className="font-mono text-[0.7rem] text-muted-foreground">
                {index + 1}/{sections.length}
              </span>
            </div>

            <div className="mb-4 min-h-14 rounded-2xl bg-black/25 px-4 py-3 text-sm leading-relaxed">
              {sentences.map((s, i) => (
                <span
                  key={i}
                  className={
                    i === line && playing
                      ? "text-foreground"
                      : "text-muted-foreground/55 transition-colors"
                  }
                >
                  {s}{" "}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                onClick={() => move(-1)}
                disabled={index === 0}
                className="glass rounded-full p-2.5 disabled:opacity-40"
                aria-label="Previous section"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => {
                  if (playing) stopSpeech();
                  setPlaying((p) => !p);
                }}
                className="inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-brand)] px-5 py-2.5 text-xs font-semibold text-primary-foreground"
              >
                {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                {playing ? "Pause" : "Resume"}
              </button>
              <button
                onClick={() => move(1)}
                disabled={index === sections.length - 1}
                className="glass rounded-full p-2.5 disabled:opacity-40"
                aria-label="Next section"
              >
                <ChevronRight className="h-4 w-4" />
              </button>

              <label className="glass ml-1 inline-flex items-center gap-2 rounded-full px-3 py-2 text-[0.7rem] text-muted-foreground">
                <Gauge className="h-3.5 w-3.5 text-cyan" />
                <input
                  type="range"
                  min={0.6}
                  max={1.6}
                  step={0.2}
                  value={speed}
                  onChange={(e) => setSpeed(Number(e.target.value))}
                  aria-label="Auto scroll speed"
                  className="w-20 accent-[oklch(0.82_0.14_200)]"
                />
                {speed.toFixed(1)}×
              </label>

              <button
                onClick={onExit}
                className="glass inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-xs hover:border-destructive/50"
              >
                <X className="h-3.5 w-3.5" /> Exit tour
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
