"use client";

import React, { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { WEDDING_CONFIG } from "@/config/wedding";

export default function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Instantiate audio looping
    const audio = new Audio(WEDDING_CONFIG.musicUrl);
    audio.loop = true;
    audio.volume = 0.4; // Soft background levels
    audioRef.current = audio;

    // Listen for custom trigger from the Envelope opening to autoplay
    const handleAutoplay = () => {
      audio.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Autoplay blocked by browser. Awaiting manual user interaction.", err));
    };

    window.addEventListener("playWeddingMusic", handleAutoplay);

    return () => {
      audio.pause();
      window.removeEventListener("playWeddingMusic", handleAutoplay);
    };
  }, []);

  const togglePlayback = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.error("Playback failed", err));
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Dynamic jumping audio waves visualizer */}
      {isPlaying && (
        <div className="flex items-end gap-[3px] h-6 px-3 py-1 bg-luxury-black/80 backdrop-blur-md rounded-full border border-gold-500/20 shadow-md">
          <div className="w-[3px] bg-gold-400 rounded-full animate-bounce" style={{ height: "40%", animationDuration: "1.1s" }} />
          <div className="w-[3px] bg-gold-500 rounded-full animate-bounce" style={{ height: "85%", animationDuration: "0.8s" }} />
          <div className="w-[3px] bg-gold-300 rounded-full animate-bounce" style={{ height: "55%", animationDuration: "1.3s" }} />
          <div className="w-[3px] bg-gold-400 rounded-full animate-bounce" style={{ height: "70%", animationDuration: "0.9s" }} />
        </div>
      )}

      {/* Primary Floating Button */}
      <button
        onClick={togglePlayback}
        className="w-12 h-12 flex items-center justify-center rounded-full glassmorphism text-gold-400 hover:text-gold-200 border border-gold-500/30 hover:border-gold-400 shadow-lg cursor-pointer transition-all duration-300 group hover:scale-105 active:scale-95"
        aria-label="Toggle background music"
      >
        <div className="relative">
          {isPlaying ? (
            <Volume2 className="w-5 h-5 transition-transform duration-300 group-hover:rotate-6" />
          ) : (
            <VolumeX className="w-5 h-5 transition-transform duration-300 group-hover:-rotate-6 text-gold-500/60" />
          )}
          {/* Subtle spinning glow ring around active music button */}
          {isPlaying && (
            <span className="absolute -inset-2.5 rounded-full border border-gold-500/30 animate-spin" style={{ animationDuration: "8s" }} />
          )}
        </div>
      </button>
    </div>
  );
}
