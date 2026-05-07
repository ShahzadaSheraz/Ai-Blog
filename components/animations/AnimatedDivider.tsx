"use client";

import { motion } from "framer-motion";

interface AnimatedDividerProps {
  className?: string;
  style?: "gradient" | "wave" | "dots";
}

export function AnimatedDivider({
  className,
  style = "gradient",
}: AnimatedDividerProps) {
  if (style === "wave") {
    return (
      <div className={`relative h-16 overflow-hidden ${className}`}>
        <svg
          viewBox="0 0 1200 60"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <motion.path
            d="M0,30 Q300,0 600,30 T1200,30 L1200,60 L0,60 Z"
            fill="url(#waveGradient)"
            animate={{
              d: [
                "M0,30 Q300,0 600,30 T1200,30 L1200,60 L0,60 Z",
                "M0,30 Q300,60 600,30 T1200,30 L1200,60 L0,60 Z",
                "M0,30 Q300,0 600,30 T1200,30 L1200,60 L0,60 Z",
              ],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop
                offset="0%"
                stopColor="currentColor"
                stopOpacity="0"
              />
              <stop
                offset="50%"
                stopColor="currentColor"
                stopOpacity="0.3"
              />
              <stop
                offset="100%"
                stopColor="currentColor"
                stopOpacity="0"
              />
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  }

  if (style === "dots") {
    return (
      <motion.div
        className={`flex justify-center items-center gap-2 py-8 ${className}`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.8, 0.4] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
            }}
            className="w-2 h-2 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600"
          />
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`h-px bg-gradient-to-r from-transparent via-[color:var(--foreground-muted)]/30 to-transparent ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    />
  );
}
