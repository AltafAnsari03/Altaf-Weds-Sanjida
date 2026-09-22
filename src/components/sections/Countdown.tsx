"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { WEDDING_CONFIG } from "@/config/wedding";
import GlassCard from "../ui/GlassCard";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isCompleted: boolean;
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isCompleted: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const difference = +new Date(WEDDING_CONFIG.eventDate) - +new Date();
      
      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isCompleted: true });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isCompleted: false,
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, "0");
  };

  const timeBlocks = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.minutes, label: "Minutes" },
    { value: timeLeft.seconds, label: "Seconds" },
  ];

  return (
    <section
      id="countdown"
      className="relative py-20 px-6 md:px-12 flex flex-col items-center justify-center text-center overflow-hidden z-10"
    >
      {/* Background glow shadow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-gold-600/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-4xl w-full flex flex-col items-center gap-8">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <span className="text-gold-500 font-serif text-[11px] md:text-xs tracking-[0.25em] uppercase mb-2">
            The Countdown
          </span>
          <h3 className="font-cinzel text-2xl md:text-3xl font-semibold text-gold-100 uppercase tracking-widest">
            Counting The Days
          </h3>
          <div className="h-[1px] w-20 bg-gold-500/40 mt-3" />
        </motion.div>

        {/* Dynamic Countdown Grid */}
        {!timeLeft.isCompleted ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 w-full max-w-2xl px-2">
            {timeBlocks.map((block, index) => (
              <GlassCard
                key={block.label}
                glow={false}
                className="flex flex-col items-center justify-center p-6 md:p-8 border border-gold-500/40 text-center rounded-2xl relative group overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Micro gold border hover sheen */}
                <span className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-gold-500/20 transition-colors duration-500 pointer-events-none" />

                {/* Animated reactive number */}
                <span className="font-cinzel text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-gold-100 via-gold-400 to-gold-600 drop-shadow-[0_0_10px_rgba(117,96,122,0.15)] group-hover:scale-105 transition-transform duration-300 select-all">
                  {formatNumber(block.value)}
                </span>
                
                {/* Time Unit Label */}
                <span className="text-[10px] md:text-xs text-gold-300/50 font-sans font-medium tracking-[0.25em] uppercase mt-3 group-hover:text-gold-400 transition-colors">
                  {block.label}
                </span>
              </GlassCard>
            ))}
          </div>
        ) : (
          /* Celebration revealed state */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="w-full max-w-xl"
          >
            <GlassCard glow={true} className="border border-gold-500/30 p-8 md:p-12 text-center rounded-2xl">
              <span className="font-great-vibes text-4xl text-gold-400 block mb-2">Assalamu Alaikum</span>
              <h4 className="font-cinzel text-2xl md:text-3xl text-gold-200 tracking-widest font-semibold uppercase mb-4">
                The Celebration Has Begun!
              </h4>
              <p className="text-xs md:text-sm text-gold-100/70 font-sans leading-relaxed tracking-wide">
                We are currently celebrating this blessed union. We highly request your valuable presence and precious prayers (Dua) for the couple. Jazakumullahu Khairan!
              </p>
            </GlassCard>
          </motion.div>
        )}

        {/* Date Display */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-xs md:text-sm text-gold-300/60 font-sans tracking-widest uppercase"
        >
          {WEDDING_CONFIG.eventDateDisplay} • {WEDDING_CONFIG.events[1].venue}
        </motion.p>
      </div>
    </section>
  );
}
