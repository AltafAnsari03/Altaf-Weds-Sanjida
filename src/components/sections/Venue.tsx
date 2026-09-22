"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation, Compass, CheckCircle } from "lucide-react";
import { WEDDING_CONFIG } from "@/config/wedding";
import GlassCard from "../ui/GlassCard";

/** goo.gl / maps.app links work for buttons but not inside iframe */
function resolveMapsEmbedUrl(
  embedUrl: string,
  venue: string,
  address: string
): string {
  if (
    embedUrl.includes("output=embed") ||
    embedUrl.includes("/maps/embed")
  ) {
    return embedUrl;
  }
  const query = encodeURIComponent(`${venue}, ${address}`);
  return `https://maps.google.com/maps?q=${query}&hl=en&z=16&output=embed`;
}

export default function Venue() {
  const primaryEvent = WEDDING_CONFIG.events[1];
  const mapsEmbedSrc = resolveMapsEmbedUrl(
    WEDDING_CONFIG.mapsEmbedUrl,
    primaryEvent.venue,
    primaryEvent.address
  );

  return (
    <section
      id="venue"
      className="relative py-24 px-6 md:px-12 flex flex-col items-center justify-center overflow-hidden z-10"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-gold-600/5 rounded-full blur-[100px] pointer-events-none" />

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
            The Location
          </span>
          <h3 className="font-cinzel text-2xl md:text-3xl font-semibold text-gold-100 uppercase tracking-widest">
            Wedding Venue
          </h3>
          <div className="h-[1px] w-20 bg-gold-500/40 mt-3" />
        </motion.div>

        {/* Venue Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full px-2 items-stretch">
          {/* Left Column: Location details card */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <GlassCard className="flex flex-col h-full gap-6 border border-gold-500/15 p-6 md:p-8 justify-between">
              <div className="flex flex-col gap-5">
                {/* Header Icon */}
                <div className="w-12 h-12 rounded-full bg-gold-500/10 text-gold-400 border border-gold-500/20 flex items-center justify-center">
                  <Compass className="w-6 h-6 animate-pulse" />
                </div>

                <div className="flex flex-col gap-2">
                  <h4 className="font-cinzel text-lg md:text-xl font-medium text-gold-200 tracking-wide">
                    How To Reach
                  </h4>
                  <p className="text-xs text-gold-100/60 leading-relaxed font-sans">
                    The wedding events are hosted at selected central venues with premium facilities. Below is the primary venue directions for our main Nikkah congregation.
                  </p>
                </div>

                {/* Primary Venue address detail */}
                <div className="flex flex-col gap-4 py-4 border-t border-gold-500/10">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                    <div className="flex flex-col">
                      <span className="font-cinzel text-gold-300 font-medium text-xs leading-normal select-all">
                        {primaryEvent.venue}
                      </span>
                      <span className="font-sans text-[11px] text-gold-100/50 mt-1 select-all">
                        {primaryEvent.address}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Logistics / dress code note */}
                <div className="flex flex-col gap-3 py-4 border-t border-gold-500/10">
                  <span className="text-[10px] text-gold-400 font-sans tracking-[0.2em] uppercase">
                    Event Notes
                  </span>
                  
                  <div className="flex items-center gap-2.5 text-gold-100/80 text-xs">
                    {/* <CheckCircle className="w-3.5 h-3.5 text-gold-500/80 shrink-0" />
                    <span className="font-sans">Valet parking is available at all events</span> */}
                  </div>

                  <div className="flex items-center gap-2.5 text-gold-100/80 text-xs">
                    {/* <CheckCircle className="w-3.5 h-3.5 text-gold-500/80 shrink-0" />
                    <span className="font-sans">Dress Code: Formal Traditional Black / Gold</span> */}
                  </div>
                </div>
              </div>

              {/* Direct Maps Directions button */}
              <motion.a
                href={primaryEvent.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-gradient-to-br from-gold-600 via-gold-500 to-gold-700 hover:from-gold-500 hover:to-gold-400 text-luxury-black font-sans text-xs tracking-widest font-bold uppercase cursor-pointer shadow-lg hover:shadow-gold-500/10 transition-all duration-300 active:scale-[0.98] mt-4"
                whileHover={{ scale: 1.01 }}
              >
                <Navigation className="w-4 h-4 text-luxury-black fill-luxury-black" />
                Navigate in Maps
              </motion.a>
            </GlassCard>
          </div>

          {/* Right Column: Google Maps Iframe */}
          <div className="md:col-span-7 h-[300px] md:h-auto min-h-[350px] relative rounded-2xl overflow-hidden border border-gold-500/20 shadow-xl group">
            {/* Elegant corner ornament frames absolute inside */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-gold-400/40 pointer-events-none z-10" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-gold-400/40 pointer-events-none z-10" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-gold-400/40 pointer-events-none z-10" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-gold-400/40 pointer-events-none z-10" />

            {/* Embedded maps iframe */}
            <iframe
              src={mapsEmbedSrc}
              width="100%"
              height="100%"
              style={{ border: 0, filter: "grayscale(1) invert(0.9) contrast(1.1) brightness(0.85)" }} // Elegant dark-filtered maps frame!
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Wedding Venue Directions Google Maps"
              className="w-full h-full relative"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
