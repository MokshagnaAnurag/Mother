import { motion } from "framer-motion";
import { easeLux } from "@/lib/animationPresets";

export function FinalScene() {
  return (
    <section className="relative grid min-h-screen place-items-center overflow-hidden">
      {/* ascending particles */}
      {Array.from({ length: 70 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute h-1 w-1 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            bottom: -10,
            background: i % 2 ? "oklch(0.78 0.13 10)" : "oklch(0.88 0.10 85)",
            boxShadow: "0 0 12px currentColor",
          }}
          animate={{ y: ["0vh", "-110vh"], opacity: [0, 1, 0] }}
          transition={{ duration: 9 + Math.random() * 6, repeat: Infinity, delay: Math.random() * 8, ease: "easeOut" }}
        />
      ))}

      {/* Love Rain (Hearts falling) */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={`heart-${i}`}
          className="absolute text-rose/20"
          style={{
            left: `${Math.random() * 100}%`,
            top: -20,
          }}
          animate={{ 
            y: ["0vh", "110vh"], 
            x: [0, Math.random() * 100 - 50, 0],
            rotate: [0, 360],
            opacity: [0, 0.4, 0]
          }}
          transition={{ duration: 15 + Math.random() * 10, repeat: Infinity, delay: Math.random() * 20, ease: "linear" }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
        </motion.div>
      ))}


      {/* giant heart */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 2, ease: easeLux }}
        className="relative"
      >
        <motion.div
          className="absolute inset-0 -z-10 rounded-full"
          style={{ background: "radial-gradient(closest-side, oklch(0.78 0.13 10 / .7), transparent 70%)", filter: "blur(60px)" }}
          animate={{ scale: [1, 1.15, 1], opacity: [.7, 1, .7] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.svg viewBox="0 0 32 32" className="h-[40vmin] w-[40vmin] max-w-[420px]"
          style={{ filter: "drop-shadow(0 0 60px oklch(0.78 0.13 10))" }}
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <defs>
            <linearGradient id="finalH" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0" stopColor="#ff8fab" />
              <stop offset="1" stopColor="#cdb4db" />
            </linearGradient>
          </defs>
          <path d="M16 28 C 4 20, 2 10, 9 6 C 13 4, 16 8, 16 10 C 16 8, 19 4, 23 6 C 30 10, 28 20, 16 28 Z" fill="url(#finalH)" />
        </motion.svg>
      </motion.div>

      <div className="absolute inset-x-0 bottom-[14%] text-center">
        <motion.h2
          initial={{ opacity: 0, filter: "blur(20px)", y: 20 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: easeLux }}
          className="font-display text-4xl text-luxwhite md:text-7xl text-shadow-glow"
        >
          Thank You, Mom <span className="text-rose">❤</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, filter: "blur(14px)" }}
          whileInView={{ opacity: 1, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 2.4, delay: 1.6, ease: easeLux }}
          className="mt-6 font-display text-xl italic text-luxwhite/80 md:text-3xl"
        >
          You are my entire world.
        </motion.p>
      </div>
    </section>
  );
}
