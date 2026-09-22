"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { WEDDING_CONFIG } from "@/config/wedding";
import ScratchReveal from "@/components/ui/ScratchReveal";
import GlassCard from "@/components/ui/GlassCard";

export function parseEventDate(iso: string) {
  const d = new Date(iso);
  return {
    weekday: d.toLocaleDateString("en-US", { weekday: "long" }).toUpperCase(),
    day: d.getDate().toString().padStart(2, "0"),
    month: d.toLocaleDateString("en-US", { month: "long" }),
    year: d.getFullYear().toString(),
  };
}

export default function RoyalDateScratch() {
  const [revealed, setRevealed] = useState(false);
  const parts = useMemo(
    () => parseEventDate(WEDDING_CONFIG.eventDate),
    []
  );

  return (
    <section
      id="save-the-date"
      className="relative w-full max-w-xl mx-auto px-2"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="flex flex-col items-center gap-6"
      >
        <div className="flex flex-col items-center text-center">
          <h3 className="font-cinzel text-lg md:text-xl text-gold-200 tracking-[0.2em] uppercase mt-1">
            Unveil The Sacred Date
          </h3>
          <div className="royal-ornament-divider w-32 mt-3" />
        </div>

        <GlassCard className="w-full p-0 border-2 border-gold-500/25 rounded-2xl overflow-hidden royal-scratch-frame shadow-[0_0_50px_rgba(117,96,122,0.08)]">
          

          <ScratchReveal
            className="mx-3 mb-3 min-h-[240px] md:min-h-[280px] rounded-xl royal-scratch-panel border border-gold-500/20"
            hint="Scratch to reveal the date"
            revealThreshold={35}
            onRevealComplete={() => setRevealed(true)}
          >
            <DateRevealInner
              parts={parts}
              display={WEDDING_CONFIG.eventDateDisplay}
              glowing={revealed}
            />
          </ScratchReveal>

          <div className="h-2 bg-gradient-to-r from-gold-900 via-gold-500/40 to-gold-900" />
        </GlassCard>

        <AnimatePresence>
          {!revealed && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-[10px] text-gold-400/50 font-sans tracking-[0.25em] uppercase flex items-center gap-2"
            >
              <Sparkles className="w-3 h-3 text-gold-500/70" />
              Use your finger or mouse to scratch
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

function DateRevealInner({
  parts,
  display,
  glowing,
}: {
  parts: ReturnType<typeof parseEventDate>;
  display: string;
  glowing: boolean;
}) {
  return (
    <motion.div
      className="relative flex flex-col items-center justify-center text-center w-full py-4 px-2"
      animate={glowing ? { scale: [1, 1.02, 1] } : {}}
      transition={{ duration: 1.2 }}
    >
      {glowing && (
        <motion.div
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="absolute inset-0 bg-[radial-gradient(circle,rgba(117,96,122,0.3)_0%,transparent_65%)] rounded-xl pointer-events-none"
        />
      )}

      <span className="text-[9px] text-gold-500 font-sans tracking-[0.4em] uppercase mb-2 relative z-10">
        Save The Date
      </span>
      <p className="font-cinzel text-[10px] text-gold-400/90 tracking-[0.35em] uppercase mb-1 relative z-10">
        {parts.weekday}
      </p>
      <span className="font-cinzel text-6xl md:text-7xl font-bold gold-shimmer leading-none relative z-10">
        {parts.day}
      </span>
      <p className="font-great-vibes text-3xl md:text-4xl text-gold-300 my-1 relative z-10">
        {parts.month}
      </p>
      <p className="font-cinzel text-xl text-gold-200/90 tracking-[0.25em] relative z-10">
        {parts.year}
      </p>
      <div className="royal-ornament-divider w-20 my-3 relative z-10" />
      <p className="text-[9px] text-gold-300/45 font-sans tracking-wider relative z-10">
        {display}
      </p>

      <AnimatePresence>
        {glowing && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 mt-4 text-gold-500 relative z-10"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="text-[9px] tracking-[0.3em] uppercase font-cinzel">
              Date Unveiled
            </span>
            <Sparkles className="w-3.5 h-3.5" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
