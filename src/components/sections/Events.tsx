"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, ExternalLink } from "lucide-react";
import { WEDDING_CONFIG } from "@/config/wedding";
import GlassCard from "../ui/GlassCard";

export default function Events() {
  return (
    <section
      id="events"
      className="relative py-24 px-6 md:px-12 flex flex-col items-center justify-center overflow-hidden z-10"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[700px] h-[350px] md:h-[700px] bg-gold-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl w-full flex flex-col items-center gap-16 relative">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center animate-fade-in"
        >
          <span className="text-gold-500 font-serif text-[11px] md:text-xs tracking-[0.25em] uppercase mb-2">
            The Celebration
          </span>
          <h3 className="font-cinzel text-2xl md:text-3xl font-semibold text-gold-100 uppercase tracking-widest">
            Wedding Events
          </h3>
          <div className="h-[1px] w-20 bg-gold-500/40 mt-3" />
        </motion.div>

        {/* Responsive Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full px-2">
          {WEDDING_CONFIG.events.map((event, index) => {
            return (
              <GlassCard
                key={event.id}
                className="flex flex-col h-full p-0 border border-gold-500/15 hover:border-gold-500/40 transition-all duration-500 group rounded-2xl overflow-hidden shadow-xl"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Event Image Banner */}
                <div className="relative w-full h-48 md:h-52 overflow-hidden bg-luxury-gray">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Glass metallic overlay overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent to-transparent pointer-events-none" />
                  
                  {/* Custom top bar decoration */}
                  <span className="absolute bottom-4 left-6 bg-luxury-black/75 backdrop-blur-md text-gold-300 text-[10px] font-sans tracking-[0.2em] uppercase px-3 py-1 rounded border border-gold-500/20 shadow-md">
                    {event.subtitle}
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-6 md:p-8 flex flex-col flex-1 justify-between gap-6">
                  {/* Header Title */}
                  <div className="flex flex-col gap-2">
                    <h4 className="font-cinzel text-xl font-semibold text-gold-200 tracking-wide">
                      {event.title}
                    </h4>
                    <p className="text-xs text-gold-100/70 font-sans leading-relaxed">
                      {event.description}
                    </p>
                  </div>

                  {/* Event Specific Info list */}
                  <div className="flex flex-col gap-4 py-4 border-y border-gold-500/10">
                    {/* Date */}
                    <div className="flex items-start gap-3 text-gold-100/90 text-xs">
                      <Calendar className="w-4 h-4 text-gold-400 mt-0.5 shrink-0" />
                      <span className="font-sans leading-tight tracking-wide">{event.date}</span>
                    </div>

                    {/* Time */}
                    <div className="flex items-start gap-3 text-gold-100/90 text-xs">
                      <Clock className="w-4 h-4 text-gold-400 mt-0.5 shrink-0" />
                      <span className="font-sans leading-tight tracking-wide">{event.time}</span>
                    </div>

                    {/* Location */}
                    <div className="flex items-start gap-3 text-gold-100/90 text-xs">
                      <MapPin className="w-4 h-4 text-gold-400 mt-0.5 shrink-0" />
                      <div className="flex flex-col">
                        <span className="font-cinzel text-gold-300 font-medium leading-tight">{event.venue}</span>
                        <span className="font-sans text-[11px] text-gold-100/50 mt-1 leading-tight">{event.address}</span>
                      </div>
                    </div>
                  </div>

                  {/* Directions Button */}
                  <motion.a
                    href={event.mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-lg border border-gold-500/30 text-gold-400 hover:text-luxury-black bg-transparent hover:bg-gradient-to-br hover:from-gold-300 hover:to-gold-600 hover:border-gold-400 font-sans text-xs tracking-widest font-semibold uppercase cursor-pointer transition-all duration-300 active:scale-[0.98]"
                    whileHover={{ scale: 1.01 }}
                  >
                    View Map Directions
                    <ExternalLink className="w-3.5 h-3.5" />
                  </motion.a>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
