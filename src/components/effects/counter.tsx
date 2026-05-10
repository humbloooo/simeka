"use client";

import { useEffect, useRef, useState } from "react";

interface CounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

export function Counter({ target, suffix = "", prefix = "", duration = 1200 }: CounterProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [finished, setFinished] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const decimals = Number.isInteger(target) ? 0 : 1;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const start = performance.now();

          function animate(now: number) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const next = eased * target;
            setCount(Number(next.toFixed(decimals)));
            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setFinished(true);
            }
          }

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration, hasAnimated, decimals]);

  return (
    <span ref={ref} className={`tabular-nums inline-block ${finished ? "animate-counter-pop" : ""}`}>
      {prefix}{count}{suffix}
    </span>
  );
}
