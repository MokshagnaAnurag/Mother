import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AuroraBackground } from "@/components/AuroraBackground";
import { StarField } from "@/components/StarField";
import { FloatingPetals } from "@/components/FloatingPetals";
import { Hero } from "@/components/Hero";
import { MemoryTimeline } from "@/components/MemoryTimeline";
import { MemoryGame } from "@/components/MemoryGame";
import { DreamWorld } from "@/components/DreamWorld";
import { EmotionalLetter } from "@/components/EmotionalLetter";
import { FinalScene } from "@/components/FinalScene";
import { Loader } from "@/components/Loader";
import { MusicPlayer } from "@/components/MusicPlayer";
import { useLenis } from "@/lib/useLenis";

const AnimatedCursor = lazy(() => import("@/components/AnimatedCursor").then(m => ({ default: m.AnimatedCursor })));

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "For Mom · A Cinematic Letter of Love" },
      { name: "description", content: "An immersive, cinematic Mother's Day experience — written in light, music and memory." },
      { property: "og:title", content: "For Mom · A Cinematic Letter of Love" },
      { property: "og:description", content: "An immersive, cinematic Mother's Day experience — written in light, music and memory." },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Outfit:wght@300;400;500;600&display=swap" },
    ],
  }),
});

interface Sparkle {
  id: number;
  x: number;
  y: number;
}

function Index() {
  const [isStarted, setIsStarted] = useState(false);
  const [clickSparkles, setClickSparkles] = useState<Sparkle[]>([]);
  useLenis();

  useEffect(() => {
    const handleStart = () => setIsStarted(true);
    window.addEventListener("start-journey", handleStart);
    return () => window.removeEventListener("start-journey", handleStart);
  }, []);

  const handleClick = useCallback((e: React.MouseEvent) => {
    if (!isStarted) return;
    const id = Date.now();
    setClickSparkles(prev => [...prev.slice(-10), { id, x: e.clientX, y: e.clientY }]);
  }, [isStarted]);

  return (
    <main 
      onClick={handleClick}
      className="relative grain min-h-screen text-luxwhite overflow-x-hidden selection:bg-rose/30"
    >
      <Loader />
      <MusicPlayer />
      <Suspense fallback={null}><AnimatedCursor /></Suspense>
      <AuroraBackground />
      <StarField />
      <FloatingPetals />
      <div className="vignette" />

      {/* Global Interactive Sparkles */}
      <div className="pointer-events-none fixed inset-0 z-[50]">
        <AnimatePresence>
          {clickSparkles.map(s => (
            <motion.div
              key={s.id}
              initial={{ opacity: 1, scale: 0 }}
              animate={{ opacity: 0, scale: 4, y: s.y - 100, rotate: 45 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute h-4 w-4 text-rose/40"
              style={{ left: s.x, top: s.y }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <Hero isStarted={isStarted} />
      <MemoryTimeline />
      <MemoryGame />

      <DreamWorld />
      <EmotionalLetter />
      <FinalScene />

      <footer className="relative z-10 border-t border-white/5 px-6 py-10 text-center text-xs uppercase tracking-[0.4em] text-luxwhite/40">
        Made with love · For Mom · {new Date().getFullYear()}
      </footer>
    </main>
  );
}
