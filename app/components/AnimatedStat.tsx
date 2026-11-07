"use client";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

export function AnimatedStat({ value, prefix, suffix, label }: { value: number; prefix?: string; suffix?: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    const start = performance.now();
    const duration = 1200;
    const tick = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(value * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  return (
    <div ref={ref} className="rounded-lg bg-white p-5 shadow-soft dark:bg-white/10">
      <div className="text-3xl font-black text-brand-green dark:text-brand-light">
        {prefix}{count.toLocaleString("fr-FR")}{suffix}
      </div>
      <p className="mt-2 text-sm font-semibold text-slate-600 dark:text-slate-300">{label}</p>
    </div>
  );
}
