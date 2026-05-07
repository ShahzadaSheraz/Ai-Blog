"use client";

import { motion } from "framer-motion";

interface AnimatedGradientProps {
  className?: string;
}

export function AnimatedGradient({ className }: AnimatedGradientProps) {
  return (
    <motion.div
      className={`absolute inset-0 opacity-60 ${className}`}
      animate={{
        backgroundPosition: ["0% 0%", "100% 100%"],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "linear",
      }}
      style={{
        backgroundSize: "200% 200%",
      }}
    />
  );
}
