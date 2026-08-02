import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let p = 0;
    const id = window.setInterval(() => {
      p = Math.min(100, p + Math.random() * 14 + 5);
      setProgress(p);
      if (p >= 100) {
        window.clearInterval(id);
        window.setTimeout(() => setDone(true), 480);
      }
    }, 130);
    return () => window.clearInterval(id);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          exit={{ opacity: 0, filter: "blur(12px)" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[120] flex flex-col items-center justify-center bg-background"
        >
          <div className="bg-noise absolute inset-0 opacity-[0.04]" />
          <motion.svg
            width="96"
            height="96"
            viewBox="0 0 100 100"
            className="mb-10"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <defs>
              <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="oklch(0.68 0.17 255)" />
                <stop offset="50%" stopColor="oklch(0.82 0.14 200)" />
                <stop offset="100%" stopColor="oklch(0.66 0.2 300)" />
              </linearGradient>
            </defs>
            {[
              [50, 14],
              [18, 40],
              [82, 40],
              [32, 82],
              [68, 82],
            ].map(([cx, cy], i) => (
              <motion.circle
                key={i}
                cx={cx}
                cy={cy}
                r="5"
                fill="url(#lg)"
                animate={{ opacity: [0.35, 1, 0.35] }}
                transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.22 }}
              />
            ))}
            {[
              [50, 14, 18, 40],
              [50, 14, 82, 40],
              [18, 40, 32, 82],
              [82, 40, 68, 82],
              [18, 40, 68, 82],
              [82, 40, 32, 82],
            ].map(([x1, y1, x2, y2], i) => (
              <motion.line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="url(#lg)"
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0.2 }}
                animate={{ pathLength: 1, opacity: 0.7 }}
                transition={{ duration: 1.1, delay: 0.1 * i }}
              />
            ))}
          </motion.svg>

          <p className="font-display text-lg tracking-[0.35em] text-muted-foreground uppercase">
            Chirag Dixit
          </p>
          <div className="mt-6 h-px w-56 overflow-hidden bg-white/10 sm:w-72">
            <div
              className="h-full bg-[image:var(--gradient-brand)] transition-[width] duration-200 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-4 font-mono text-xs text-muted-foreground tabular-nums">
            {Math.round(progress)}% · initialising neural interface
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
