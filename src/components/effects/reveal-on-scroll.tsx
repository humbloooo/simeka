"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface RevealOnScrollProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  scale?: number;
  distance?: number;
}

const directionOffsets = {
  up: { x: 0, y: 1 },
  down: { x: 0, y: -1 },
  left: { x: 1, y: 0 },
  right: { x: -1, y: 0 },
};

export function RevealOnScroll({
  children,
  className,
  delay = 0,
  direction = "up",
  scale = 1,
  distance = 40,
}: RevealOnScrollProps) {
  const offset = directionOffsets[direction];

  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        x: offset.x * distance,
        y: offset.y * distance,
        scale,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
      }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
