import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { QuoteCards } from "./QuoteCards";

const FULL = "No matter how old I grow, I will always need your love.";

export function EmotionalLetter() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [shown, setShown] = useState("");

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setShown(FULL.slice(0, i));
      if (i >= FULL.length) clearInterval(id);
    }, 55);
    return () => clearInterval(id);
  }, [inView]);

  return (
    <section ref={ref} className="relative flex flex-col items-center overflow-hidden px-6 py-24">

      <div className="absolute inset-0 -z-10"
        style={{ background: "radial-gradient(ellipse at center, oklch(0.16 0.04 320) 0%, #050505 70%)" }} />

      <motion.div
        initial={{ opacity: 0, y: 60, rotate: -1.5 }}
        whileInView={{ opacity: 1, y: 0, rotate: -1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-w-2xl w-full"
      >
        <div
          className="relative rounded-sm px-10 py-16 md:px-20 md:py-24"
          style={{
            background:
              "linear-gradient(180deg, #f6efe1 0%, #efe5d1 100%)",
            boxShadow:
              "0 30px 100px -20px oklch(0.78 0.13 10 / .55), 0 0 80px oklch(0.88 0.10 85 / .25), inset 0 0 60px oklch(0.78 0.06 310 / .15)",
          }}
        >
          <p className="mb-6 font-display text-xs uppercase tracking-[0.4em] text-[#7a2540]">
            A Letter, From My Heart
          </p>
          <p className="font-display text-2xl italic leading-relaxed text-[#2a1620] md:text-4xl">
            “{shown}
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.9, repeat: Infinity }}
              className="ml-0.5 inline-block w-[2px] bg-[#7a2540]"
              style={{ height: "1em", verticalAlign: "-0.15em" }}
            />
            ”
          </p>
          <p className="mt-10 text-right font-display text-xl italic text-[#7a2540]">— with all my love</p>
        </div>
      </motion.div>

      <div className="w-full max-w-6xl">
        <QuoteCards />
      </div>
    </section>
  );
}

