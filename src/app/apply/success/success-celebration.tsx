"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const confettiColors = ["#F59E0B", "#22C55E", "#0D9488", "#FBBF24", "#D97706"];

function ConfettiPiece({ delay, x, color }: { delay: number; x: number; color: string }) {
  return (
    <motion.div
      className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full"
      style={{ backgroundColor: color }}
      initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      animate={{
        opacity: [1, 1, 0],
        x: x,
        y: [0, -80 - Math.random() * 40, 60],
        scale: [0, 1.2, 0.6],
        rotate: [0, 180 + Math.random() * 360],
      }}
      transition={{
        duration: 1.2,
        delay: delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    />
  );
}

export function SuccessCelebration() {
  const pieces = Array.from({ length: 12 }, (_, i) => ({
    delay: 0.3 + i * 0.04,
    x: (i % 2 === 0 ? 1 : -1) * (20 + Math.random() * 50),
    color: confettiColors[i % confettiColors.length],
  }));

  return (
    <div className="relative flex h-20 w-20 items-center justify-center mx-auto mb-6">
      {/* Confetti burst */}
      {pieces.map((piece, i) => (
        <ConfettiPiece key={i} {...piece} />
      ))}

      {/* Glow ring */}
      <motion.div
        className="absolute inset-0 rounded-full bg-success/10"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: [0.5, 1.4, 1], opacity: [0, 0.4, 0.15] }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Icon container */}
      <motion.div
        className="relative flex h-20 w-20 items-center justify-center rounded-full bg-success/10"
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 15,
          delay: 0.1,
        }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 300, damping: 20 }}
        >
          <CheckCircle2 className="h-10 w-10 text-success" />
        </motion.div>
      </motion.div>
    </div>
  );
}
