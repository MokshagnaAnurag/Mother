import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
}

export function AnimatedCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const particleId = useRef(0);

  useEffect(() => {
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;
    let raf = 0;
    
    const move = (e: MouseEvent) => { 
      mx = e.clientX; 
      my = e.clientY;
      if (dot.current) dot.current.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      
      // Spawn particles
      if (Math.random() > 0.6) {
        const id = particleId.current++;
        setParticles(prev => [...prev.slice(-15), { id, x: mx, y: my }]);
      }
    };

    const loop = () => {
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", move);
    raf = requestAnimationFrame(loop);
    
    return () => { 
      window.removeEventListener("mousemove", move); 
      cancelAnimationFrame(raf); 
    };
  }, []);

  return (
    <>
      <div ref={ring} className="pointer-events-none fixed left-0 top-0 z-[10001] h-10 w-10 rounded-full border border-rose/40 mix-blend-screen"
        style={{ boxShadow: "0 0 20px oklch(0.78 0.13 10 / .4), inset 0 0 15px oklch(0.78 0.13 10 / .2)" }} />
      
      <div ref={dot} className="pointer-events-none fixed left-0 top-0 z-[10002] h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_10px_#fff,0_0_20px_oklch(0.78_0.13_10)]" />
      
      <div className="pointer-events-none fixed inset-0 z-[10000] overflow-hidden">

        <AnimatePresence>
          {particles.map((p) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0.8, scale: 1 }}
              animate={{ opacity: 0, scale: 0, y: p.y + 20 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute h-1 w-1 rounded-full bg-rose/40 blur-[1px]"
              style={{ left: p.x, top: p.y }}
            />
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
