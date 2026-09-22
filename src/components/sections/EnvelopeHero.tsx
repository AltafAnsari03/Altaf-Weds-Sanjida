"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Heart } from "lucide-react";
import { WEDDING_CONFIG } from "@/config/wedding";
import RoyalDoorIntro from "@/components/sections/RoyalDoorIntro";
import RoyalDateScratch from "@/components/sections/RoyalDateScratch";

export default function EnvelopeHero() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      {showIntro && (
        <RoyalDoorIntro onComplete={() => setShowIntro(false)} />
      )}

      <section
        id="hero"
        className="relative min-h-screen flex flex-col justify-between items-center text-center p-6 md:p-12 overflow-hidden z-10 select-none"
      >
        <div className="absolute inset-0 bg-[#070707] z-[-2]" />
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-gold-600/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[350px] md:w-[700px] h-[350px] md:h-[700px] bg-gold-500/5 rounded-full blur-[120px] pointer-events-none" />

        <motion.div
          className="flex flex-col items-center mt-12 md:mt-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: showIntro ? 0 : 1, y: showIntro ? -20 : 0 }}
          transition={{ duration: 1, delay: showIntro ? 0 : 0.2 }}
        >
          <div className="text-gold-500 font-cinzel text-[11px] md:text-xs tracking-[0.3em] uppercase mb-4">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </div>
          <div className="text-gold-200/60 font-sans text-[10px] md:text-[11px] tracking-[0.2em] uppercase">
            In the Name of Allah, the Most Beneficent, the Most Merciful
          </div>
        </motion.div>

        <div className="my-auto flex flex-col items-center px-4 max-w-4xl z-10 w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{
              opacity: showIntro ? 0 : 1,
              scale: showIntro ? 0.95 : 1,
            }}
            transition={{ duration: 1.2, delay: showIntro ? 0 : 0.3 }}
            className="flex flex-col items-center w-full"
          >
            <div className="font-great-vibes text-gold-500 text-3xl md:text-4xl opacity-70 mb-3">
              ﷽
            </div>

            <p className="text-xs md:text-sm text-gold-200/50 font-sans tracking-[0.25em] uppercase mb-8">
              The Wedding Invitation Of
            </p>

            <h2 className="font-cinzel text-5xl md:text-7xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-gold-100 via-gold-400 to-gold-100 py-3 leading-tight select-text">
              {WEDDING_CONFIG.groom.name}
            </h2>

            <div className="font-great-vibes text-4xl md:text-6xl text-gold-200 my-4 lowercase">
              and
            </div>

            <h2 className="font-cinzel text-5xl md:text-7xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-gold-100 via-gold-400 to-gold-100 py-3 leading-tight select-text">
              {WEDDING_CONFIG.bride.name}
            </h2>

            <div className="flex items-center gap-4 mt-8 w-64 justify-center">
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-gold-500/50" />
              <Heart className="w-3 h-3 text-gold-500 fill-gold-500/20" />
              <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-gold-500/50" />
            </div>
          </motion.div>

          {/* Scratch date — inside hero, after doors */}
          <motion.div
            className="mt-10 w-full"
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: showIntro ? 0 : 1,
              y: showIntro ? 30 : 0,
            }}
            transition={{ duration: 1, delay: showIntro ? 0 : 0.6 }}
          >
            {!showIntro && <RoyalDateScratch />}
          </motion.div>
        </div>

        <motion.div
          className="flex flex-col items-center mb-6 text-gold-500/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: showIntro ? 0 : 0.8 }}
          transition={{ delay: showIntro ? 0 : 1.2, duration: 1 }}
        >
          <a href="#countdown" className="flex flex-col items-center group cursor-pointer">
            <span className="text-[9px] md:text-[10px] font-sans tracking-[0.3em] uppercase mb-2 group-hover:text-gold-200 transition-colors">
              Scroll To View Details
            </span>
            <ChevronDown className="w-5 h-5 animate-bounce text-gold-400 group-hover:text-gold-200" />
          </a>
        </motion.div>
      </section>
    </>
  );
}
