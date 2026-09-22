"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  oscillationSpeed: number;
  oscillationDistance: number;
  angle: number;
  type: "dust" | "lantern";
  flickerSpeed: number;
}

export default function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const maxParticles = 60; // Perfect density without causing lag on mobile

    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Create initial particles
    const createParticle = (initAtBottom = false): Particle => {
      const type = Math.random() > 0.85 ? "lantern" : "dust";
      const size =
        type === "lantern"
          ? Math.random() * 15 + 10 // Lantern size: 10px to 25px
          : Math.random() * 2 + 1; // Dust size: 1px to 3px

      return {
        x: Math.random() * canvas.width,
        y: initAtBottom
          ? canvas.height + size + Math.random() * 50
          : Math.random() * canvas.height,
        size,
        speedY: type === "lantern" ? Math.random() * 0.3 + 0.1 : Math.random() * 0.5 + 0.2, // Lanterns float slower
        speedX: (Math.random() - 0.5) * 0.2,
        opacity: type === "lantern" ? Math.random() * 0.15 + 0.05 : Math.random() * 0.4 + 0.15,
        oscillationSpeed: Math.random() * 0.02 + 0.005,
        oscillationDistance: type === "lantern" ? Math.random() * 20 + 10 : Math.random() * 5 + 2,
        angle: Math.random() * Math.PI * 2,
        type,
        flickerSpeed: Math.random() * 0.01 + 0.005,
      };
    };

    // Initialize particles across the entire height initially
    for (let i = 0; i < maxParticles; i++) {
      particles.push(createParticle(false));
    }

    const drawLantern = (ctx: CanvasRenderingContext2D, p: Particle) => {
      ctx.save();
      ctx.globalAlpha = p.opacity;

      // Draw lantern body (rounded rectangle tapering slightly or simple oval)
      const grad = ctx.createRadialGradient(
        p.x,
        p.y,
        0,
        p.x,
        p.y,
        p.size
      );
      // Beautiful warm golden glowing gradient
      grad.addColorStop(0, "rgba(231, 224, 233, 0.9)"); // Yellow-300
      grad.addColorStop(0.3, "rgba(143, 120, 150, 0.6)"); // Yellow-500
      grad.addColorStop(0.7, "rgba(83, 61, 86, 0.2)"); // Amber-600
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();

      // Core flame
      ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
      ctx.beginPath();
      ctx.arc(p.x, p.y + p.size * 0.2, p.size * 0.2, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const drawDust = (ctx: CanvasRenderingContext2D, p: Particle) => {
      ctx.save();
      ctx.globalAlpha = p.opacity;

      // Soft circular gold glow
      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
      grad.addColorStop(0, "rgba(255, 244, 214, 0.9)"); // Bright core
      grad.addColorStop(0.5, "rgba(83, 61, 86, 0.4)"); // Gold mid
      grad.addColorStop(1, "rgba(0, 0, 0, 0)"); // Fade

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const animate = () => {
      if (!ctx || !canvas) return;

      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Render & update particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Update positions
        p.y -= p.speedY;
        p.angle += p.oscillationSpeed;
        p.x += Math.sin(p.angle) * 0.1 + p.speedX;

        // Subtle flicker
        p.opacity += (Math.random() - 0.5) * p.flickerSpeed * 2;
        // Clamp opacity bounds
        if (p.type === "lantern") {
          p.opacity = Math.max(0.02, Math.min(0.2, p.opacity));
        } else {
          p.opacity = Math.max(0.1, Math.min(0.65, p.opacity));
        }

        // Render based on type
        if (p.type === "lantern") {
          drawLantern(ctx, p);
        } else {
          drawDust(ctx, p);
        }

        // If a particle floats off the top of the screen, reset it to the bottom
        if (p.y < -p.size * 3) {
          particles[i] = createParticle(true);
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 bg-transparent"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
