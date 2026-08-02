import { motion, useInView, useMotionValue, useSpring } from "motion/react";
import {
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
}: {
  id: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      data-section={id}
      className={cn("relative mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 md:py-32", className)}
    >
      {(eyebrow || title) && (
        <Reveal className="mb-14 max-w-3xl">
          {eyebrow && (
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-glass px-4 py-1.5 text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
              {eyebrow}
            </span>
          )}
          {title && (
            <h2 className="text-4xl leading-[1.05] font-semibold text-balance sm:text-5xl md:text-6xl">
              {title}
            </h2>
          )}
          {description && (
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {description}
            </p>
          )}
        </Reveal>
      )}
      {children}
    </section>
  );
}

export function GlassCard({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn(
        "glass relative overflow-hidden rounded-3xl transition-colors duration-300",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function TiltCard({
  children,
  className,
  intensity = 8,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const ry = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });

  return (
    <motion.div
      ref={ref}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        ry.set(px * intensity * 2);
        rx.set(-py * intensity * 2);
      }}
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
      className={cn("will-change-transform", className)}
    >
      {children}
    </motion.div>
  );
}

export function MagneticButton({
  children,
  className,
  as = "button",
  href,
  onClick,
  variant = "ghost",
  target,
  ariaLabel,
  type = "button",
}: {
  children: ReactNode;
  className?: string;
  as?: "button" | "a";
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost" | "outline";
  target?: string;
  ariaLabel?: string;
  type?: "button" | "submit";
}) {
  const ref = useRef<HTMLElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 250, damping: 18 });
  const y = useSpring(useMotionValue(0), { stiffness: 250, damping: 18 });

  const base =
    "group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none";
  const styles = {
    primary:
      "bg-[image:var(--gradient-brand)] text-primary-foreground shadow-[var(--shadow-glow-strong)] hover:brightness-110",
    outline: "border border-border bg-glass text-foreground hover:border-cyan/60 hover:bg-white/8",
    ghost: "text-muted-foreground hover:text-foreground",
  }[variant];

  const Tag = motion[as] as typeof motion.button;

  return (
    <Tag
      // @ts-expect-error polymorphic ref
      ref={ref}
      href={href}
      target={target}
      rel={target === "_blank" ? "noreferrer noopener" : undefined}
      onClick={onClick}
      type={as === "button" ? type : undefined}
      aria-label={ariaLabel}
      data-cursor="magnetic"
      style={{ x, y }}
      onMouseMove={(e: React.MouseEvent) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
        y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className={cn(base, styles, className)}
    >
      {children}
    </Tag>
  );
}

export function Counter({
  value,
  decimals = 0,
  suffix = "",
}: {
  value: number;
  decimals?: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1600;
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      setDisplay(value * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}
