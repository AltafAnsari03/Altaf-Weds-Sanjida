"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}

export default function GlassCard({
  children,
  className = "",
  glow = false,
  ...props
}: GlassCardProps) {
  return (
    <motion.div
      className={`glassmorphism rounded-2xl p-6 md:p-8 transition-shadow duration-500 ${
        glow ? "animate-glow-pulse" : "hover:border-gold-500/30"
      } ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
