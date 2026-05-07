"use client";

import { motion } from "framer-motion";

interface GlowingBlobProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  color?: "indigo" | "violet" | "sky" | "rose";
  delay?: number;
}

const sizeMap = {
  sm: "w-32 h-32",
  md: "w-64 h-64",
  lg: "w-96 h-96",
};

const colorMap = {
  indigo: "from-indigo-500/30 to-indigo-600/20",
  violet: "from-violet-500/30 to-violet-600/20",
  sky: "from-sky-500/30 to-sky-600/20",
  rose: "from-rose-500/30 to-rose-600/20",
};

export function GlowingBlob({
  className,
  size = "md",
  color = "indigo",
  delay = 0,
}: GlowingBlobProps) {
  return (
    <motion.div
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.4, 0.6, 0.4],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        repeatType: "loop",
        delay,
        ease: "easeInOut",
      }}
      className={`
        absolute rounded-full blur-3xl
        bg-gradient-to-br ${colorMap[color]}
        ${sizeMap[size]}
        ${className}
      `}
    />
  );
}
