import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Music, Heart } from "lucide-react";

const MESSAGES = [
  "Gathering Beautiful Memories...",
  "Woven with Care and Devotion...",
  "Almost Ready For You...",
  "For The Most Beautiful Soul In My Life"
];

export function Loader() {
  const [show, setShow] = useState(true);
  const [readyToBegin, setReadyToBegin] = useState(false);
  const [msgIndex, setMsgIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Message cycling
    if (msgIndex < MESSAGES.length - 1) {
      const t = setTimeout(() => setMsgIndex(prev => prev + 1), 2000);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setReadyToBegin(true), 1000);
      return () => clearTimeout(t);
    }
  }, [msgIndex]);

  useEffect(() => {
    // Progress bar simulation
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 45);
    return () => clearInterval(interval);
  }, []);

  const handleBegin = () => {
    setIsExiting(true);
    window.dispatchEvent(new CustomEvent("start-music"));
    window.dispatchEvent(new CustomEvent("start-journey"));
    setTimeout(() => setShow(false), 2000);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[200] grid place-items-center bg-[#050505] overflow-hidden"
          exit={{ 
            opacity: 0, 
            scale: 1.1,
            filter: "blur(40px)",
          }}
          transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Animated Particles */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 80 }).map((_, i) => (
              <motion.span
                key={i}
                className="absolute h-[1px] w-[1px] rounded-full bg-white/40"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{ 
                  opacity: [0, 0.5, 0],
                  y: [0, -40, 0],
                }}
                transition={{
                  delay: Math.random() * 5,
                  duration: 4 + Math.random() * 4,
                  repeat: Infinity,
                }}
              />
            ))}
          </div>

          {/* aurora bloom */}
          <motion.div
            className="absolute h-[80vmin] w-[80vmin] rounded-full opacity-30"
            style={{
              background: "radial-gradient(closest-side, oklch(0.78 0.13 10), transparent 70%)",
              filter: "blur(80px)",
            }}
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />

          {/* Main Content */}
          <div className="relative z-10 flex flex-col items-center gap-12 w-full max-w-lg">
            {/* Pulsing Heart SVG */}
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <div className="absolute inset-0 blur-2xl bg-rose/30 rounded-full scale-150" />
              <Heart size={48} className="relative text-rose fill-rose drop-shadow-[0_0_20px_rgba(255,100,100,0.5)]" />
            </motion.div>

            {/* Cycling Messages */}
            <div className="h-16 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={msgIndex}
                  initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(8px)" }}
                  className="px-6 text-center font-display text-xl italic text-luxwhite/80"
                >
                  {MESSAGES[msgIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Progress Detailing */}
            {!readyToBegin && (
              <div className="w-48 space-y-3">
                <div className="flex justify-between text-[10px] uppercase tracking-[0.4em] text-luxwhite/30">
                  <span>Loading</span>
                  <span>{progress}%</span>
                </div>
                <div className="h-[1px] w-full bg-white/5 overflow-hidden">
                  <motion.div 
                    className="h-full bg-rose/60"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Elegant Begin Button */}
          <AnimatePresence>
            {readyToBegin && !isExiting && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute bottom-[20%]"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleBegin}
                  className="glass group flex flex-col items-center gap-2 rounded-2xl px-12 py-5 text-luxwhite shadow-2xl transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Music size={16} className="text-rose" />
                    <span className="font-display text-lg tracking-[0.3em] uppercase">Begin The Journey</span>
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.4em] text-luxwhite/30 group-hover:text-luxwhite/60 transition-colors">Touch to start music</span>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom Detail */}
          <div className="absolute bottom-8 text-[9px] uppercase tracking-[0.6em] text-luxwhite/20">
            For Mom · With Love
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
