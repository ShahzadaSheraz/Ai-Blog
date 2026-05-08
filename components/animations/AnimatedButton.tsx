"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import type { MouseEventHandler, ReactNode } from "react";

interface AnimatedButtonProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  className?: string;
  variant?: "primary" | "secondary" | "outline";
  magneticEffect?: boolean;
  href?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export function AnimatedButton({
  children,
  onClick,
  className,
  variant = "primary",
  magneticEffect = false,
  href,
  disabled = false,
  type = "button",
}: AnimatedButtonProps) {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const handleMouseMove = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    if (!magneticEffect) return;

    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const offsetX = (e.clientX - rect.left - centerX) * 0.2;
    const offsetY = (e.clientY - rect.top - centerY) * 0.2;

    setX(offsetX);
    setY(offsetY);
  };

  const handleMouseLeave = () => {
    setX(0);
    setY(0);
  };

  const baseClasses = {
    primary:
      "px-6 py-3 rounded-xl font-semibold transition-all relative overflow-hidden bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-600 text-white shadow-lg",
    secondary:
      "px-6 py-3 rounded-xl font-semibold transition-all relative overflow-hidden bg-[color:var(--muted-bg)] text-[color:var(--foreground)] hover:bg-[color:var(--foreground)]/10",
    outline:
      "px-6 py-3 rounded-xl font-semibold transition-all relative overflow-hidden border border-[color:var(--border)] text-[color:var(--foreground)] hover:border-[color:var(--ring)]",
  };

  const Wrapper = href ? motion.a : motion.button;
  const wrapperProps = href
    ? {
        href,
        onClick,
        onMouseMove: handleMouseMove,
        onMouseLeave: handleMouseLeave,
      }
    : {
        type,
        disabled,
        onClick,
        onMouseMove: handleMouseMove,
        onMouseLeave: handleMouseLeave,
      };

  return (
    <Wrapper
      {...wrapperProps}
      whileHover={{
        scale: 1.05,
        x: magneticEffect ? x : 0,
        y: magneticEffect ? y : 0,
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={`${baseClasses[variant]} ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>

      {/* Hover glow effect for primary button */}
      {variant === "primary" && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-sky-400 via-indigo-400 to-violet-500 opacity-0"
          whileHover={{ opacity: 0.3 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Animated gradient border for outline button */}
      {variant === "outline" && (
        <motion.div
          className="absolute inset-0 border border-transparent bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-600 opacity-0 -z-10 rounded-xl"
          whileHover={{ opacity: 0.2 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </Wrapper>
  );
}
