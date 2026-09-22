"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Crown, ChevronRight } from "lucide-react";
import { WEDDING_CONFIG } from "@/config/wedding";

type Phase = "closed" | "opening" | "open" | "exited";

export default function RoyalDoorIntro({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [phase, setPhase] = useState<Phase>("closed");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const openDoors = () => {
    setPhase("opening");
    window.dispatchEvent(new Event("playWeddingMusic"));
    setTimeout(() => setPhase("open"), 1300);
  };

  const enterSite = () => {
    setPhase("exited");
    setTimeout(onComplete, 850);
  };

  const doorsOpen = phase === "opening" || phase === "open";

  return (
    <AnimatePresence>
      {phase !== "exited" && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-start md:justify-center overflow-hidden royal-intro-bg px-4 pt-3 md:pt-0"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(117,96,122,0.12)_0%,transparent_55%)] pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-gold-900/20 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent pointer-events-none" />

          {/* Side royal pillars */}
          <div className="absolute left-2 md:left-8 top-1/4 bottom-1/4 w-1 bg-gradient-to-b from-transparent via-gold-600/30 to-transparent hidden sm:block" />
          <div className="absolute right-2 md:right-8 top-1/4 bottom-1/4 w-1 bg-gradient-to-b from-transparent via-gold-600/30 to-transparent hidden sm:block" />

          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-20 text-center mb-5 md:mb-8 max-w-lg"
          >
            <div className="flex justify-center pt-5 md:pt-14 mb-2 md:mb-4">
  <img
    src="/Altaf-Weds-Sanjida/logo.png"
    alt="Wedding Logo"
    className="w-24 h-24 sm:w-32 sm:h-32 object-contain"
  />
</div>
            <p className="text-[10px] text-gold-300/50 font-sans tracking-[0.25em] uppercase mt-3 mb-2">
              You Are Cordially Invited
            </p>
            <h1 className="font-cinzel text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-gold-100 via-gold-400 to-gold-100 tracking-widest">
              {WEDDING_CONFIG.groom.name}
              <span className="block font-great-vibes text-3xl md:text-4xl text-gold-300/90 my-1 lowercase font-normal tracking-normal">
                &
              </span>
              {WEDDING_CONFIG.bride.name}
            </h1>
            <div className="royal-ornament-divider w-40 mx-auto mt-4" />
          </motion.div>

          {/* Palace gates */}
          <div
            className="royal-door-scene relative w-full max-w-sm md:max-w-md z-10"
            style={{ perspective: "1400px" }}
          >
            <div className="royal-arch-frame relative">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-40 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1.5 h-1.5 rotate-45 bg-gold-500/60"
                    style={{ opacity: 0.4 + i * 0.12 }}
                  />
                ))}
              </div>

              <div className="relative min-h-[230px] md:min-h-[340px] rounded-t-[2.5rem] overflow-hidden border-2 border-gold-500/35 bg-luxury-black shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_80px_rgba(117,96,122,0.08)]">
                {/* Chamber behind doors — no date, only royal welcome */}
                <div className="absolute inset-0 z-0 flex items-center justify-center bg-[radial-gradient(ellipse_at_center,#302432_0%,#130E15_70%)]">
                  <motion.div
                    animate={{
                      opacity: doorsOpen ? 1 : 0.15,
                      scale: doorsOpen ? 1 : 0.92,
                    }}
                    transition={{ duration: 0.8, delay: doorsOpen ? 0.3 : 0 }}
                    className="flex flex-col items-center gap-4 px-8 text-center"
                  >
                    <div className="w-24 h-24 md:w-28 md:h-28 rounded-full border-2 border-gold-500/40 flex items-center justify-center bg-gradient-to-br from-gold-900/40 to-luxury-black relative">
                      <span className="font-great-vibes text-4xl text-gold-400/90">﷽</span>
                      <motion.div
                        animate={doorsOpen ? { rotate: 360 } : { rotate: 0 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-2 rounded-full border border-dashed border-gold-500/20"
                      />
                    </div>
                    <p className="font-cinzel text-xs text-gold-400/80 tracking-[0.3em] uppercase">
                      Welcome, Honoured Guest
                    </p>
                    <p className="text-[10px] text-gold-300/40 font-sans tracking-[0.2em] leading-relaxed max-w-[200px]">
                      Step inside to discover the celebration awaiting you
                    </p>
                  </motion.div>

                  {/* Light burst when doors open */}
                  <AnimatePresence>
                    {doorsOpen && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.6, 0.25] }}
                        transition={{ duration: 1.2 }}
                        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,230,160,0.15)_0%,transparent_55%)] pointer-events-none"
                      />
                    )}
                  </AnimatePresence>
                </div>

                {/* Curtains (fade when open) */}
                <motion.div
                  className="absolute inset-y-0 left-0 w-8 z-[15] bg-gradient-to-r from-[#241C26]/90 to-transparent pointer-events-none"
                  animate={{ opacity: doorsOpen ? 0 : 0.8 }}
                />
                <motion.div
                  className="absolute inset-y-0 right-0 w-8 z-[15] bg-gradient-to-l from-[#241C26]/90 to-transparent pointer-events-none"
                  animate={{ opacity: doorsOpen ? 0 : 0.8 }}
                />

                <motion.div
                  className="royal-door royal-door-left absolute inset-y-0 left-0 w-1/2 z-20 origin-left"
                  animate={{ rotateY: doorsOpen ? -92 : 0 }}
                  transition={{ duration: 1.35, ease: [0.19, 1, 0.22, 1] }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <RoyalDoorPanel side="left" initial={WEDDING_CONFIG.groom.name.charAt(0)} />
                </motion.div>

                <motion.div
                  className="royal-door royal-door-right absolute inset-y-0 right-0 w-1/2 z-20 origin-right"
                  animate={{ rotateY: doorsOpen ? 92 : 0 }}
                  transition={{ duration: 1.35, ease: [0.19, 1, 0.22, 1] }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <RoyalDoorPanel side="right" initial={WEDDING_CONFIG.bride.name.charAt(0)} />
                </motion.div>

                <AnimatePresence>
                  {phase === "opening" && (
                    <motion.div
                      initial={{ opacity: 0, scaleY: 0.2 }}
                      animate={{ opacity: 1, scaleY: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-y-4 left-1/2 -translate-x-1/2 w-[2px] z-[25] bg-gradient-to-b from-transparent via-gold-300 to-transparent shadow-[0_0_40px_##E7E0E9,0_0_80px_#75607A]"
                    />
                  )}
                </AnimatePresence>
              </div>

              <div className="h-4 bg-gradient-to-r from-[#241C26] via-gold-700 to-[#241C26] border-x-2 border-b-2 border-gold-600/40 rounded-b-md shadow-lg" />
              <div className="flex justify-center gap-12 -mt-1">
                <div className="w-3 h-8 bg-gradient-to-b from-gold-600 to-gold-900 rounded-b-sm" />
                <div className="w-3 h-8 bg-gradient-to-b from-gold-600 to-gold-900 rounded-b-sm" />
              </div>
            </div>
          </div>

          <div className="relative z-30 mt-2 md:mt-8 min-h-[60px] md:min-h-[80px] flex flex-col items-center">
            <AnimatePresence mode="wait">
              {phase === "closed" && (
                <motion.div
                  key="closed"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="flex flex-col items-center gap-4"
                >
                  <p className="text-[10px] text-gold-200/80 font-sans tracking-[0.35em] uppercase">
                    Presenting The Royal Gates
                  </p>
                  <motion.button
                    type="button"
                    onClick={openDoors}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="royal-enter-btn relative px-10 py-3.5 rounded-sm font-cinzel text-[11px] tracking-[0.3em] uppercase cursor-pointer text-luxury-black"
                  >
                    Open The Gates
                  </motion.button>
                </motion.div>
              )}

              {phase === "open" && (
                <motion.div
                  key="open"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center gap-3"
                >
                  <p className="text-[10px] text-gold-400/70 font-sans tracking-[0.3em] uppercase">
                    The palace awaits
                  </p>
                  <motion.button
                    type="button"
                    onClick={enterSite}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 royal-enter-btn px-10 py-3.5 rounded-sm font-cinzel text-[11px] font-bold tracking-[0.25em] uppercase cursor-pointer text-luxury-black"
                  >
                    Enter The Celebration
                    <ChevronRight className="w-4 h-4" />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function RoyalDoorPanel({
  side,
  initial,
}: {
  side: "left" | "right";
  initial: string;
}) {
  const isLeft = side === "left";

  return (
    <div
      className={`h-full w-full relative ${isLeft ? "rounded-tl-[2.25rem]" : "rounded-tr-[2.25rem]"}`}
      style={{
        background: `
          linear-gradient(165deg, 
            #1A141C 0%,
            #302432 15%,
            #533D56 35%,
            #47344A 55%,
            #241C26 85%,
            #130E15 100%
          )
        `,
      }}
    >
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(
            90deg,
            transparent,
            transparent 12px,
            rgba(117,96,122,0.03) 12px,
            rgba(117,96,122,0.03) 13px
          )`,
        }}
      />

      <div className="absolute inset-4 border border-gold-500/30 rounded-lg pointer-events-none" />
      <div className="absolute inset-7 border border-gold-500/10 pointer-events-none" />

      {/* Carved arch on door */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[55%] h-16 border-t-2 border-x-2 border-gold-500/25 rounded-t-full" />

      {/* Central medallion */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[65%] max-w-[140px] aspect-square">
        <div className="w-full h-full rounded-full border-2 border-gold-500/35 flex items-center justify-center bg-gradient-to-br from-gold-900/60 via-luxury-black to-gold-800/40 shadow-inner">
          <div className="w-[75%] h-[75%] rounded-full border border-gold-500/20 flex items-center justify-center">
            <span className="font-cinzel text-2xl md:text-3xl text-gold-300/90 font-bold">
              {initial}
            </span>
          </div>
        </div>
      </div>

      {/* Iron handle */}
      <div
        className={`absolute top-[58%] -translate-y-1/2 flex flex-col items-center gap-0.5 ${
          isLeft ? "right-2 md:right-3" : "left-2 md:left-3"
        }`}
      >
        <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-gold-200 to-gold-700 border border-gold-100/50 shadow-md" />
        <div className="w-1 h-10 md:h-12 rounded-full bg-gradient-to-b from-gold-300 via-gold-500 to-gold-800" />
      </div>

      {/* Corner flourishes */}
      <div
        className={`absolute top-5 w-6 h-6 border-gold-500/50 ${
          isLeft ? "left-5 border-t-2 border-l-2" : "right-5 border-t-2 border-r-2"
        }`}
      />
      <div
        className={`absolute bottom-8 w-6 h-6 border-gold-500/50 ${
          isLeft ? "left-5 border-b-2 border-l-2" : "right-5 border-b-2 border-r-2"
        }`}
      />

      {/* Bottom hinge detail */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
        {[0, 1, 2].map((i) => (
          <div key={i} className="w-1 h-3 rounded-full bg-gold-700/60" />
        ))}
      </div>
    </div>
  );
}
