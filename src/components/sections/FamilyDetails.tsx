"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { WEDDING_CONFIG } from "@/config/wedding";
import GlassCard from "../ui/GlassCard";

export default function FamilyDetails() {
  return (
    <section
      id="family"
      className="relative py-24 px-6 md:px-12 flex flex-col items-center justify-center overflow-hidden z-10"
    >
      {/* Background ambient gold spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gold-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl w-full flex flex-col items-center gap-16 relative">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center animate-fade-in"
        >
          <span className="text-gold-500 font-serif text-[11px] md:text-xs tracking-[0.25em] uppercase mb-2">
            With Blessings of
          </span>
          <h3 className="font-cinzel text-2xl md:text-3xl font-semibold text-gold-100 uppercase tracking-widest">
            Family Details
          </h3>
          <div className="h-[1px] w-20 bg-gold-500/40 mt-3" />
        </motion.div>

        {/* Double Column Family Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full px-2">
          
          {/* Groom Family Card */}
          <GlassCard className="border border-gold-500/15 p-6 md:p-8 flex flex-col gap-6 rounded-2xl shadow-xl">
            {/* Calligraphy Ornament Heading */}
            <div className="flex flex-col items-center text-center pb-4 border-b border-gold-500/10">
              <span className="font-great-vibes text-gold-400 text-3xl mb-1 lowercase">groom&apos;s family</span>
              <h4 className="font-cinzel text-lg md:text-xl font-bold tracking-widest text-gold-200 uppercase">
                Ansari Family
              </h4>
            </div>

            {/* Relations list */}
            <div className="flex flex-col gap-5">
              {WEDDING_CONFIG.groomFamily.map((group, index) => (
                <div key={index} className="flex flex-col gap-1.5 text-center sm:text-left">
                  <span className="text-[10px] text-gold-500 font-sans tracking-[0.2em] uppercase font-semibold">
                    {group.relation}
                  </span>
                  <div className="flex flex-wrap gap-x-2 gap-y-1 justify-center sm:justify-start">
                    {group.names.map((name, idx) => (
                      <span key={idx} className="font-cinzel text-gold-100 font-medium text-xs md:text-sm select-all">
                        {name}
                        {idx < group.names.length - 1 && (
                          <span className="inline-block mx-2 text-gold-500/30 text-[10px] sm:text-xs select-none">•</span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom mini flourish */}
            <div className="flex items-center justify-center gap-2.5 mt-4 opacity-30">
              <div className="h-[1px] w-8 bg-gold-500" />
              <Heart className="w-2.5 h-2.5 text-gold-500 fill-gold-500" />
              <div className="h-[1px] w-8 bg-gold-500" />
            </div>
          </GlassCard>

          {/* Bride Family Card */}
          <GlassCard className="border border-gold-500/15 p-6 md:p-8 flex flex-col gap-6 rounded-2xl shadow-xl">
            {/* Calligraphy Ornament Heading */}
            <div className="flex flex-col items-center text-center pb-4 border-b border-gold-500/10">
              <span className="font-great-vibes text-gold-400 text-3xl mb-1 lowercase">bride&apos;s family</span>
              <h4 className="font-cinzel text-lg md:text-xl font-bold tracking-widest text-gold-200 uppercase">
                Shaikh Family
              </h4>
            </div>

            {/* Relations list */}
            <div className="flex flex-col gap-5">
              {WEDDING_CONFIG.brideFamily.map((group, index) => (
                <div key={index} className="flex flex-col gap-1.5 text-center sm:text-left">
                  <span className="text-[10px] text-gold-500 font-sans tracking-[0.2em] uppercase font-semibold">
                    {group.relation}
                  </span>
                  <div className="flex flex-wrap gap-x-2 gap-y-1 justify-center sm:justify-start">
                    {group.names.map((name, idx) => (
                      <span key={idx} className="font-cinzel text-gold-100 font-medium text-xs md:text-sm select-all">
                        {name}
                        {idx < group.names.length - 1 && (
                          <span className="inline-block mx-2 text-gold-500/30 text-[10px] sm:text-xs select-none">•</span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom mini flourish */}
            <div className="flex items-center justify-center gap-2.5 mt-4 opacity-30">
              <div className="h-[1px] w-8 bg-gold-500" />
              <Heart className="w-2.5 h-2.5 text-gold-500 fill-gold-500" />
              <div className="h-[1px] w-8 bg-gold-500" />
            </div>
          </GlassCard>

        </div>
      </div>
    </section>
  );
}
