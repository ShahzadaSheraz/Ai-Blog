"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface MotionCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  hoverScale?: number;
  onClick?: () => void;
  href?: string;
}

export function MotionCard({
  children,
  className,
  delay = 0,
  hoverScale = 1.02,
  onClick,
  href,
}: MotionCardProps) {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay,
      },
    },
  };

  const Wrapper = href ? motion.a : motion.div;

  return (
    <Wrapper
      href={href}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{
        scale: hoverScale,
        transition: { duration: 0.3 },
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={className}
    >
      {children}
    </Wrapper>
  );
}
