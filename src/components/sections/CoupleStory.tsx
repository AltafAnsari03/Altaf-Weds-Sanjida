"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { WEDDING_CONFIG } from "@/config/wedding";
import GlassCard from "../ui/GlassCard";

export default function CoupleStory() {
  return (
    <section
      id="story"
      className="relative py-24 px-6 md:px-12 flex flex-col items-center justify-center overflow-hidden z-10"
    >
      {/* Background glow spotlights */}
      <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-gold-600/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-[300px] h-[300px] bg-gold-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl w-full flex flex-col items-center gap-16 relative">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center"
        >
          <span className="text-gold-500 font-serif text-[11px] md:text-xs tracking-[0.25em] uppercase mb-2">
            Our Journey
          </span>
          <h3 className="font-cinzel text-2xl md:text-3xl font-semibold text-gold-100 uppercase tracking-widest">
            The Love Story
          </h3>
          <div className="h-[1px] w-20 bg-gold-500/40 mt-3" />
        </motion.div>

        {/* Vertical Timeline Structure */}
        <div className="relative w-full flex flex-col items-center mt-8">
          {/* Main timeline line */}
          <div className="absolute left-4 sm:left-1/2 transform sm:-translate-x-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-gold-500/10 via-gold-500/40 to-gold-500/10 pointer-events-none" />

          {WEDDING_CONFIG.story.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={item.title}
                className={`relative w-full flex flex-col sm:flex-row items-center mb-16 sm:mb-24 last:mb-0 ${
                  isEven ? "sm:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline node marker */}
                <div className="absolute left-4 sm:left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full border border-gold-500 bg-luxury-black flex items-center justify-center z-20 shadow-md">
                  <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-gold-300 to-gold-600 animate-pulse" />
                </div>

                {/* Timeline content block side */}
                <div className="w-full sm:w-1/2 pl-12 sm:pl-0 sm:px-12 flex justify-start sm:justify-end">
                  <motion.div
                    className={`w-full max-w-md ${isEven ? "sm:text-left" : "sm:text-right"}`}
                    initial={{
                      opacity: 0,
                      x: isEven ? 40 : -40,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {/* Story card wrapper */}
                    <GlassCard className="p-0 border border-gold-500/15 rounded-2xl overflow-hidden hover:border-gold-500/30 transition-colors duration-500 group flex flex-col">
                      {/* Premium Image with Hover zoom effect */}
                      <div className="relative w-full h-52 overflow-hidden bg-luxury-gray">
                        {/* We use standard HTML img to bypass next/image configuration challenges for dynamic external urls */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/40 to-transparent pointer-events-none" />
                        
                        {/* Year Badge absolute */}
                        <span className="absolute top-4 left-4 bg-gradient-to-r from-gold-600 to-gold-400 text-luxury-black text-xs font-cinzel font-bold px-3 py-1 rounded-full shadow-md">
                          {item.year}
                        </span>
                      </div>

                      {/* Story Card Body */}
                      <div className="p-6 md:p-8 flex flex-col gap-3">
                        <h4 className="font-cinzel text-lg md:text-xl font-medium text-gold-200 tracking-wide">
                          {item.title}
                        </h4>
                        <p className="text-xs md:text-sm text-gold-100/70 font-sans leading-relaxed tracking-wide">
                          {item.description}
                        </p>
                      </div>
                    </GlassCard>
                  </motion.div>
                </div>

                {/* Empty block on the opposite side of the timeline (used for desktop layouts alignment) */}
                <div className="hidden sm:block w-1/2" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
