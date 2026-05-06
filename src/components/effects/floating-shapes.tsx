"use client";

import { motion } from "framer-motion";

export function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {/* Amber glow - top right */}
      <motion.div
        className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-amber/10 blur-3xl"
        animate={{
          y: [0, -30, 0],
          x: [0, 20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {/* Teal glow - bottom left */}
      <motion.div
        className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-teal/8 blur-3xl"
        animate={{
          y: [0, 40, 0],
          x: [0, -20, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
        }}
      />
      {/* Small accent - center */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-40 h-40 rounded-full bg-amber/5 blur-2xl"
        animate={{
          y: [0, -50, 0],
          x: [0, 30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      />
    </div>
  );
}
