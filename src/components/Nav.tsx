import { motion, useScroll, useSpring } from "motion/react";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { sections, profile } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export function Nav() {
  const [active, setActive] = useState("hero");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      obs.disconnect();
    };
  }, []);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <motion.div
        style={{ scaleX: bar }}
        className="fixed top-0 left-0 z-[80] h-0.5 w-full origin-left bg-[image:var(--gradient-brand)]"
      />
      <header
        className={cn(
          "fixed top-0 right-0 left-0 z-[70] transition-all duration-500",
          scrolled ? "py-3" : "py-6",
        )}
      >
        <nav className="mx-auto flex max-w-7xl items-center gap-4 px-5 sm:px-8">
          <button
            onClick={() => go("hero")}
            className="font-display flex min-w-0 items-center gap-2 text-sm font-semibold tracking-tight"
            aria-label="Back to top"
          >
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-[image:var(--gradient-brand)] text-xs font-bold text-primary-foreground">
              CD
            </span>
            <span className="truncate">{profile.name}</span>
          </button>

          <div
            className={cn(
              "glass mx-auto hidden items-center gap-1 rounded-full px-2 py-1.5 lg:flex",
              !scrolled && "border-transparent bg-transparent backdrop-blur-none",
            )}
          >
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => go(s.id)}
                className={cn(
                  "relative rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors",
                  active === s.id ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {active === s.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-white/10"
                    transition={{ type: "spring", stiffness: 320, damping: 30 }}
                  />
                )}
                <span className="relative">{s.label}</span>
              </button>
            ))}
          </div>

          <button
            onClick={() => go("contact")}
            className="ml-auto hidden rounded-full bg-[image:var(--gradient-brand)] px-5 py-2 text-xs font-semibold text-primary-foreground shadow-[var(--shadow-glow-strong)] lg:inline-flex"
          >
            Hire me
          </button>

          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="glass ml-auto rounded-full p-2.5 lg:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </nav>

        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass mx-5 mt-3 grid grid-cols-2 gap-1 rounded-3xl p-3 lg:hidden"
          >
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => go(s.id)}
                className="rounded-2xl px-4 py-2.5 text-left text-sm text-muted-foreground hover:bg-white/8 hover:text-foreground"
              >
                {s.label}
              </button>
            ))}
          </motion.div>
        )}
      </header>
    </>
  );
}
