"use client";

import React from "react";
import FloatingParticles from "@/components/ui/FloatingParticles";
import BackgroundMusic from "@/components/sections/BackgroundMusic";
import EnvelopeHero from "@/components/sections/EnvelopeHero";
import Countdown from "@/components/sections/Countdown";
import CoupleStory from "@/components/sections/CoupleStory";
import Events from "@/components/sections/Events";
// import Gallery from "@/components/sections/Gallery";
import Venue from "@/components/sections/Venue";
import FamilyDetails from "@/components/sections/FamilyDetails";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full bg-luxury-black overflow-x-hidden">
      {/* 1. Cinematic Floating Particles Canvas Background */}
      <FloatingParticles />

      {/* 2. Floating Ambient Background Music Toggle */}
      <BackgroundMusic />

      {/* 3. Wax-sealed Envelope Overlay & Hero Landing Section */}
      <EnvelopeHero />

      {/* Main Content (Revealed after Envelope is opened) */}
      <div className="relative z-10 w-full flex flex-col gap-4">
        {/* Decorative gold horizontal divider */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gold-500/20 to-transparent pointer-events-none" />

        {/* 4. Live Wedding Countdown Clock */}
        <Countdown />

        {/* Decorative gold horizontal divider */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gold-500/10 to-transparent pointer-events-none" />

        {/* 5. Couple Story Vertical Timeline */}
        <CoupleStory />

        {/* Decorative gold horizontal divider */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gold-500/10 to-transparent pointer-events-none" />

        {/* 6. Mehndi, Nikah, Walima Ceremonies */}
        <Events />

        {/* Decorative gold horizontal divider */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gold-500/10 to-transparent pointer-events-none" />

        {/* 7. Image Grid & Lightbox Popups */}
        {/* <Gallery /> */}

        {/* Decorative gold horizontal divider */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gold-500/10 to-transparent pointer-events-none" />

        {/* 8. Google Maps navigation directions */}
        <Venue />

        {/* Decorative gold horizontal divider */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gold-500/10 to-transparent pointer-events-none" />

        

        {/* Decorative gold horizontal divider */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gold-500/10 to-transparent pointer-events-none" />

        {/* 10. Symmetric family rosters */}
        <FamilyDetails />

        {/* 11. Surah quotes and closing remarks */}
        <Footer />
      </div>
    </main>
  );
}
