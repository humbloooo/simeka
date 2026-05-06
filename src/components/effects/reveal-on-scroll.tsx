"use client";

import type { ReactNode } from "react";

interface RevealOnScrollProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  scale?: number;
  distance?: number;
}

export function RevealOnScroll({
  children,
  className,
  delay = 0,
  direction = "up",
  scale = 1,
  distance = 40,
}: RevealOnScrollProps) {
  return (
    <div className={className} data-reveal-delay={delay} data-reveal-direction={direction} data-reveal-scale={scale} data-reveal-distance={distance}>
      {children}
    </div>
  );
}
