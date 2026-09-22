"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ScratchRevealProps {
  children: React.ReactNode;
  onRevealComplete?: (percent: number) => void;
  revealThreshold?: number;
  className?: string;
  hint?: string;
}

export default function ScratchReveal({
  children,
  onRevealComplete,
  revealThreshold = 42,
  className = "",
  hint = "Scratch the golden foil to reveal the date",
}: ScratchRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);
  const isDrawing = useRef(false);
  const hasCompleted = useRef(false);

  const drawFoil = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number) => {
    const gradient = ctx.createLinearGradient(0, 0, w, h);
    gradient.addColorStop(0, "#241C26");
gradient.addColorStop(0.25, "#47344A");
gradient.addColorStop(0.5, "#8F7896");
gradient.addColorStop(0.75, "#533D56");
gradient.addColorStop(1, "#302432");

ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);

    ctx.globalAlpha = 0.35;
    for (let i = 0; i < 80; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      const r = Math.random() * 2 + 0.5;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = Math.random() > 0.5 ? "#E7E0E9" : "#47344A";
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    ctx.strokeStyle = "rgba(231, 224, 233, 0.18)";
    ctx.lineWidth = 1;
    for (let i = 0; i < 12; i++) {
      ctx.beginPath();
      ctx.moveTo(0, (h / 12) * i);
      ctx.lineTo(w, (h / 12) * i + 20);
      ctx.stroke();
    }

    ctx.font = "600 11px Cinzel, serif";
    ctx.fillStyle = "rgba(7, 7, 7, 0.45)";
    ctx.textAlign = "center";
    ctx.fillText("✦ SCRATCH TO REVEAL ✦", w / 2, h / 2);
  }, []);

  const initCanvas = useCallback(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    drawFoil(ctx, rect.width, rect.height);
  }, [drawFoil]);

  const scratch = useCallback(
    (clientX: number, clientY: number) => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container || isRevealed) return;

      const rect = container.getBoundingClientRect();
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const x = clientX - rect.left;
      const y = clientY - rect.top;

      ctx.globalCompositeOperation = "destination-out";
      const radius = Math.max(18, rect.width * 0.06);
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, "rgba(0,0,0,1)");
      gradient.addColorStop(0.6, "rgba(0,0,0,0.6)");
      gradient.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalCompositeOperation = "source-over";

      const dpr = window.devicePixelRatio || 1;
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      let transparent = 0;
      const step = 4 * Math.floor(8 * dpr);
      for (let i = 3; i < pixels.length; i += step) {
        if (pixels[i] < 128) transparent++;
      }
      const total = pixels.length / step;
      const percent = Math.min(100, Math.round((transparent / total) * 100));
      setScratchPercent(percent);

      if (percent >= revealThreshold && !hasCompleted.current) {
        hasCompleted.current = true;
        setIsRevealed(true);
        onRevealComplete?.(percent);
      }
    },
    [isRevealed, revealThreshold, onRevealComplete]
  );

  const getCoords = (e: React.PointerEvent) => ({
    x: e.clientX,
    y: e.clientY,
  });

  useEffect(() => {
    initCanvas();
    const ro = new ResizeObserver(() => {
      if (!hasCompleted.current) initCanvas();
    });
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [initCanvas]);

  useEffect(() => {
    if (!isRevealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let frame = 0;
    const fade = () => {
      frame += 1;
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = `rgba(0,0,0,${0.08})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      if (frame < 18) requestAnimationFrame(fade);
      else {
        canvas.style.opacity = "0";
        canvas.style.pointerEvents = "none";
      }
    };
    requestAnimationFrame(fade);
  }, [isRevealed]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-xl select-none touch-none ${className}`}
    >
      <div className="relative z-0 w-full h-full min-h-[200px] flex items-center justify-center p-4">
        {children}
      </div>

      <canvas
        ref={canvasRef}
        className={`absolute inset-0 z-10 cursor-crosshair transition-opacity duration-700 ${
          isRevealed ? "pointer-events-none" : ""
        }`}
        onPointerDown={(e) => {
          isDrawing.current = true;
          (e.target as HTMLCanvasElement).setPointerCapture(e.pointerId);
          const { x, y } = getCoords(e);
          scratch(x, y);
        }}
        onPointerMove={(e) => {
          if (!isDrawing.current) return;
          const { x, y } = getCoords(e);
          scratch(x, y);
        }}
        onPointerUp={() => {
          isDrawing.current = false;
        }}
        onPointerLeave={() => {
          isDrawing.current = false;
        }}
      />

      <AnimatePresence>
        {!isRevealed && scratchPercent < 8 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-3 left-0 right-0 z-20 pointer-events-none flex flex-col items-center gap-1"
          >
            <motion.span
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-[9px] md:text-[10px] text-luxury-black/70 font-sans tracking-[0.25em] uppercase bg-gold-200/90 px-3 py-1 rounded-full"
            >
              {hint}
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      {scratchPercent > 5 && !isRevealed && (
        <div className="absolute top-2 right-2 z-20 pointer-events-none">
          <span className="text-[9px] font-sans text-gold-300/80 tracking-wider bg-luxury-black/60 px-2 py-0.5 rounded border border-gold-500/20">
            {scratchPercent}%
          </span>
        </div>
      )}
    </div>
  );
}
