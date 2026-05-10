import { motion } from "framer-motion";
import { CartoonMother } from "./CartoonMother";
import { wordChild, wordStagger, easeLux } from "@/lib/animationPresets";
import { Heart } from "lucide-react";

const HEADING = "To The Woman Who Made My World Beautiful".split(" ");

export function Hero({ isStarted }: { isStarted: boolean }) {
  const animateState = isStarted ? "show" : "hidden";
  
  return (
    <section className="relative grid min-h-screen w-full place-items-center px-6 pt-24 md:px-14 overflow-hidden">
      {/* Cinematic Background Details */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isStarted ? { opacity: 1 } : { opacity: 0 }}
          className="absolute -left-[10%] top-[20%] h-[100vh] w-[100vh] bg-rose/10 blur-[120px] rounded-full"
        />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isStarted ? { opacity: 0.6 } : { opacity: 0 }}
          transition={{ delay: 1 }}
          className="absolute right-[10%] bottom-[10%] h-[80vh] w-[80vh] bg-gold/5 blur-[100px] rounded-full"
        />
        {/* Subtle Lens Flare */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={isStarted ? { opacity: 0.15, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ delay: 0.8, duration: 2 }}
          className="absolute top-1/4 right-1/4 h-1 w-1 bg-white rounded-full shadow-[0_0_100px_40px_rgba(255,255,255,0.4),0_0_200px_80px_oklch(0.78_0.13_10_/_0.2)]"
        />
      </div>

      <div className="grid w-full max-w-7xl grid-cols-1 items-center gap-10 md:grid-cols-2 relative z-10">

        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }} 
            animate={isStarted ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ delay: 0.5, duration: 1.2, ease: easeLux }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-rose/30 bg-rose/5 px-4 py-1.5 text-[10px] uppercase tracking-[0.4em] text-rose/90"
          >
            <Heart size={12} className="fill-rose text-rose" /> Mother's Day · MMXXVI
          </motion.p>

          <motion.h1
            variants={wordStagger}
            initial="hidden" 
            animate={animateState}
            transition={{ delayChildren: 0.6 }}
            className="font-display text-[clamp(2.4rem,6.2vw,5.6rem)] font-medium leading-[1.02] text-luxwhite text-balance drop-shadow-[0_0_25px_rgba(255,255,255,0.4)]"
          >


            {HEADING.map((w, i) => (
              <motion.span key={i} variants={wordChild} className="mr-[0.25em] inline-block will-transform">
                {w}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
            animate={isStarted ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 16, filter: "blur(10px)" }}
            transition={{ delay: 1.2, duration: 1.4, ease: easeLux }}
            className="mt-8 max-w-md font-display text-xl italic text-luxwhite/75 md:text-2xl"
            style={{ textShadow: "0 0 30px oklch(0.78 0.13 10 / .35)" }}
          >
            “A mother’s love is the first magic we ever feel.”
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }} 
            animate={isStarted ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ delay: 1.6, duration: 1.2, ease: easeLux }}
            className="mt-10 flex flex-wrap items-center gap-5"
          >
            <a href="#memories"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-rose via-peach to-lavender px-7 py-3.5 text-sm uppercase tracking-[0.3em] text-[#1a0d14] transition-transform hover:scale-[1.03]"
              style={{ boxShadow: "0 10px 60px -10px oklch(0.78 0.13 10 / .8)" }}
            >
              <span className="relative z-10">Enter Her World</span>
              <Heart size={14} className="relative z-10 fill-[#1a0d14]" />
              <span className="absolute inset-0 -translate-x-full bg-white/40 transition-transform duration-700 group-hover:translate-x-full" />
            </a>
          </motion.div>
        </div>


        <motion.div
          initial={{ opacity: 0, scale: 0.92, filter: "blur(24px)" }}
          animate={isStarted ? { opacity: 1, scale: 1, filter: "blur(0px)" } : { opacity: 0, scale: 0.92, filter: "blur(24px)" }}
          transition={{ delay: 0.4, duration: 1.8, ease: easeLux }}
          className="relative"
        >
          <CartoonMother />
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }} 
        animate={isStarted ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 2.2, duration: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.5em] text-luxwhite/50"
      >
        <span className="block animate-pulse">scroll</span>
      </motion.div>
    </section>
  );
}

