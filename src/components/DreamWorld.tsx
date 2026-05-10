import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { wordChild, wordStagger } from "@/lib/animationPresets";

export function DreamWorld() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const moonY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const farY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const midY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const nearY = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const words = "You are the reason my world feels beautiful.".split(" ");

  return (
    <section ref={ref} className="relative isolate min-h-[120vh] overflow-hidden">
      {/* Sky */}
      <div className="absolute inset-0 -z-20"
        style={{ background: "linear-gradient(180deg, #0a0612 0%, #1a0a1f 50%, #2a0f24 100%)" }} />
      {/* Moon */}
      <motion.div style={{ y: moonY }} className="absolute right-[12%] top-[10%] h-48 w-48 rounded-full">
        <div className="absolute inset-0 rounded-full"
          style={{ background: "radial-gradient(circle at 35% 35%, #fff8e6, #f8d49d 60%, transparent 75%)", boxShadow: "0 0 120px 40px oklch(0.88 0.10 85 / .35)" }} />
      </motion.div>

      {/* Stars */}
      {Array.from({ length: 80 }).map((_, i) => (
        <span key={i} className="absolute rounded-full bg-white"
          style={{
            left: `${Math.random() * 100}%`, top: `${Math.random() * 70}%`,
            width: Math.random() * 2 + 1, height: Math.random() * 2 + 1,
            boxShadow: "0 0 8px #fff",
            animation: `twinkle ${2 + Math.random() * 4}s ease-in-out ${Math.random() * 4}s infinite`,
          }}
        />
      ))}

      {/* Clouds far */}
      <motion.div style={{ y: farY }} className="pointer-events-none absolute inset-x-0 top-[28%] h-40 opacity-50"
        // soft cloud band
        aria-hidden
      >
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 20% 50%, oklch(0.78 0.06 310 / .5), transparent 60%), radial-gradient(ellipse at 70% 60%, oklch(0.78 0.13 10 / .35), transparent 60%)", filter: "blur(40px)" }} />
      </motion.div>

      {/* Quote in sky */}
      <motion.div
        variants={wordStagger}
        initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }}
        className="relative z-10 mx-auto max-w-4xl px-6 pt-40 text-center"
      >
        <motion.h2 className="font-display text-4xl italic leading-tight text-luxwhite md:text-6xl text-shadow-glow">
          {words.map((w, i) => (
            <motion.span key={i} variants={wordChild} className="mr-[0.2em] inline-block">{w}</motion.span>
          ))}
        </motion.h2>
      </motion.div>

      {/* Hills mid */}
      <motion.svg style={{ y: midY }} viewBox="0 0 1440 400" className="pointer-events-none absolute inset-x-0 bottom-[15%] -z-10 w-full opacity-80">
        <defs>
          <linearGradient id="hill1" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#3a1a3d" />
            <stop offset="1" stopColor="#1a0a1f" />
          </linearGradient>
        </defs>
        <path d="M0 250 C 200 150, 400 320, 720 220 C 1040 130, 1240 300, 1440 230 L 1440 400 L 0 400 Z" fill="url(#hill1)" />
      </motion.svg>

      {/* Mother + Child silhouettes */}
      <motion.div style={{ y: nearY }} className="absolute inset-x-0 bottom-[14%] flex items-end justify-center">
        <svg viewBox="0 0 360 280" className="h-[42vh] max-h-[420px] w-auto"
          style={{ filter: "drop-shadow(0 0 30px oklch(0.78 0.13 10 / .6))" }}
        >
          <defs>
            <radialGradient id="aura" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="oklch(0.88 0.10 85 / .6)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          <ellipse cx="180" cy="200" rx="160" ry="50" fill="url(#aura)" />
          {/* Mother */}
          <g fill="#0a0610" stroke="oklch(0.82 0.14 10 / .9)" strokeWidth="1.2">
            <circle cx="150" cy="80" r="22" />
            <path d="M130 100 C 110 150, 110 230, 130 270 L 175 270 C 175 230, 175 150, 170 100 Z" />
            {/* arm down */}
            <path d="M168 150 C 185 170, 200 200, 205 230" stroke="oklch(0.82 0.14 10 / .9)" strokeWidth="3" fill="none" />
          </g>
          {/* Child */}
          <g fill="#0a0610" stroke="oklch(0.88 0.10 85 / .9)" strokeWidth="1.2">
            <circle cx="220" cy="160" r="14" />
            <path d="M208 175 C 200 200, 200 250, 210 270 L 235 270 C 240 250, 240 200, 232 175 Z" />
            <path d="M212 200 C 205 195, 210 175, 205 175" stroke="oklch(0.88 0.10 85 / .9)" strokeWidth="3" fill="none" />
          </g>
        </svg>
      </motion.div>

      {/* Glowing flowers / fireflies near ground */}
      {Array.from({ length: 22 }).map((_, i) => (
        <motion.span key={i}
          className="absolute h-2 w-2 rounded-full"
          style={{
            left: `${Math.random() * 100}%`, bottom: `${Math.random() * 18}%`,
            background: "oklch(0.88 0.10 85)",
            boxShadow: "0 0 12px oklch(0.88 0.10 85), 0 0 30px oklch(0.78 0.13 10 / .6)",
          }}
          animate={{ y: [0, -20, 0], opacity: [.5, 1, .5] }}
          transition={{ duration: 4 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 3, ease: "easeInOut" }}
        />
      ))}
    </section>
  );
}
