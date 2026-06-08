"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Home, BookOpen, ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BlurFade } from "@/components/ui/blur-fade";
import { Meteors } from "@/components/ui/meteors";

// ─── Floating manga panel decorations ─────────────────────────────────────────
const panels = [
  { text: "???", delay: 0,    x: "8%",  y: "18%", rot: "-8deg",  size: "text-lg"  },
  { text: "!!",  delay: 0.15, x: "82%", y: "14%", rot:  "6deg",  size: "text-xl"  },
  { text: "…",   delay: 0.25, x: "12%", y: "70%", rot: "-4deg",  size: "text-2xl" },
  { text: "!?",  delay: 0.1,  x: "78%", y: "65%", rot:  "10deg", size: "text-lg"  },
  { text: "☆",   delay: 0.3,  x: "50%", y: "8%",  rot:  "0deg",  size: "text-base"},
];

export default function NotFound() {
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Subtle animated dot grid on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const spacing = 32;
      const cols = Math.ceil(canvas.width  / spacing) + 1;
      const rows = Math.ceil(canvas.height / spacing) + 1;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const wave = Math.sin(t * 0.6 + r * 0.4 + c * 0.4) * 0.5 + 0.5;
          const alpha = wave * 0.12;
          ctx.beginPath();
          ctx.arc(c * spacing, r * spacing, 1.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(20,184,166,${alpha})`;
          ctx.fill();
        }
      }
      t += 0.02;
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [mounted]);

  return (
    <div className="min-h-full flex flex-col bg-[var(--background)]">
      <Navbar />

      <main
        className="relative flex-1 flex flex-col items-center justify-center
                   overflow-hidden px-5 py-32"
        aria-labelledby="not-found-heading"
      >
        {/* Animated dot-grid canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          aria-hidden="true"
        />

        {/* Meteor shower */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <Meteors
            number={14}
            minDelay={0.3}
            maxDelay={2}
            minDuration={4}
            maxDuration={12}
            angle={215}
            className="bg-[var(--p)] shadow-[0_0_4px_var(--p)]"
          />
        </div>

        {/* Radial ambient glow — primary */}
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                     w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none opacity-[0.07]"
          style={{ background: "var(--p)" }}
        />
        {/* Secondary glow — offset */}
        <div
          aria-hidden="true"
          className="absolute top-1/3 right-1/4
                     w-[300px] h-[300px] rounded-full blur-[100px] pointer-events-none opacity-[0.05]"
          style={{ background: "var(--s)" }}
        />

        {/* Floating manga panels */}
        {panels.map(({ text, delay, x, y, rot, size }) => (
          <span
            key={text + x}
            aria-hidden="true"
            className={`absolute select-none font-black opacity-0 ${size}
                        animate-[fadeInFloat_1s_ease_forwards]`}
            style={{
              left: x,
              top:  y,
              rotate:           rot,
              animationDelay:   `${delay + 0.4}s`,
              color:            "var(--p)",
              opacity:          0,
              filter:           "drop-shadow(0 0 6px var(--p-glow))",
              fontFamily:       "var(--font-space), sans-serif",
            }}
          >
            {text}
          </span>
        ))}

        {/* Main content */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-xl">
          {/* 404 display */}
          <BlurFade delay={0.05} duration={0.6}>
            <div className="relative mb-6">
              <span
                className="block text-[9rem] sm:text-[12rem] font-black leading-none
                           select-none tabular-nums"
                style={{
                  background:          "linear-gradient(135deg, var(--grad-from), var(--grad-via), var(--grad-to))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip:      "text",
                  filter:              "drop-shadow(0 0 40px var(--p-glow))",
                }}
                aria-hidden="true"
              >
                404
              </span>
              {/* Decorative open-book icon centered on the 404 */}
              <BookOpen
                size={28}
                className="absolute left-1/2 bottom-1 -translate-x-1/2"
                style={{ color: "var(--p)", filter: "drop-shadow(0 0 8px var(--p-glow))" }}
                aria-hidden="true"
              />
            </div>
          </BlurFade>

          <BlurFade delay={0.15} duration={0.6}>
            <h1
              id="not-found-heading"
              className="text-2xl sm:text-3xl font-black mb-3"
              style={{ color: "var(--foreground)" }}
            >
              This Page Does Not Exist
            </h1>
          </BlurFade>

          <BlurFade delay={0.22} duration={0.6}>
            <p
              className="text-sm sm:text-base leading-relaxed mb-8 max-w-sm"
              style={{ color: "var(--muted-foreground)" }}
            >
              Looks like this chapter was never published — or maybe it was axed before
              you got here. Either way, there&#39;s nothing to read on this page.
            </p>
          </BlurFade>

          {/* Action buttons */}
          <BlurFade delay={0.3} duration={0.6}>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <Link
                href="/"
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold
                           text-white text-sm transition-all duration-300 hover:scale-105
                           hover:shadow-[0_0_28px_var(--p-glow)]"
                style={{ background: "linear-gradient(135deg, var(--p), var(--s))" }}
              >
                <Home size={15} aria-hidden="true" />
                Back to Home
              </Link>

              <button
                type="button"
                onClick={() => window.history.back()}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold
                           text-sm transition-all duration-300 border
                           hover:border-[var(--p)] hover:text-[var(--p)]
                           hover:bg-[var(--p-glow-soft)]"
                style={{
                  borderColor: "var(--border)",
                  color:       "var(--muted-foreground)",
                  background:  "var(--surface)",
                }}
              >
                <ArrowLeft size={15} aria-hidden="true" />
                Go Back
              </button>
            </div>
          </BlurFade>

          {/* Subtle separator */}
          <BlurFade delay={0.38} duration={0.6}>
            <p
              className="mt-12 text-xs tracking-widest uppercase"
              style={{ color: "var(--muted-foreground)", opacity: 0.5 }}
            >
              — page not found —
            </p>
          </BlurFade>
        </div>
      </main>

      <Footer />

      {/* Keyframes for floating panels (added inline so no global CSS change needed) */}
      <style>{`
        @keyframes fadeInFloat {
          from { opacity: 0; transform: translateY(8px) rotate(var(--tw-rotate,0)); }
          to   { opacity: 0.35; transform: translateY(0)  rotate(var(--tw-rotate,0)); }
        }
      `}</style>
    </div>
  );
}
