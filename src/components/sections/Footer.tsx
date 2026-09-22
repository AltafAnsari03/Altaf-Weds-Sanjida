"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { WEDDING_CONFIG } from "@/config/wedding";

export default function Footer() {
  const quote = WEDDING_CONFIG.quranicQuote;

  return (
    <footer
      className="relative bg-luxury-dark border-t border-gold-500/10 py-20 px-6 md:px-12 flex flex-col items-center justify-center text-center overflow-hidden z-10"
    >
      {/* Background glow highlights */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-gold-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl w-full flex flex-col items-center gap-10 relative">
        
        {/* Quranic Scripture Blessing Area */}
        <motion.div
          className="flex flex-col items-center gap-5 px-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Decorative Calligraphy flourishment */}
          <div className="font-great-vibes text-gold-500 text-3xl opacity-70 mb-1">
            ﷽
          </div>

          {/* Arabic Verse text */}
          <p className="font-serif text-gold-200 text-lg md:text-xl leading-loose tracking-wide max-w-2xl select-all">
            {quote.arabic}
          </p>

          {/* English Translation */}
          <p className="font-sans text-xs md:text-sm text-gold-100/70 italic leading-relaxed max-w-xl select-all">
            &ldquo;{quote.translation}&rdquo;
          </p>

          {/* Surah Reference */}
          <span className="text-[10px] text-gold-500 font-sans tracking-[0.25em] uppercase font-semibold mt-1">
            {quote.surah}
          </span>
        </motion.div>

        {/* Elegant typography divider */}
        <div className="flex items-center gap-3 w-40 justify-center my-4 opacity-30">
          <div className="h-[1px] flex-1 bg-gold-500" />
          <Heart className="w-2.5 h-2.5 text-gold-500 fill-gold-500" />
          <div className="h-[1px] flex-1 bg-gold-500" />
        </div>

        {/* Primary Thank You Closing Message */}
        <motion.div
          className="flex flex-col items-center gap-4 max-w-xl px-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h4 className="font-great-vibes text-gold-300 text-3xl lowercase">
            thank you
          </h4>
          <p className="font-cinzel text-gold-100 text-sm tracking-widest leading-normal mb-1">
            For Being A Part Of Our Blessed Beginning
          </p>
          <p className="font-sans text-xs text-gold-100/50 leading-relaxed tracking-wide">
            Your warm wishes, valuable presence, and precious prayers (Dua) mean the absolute world to us as we embark on this lifetime journey under Allah&apos;s grace.
          </p>
        </motion.div>

        {/* Core credits line */}
        <div className="mt-12 pt-8 border-t border-gold-500/5 w-full text-center">
          <p className="font-sans text-[10px] text-gold-300/30 tracking-[0.2em] uppercase select-all">
            &copy; {new Date().getFullYear()} {WEDDING_CONFIG.groom.name} &amp; {WEDDING_CONFIG.bride.name} Wedding. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
