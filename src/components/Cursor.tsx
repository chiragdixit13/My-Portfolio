import { useEffect, useRef, useState } from "react";

/** Premium glow cursor with magnetic hover states. Disabled on touch devices. */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let raf = 0;
    let scale = 1;
    let target = 1;

    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const el = (e.target as HTMLElement | null)?.closest(
        "a,button,[data-cursor],input,textarea",
      );
      target = el ? 2.1 : 1;
    };

    const loop = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      scale += (target - scale) * 0.12;
      if (dot.current) dot.current.style.transform = `translate3d(${x - 3}px, ${y - 3}px, 0)`;
      if (ring.current)
        ring.current.style.transform = `translate3d(${rx - 20}px, ${ry - 20}px, 0) scale(${scale.toFixed(3)})`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", move, { passive: true });
    loop();
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[90] hidden md:block">
      <div
        ref={ring}
        className="absolute top-0 left-0 h-10 w-10 rounded-full border border-cyan/50 opacity-70 mix-blend-screen"
        style={{ boxShadow: "0 0 28px 6px color-mix(in oklab, var(--cyan) 22%, transparent)" }}
      />
      <div ref={dot} className="absolute top-0 left-0 h-1.5 w-1.5 rounded-full bg-cyan" />
    </div>
  );
}
