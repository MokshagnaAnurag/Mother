import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { easeLux } from "@/lib/animationPresets";

const ICONS = ["🌹", "💖", "🌸", "🕊️", "🌙", "✨"];

type Card = { id: number; icon: string; matched: boolean };

function shuffle(): Card[] {
  return [...ICONS, ...ICONS]
    .map((icon, i) => ({ id: i, icon, matched: false }))
    .sort(() => Math.random() - 0.5)
    .map((c, i) => ({ ...c, id: i }));
}

export function MemoryGame() {
  const [cards, setCards] = useState<Card[]>(() => shuffle());
  const [flipped, setFlipped] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [locked, setLocked] = useState(false);

  const won = useMemo(() => cards.every((c) => c.matched), [cards]);

  useEffect(() => {
    if (flipped.length !== 2) return;
    setLocked(true);
    const [a, b] = flipped;
    const t = setTimeout(() => {
      setCards((prev) => {
        if (prev[a].icon === prev[b].icon) {
          const next = [...prev];
          next[a] = { ...next[a], matched: true };
          next[b] = { ...next[b], matched: true };
          return next;
        }
        return prev;
      });
      setFlipped([]);
      setMoves((m) => m + 1);
      setLocked(false);
    }, 750);
    return () => clearTimeout(t);
  }, [flipped]);

  const flip = (i: number) => {
    if (locked || flipped.includes(i) || cards[i].matched) return;
    setFlipped((f) => [...f, i]);
  };

  const reset = () => {
    setCards(shuffle());
    setFlipped([]);
    setMoves(0);
  };

  return (
    <section className="relative py-20 md:py-32">

      <div className="mx-auto mb-14 max-w-3xl px-6 text-center">
        <p className="mb-4 text-[10px] uppercase tracking-[0.5em] text-rose/80">A Little Game of Love</p>
        <h2 className="font-display text-4xl text-luxwhite md:text-6xl text-shadow-glow">
          Match the Memories
        </h2>
        <p className="mt-5 text-luxwhite/60">Flip the cards. Find the pairs. Every match is a memory.</p>
      </div>

      <div className="mx-auto grid max-w-2xl grid-cols-3 gap-3 px-6 sm:gap-4 md:grid-cols-4">
        {cards.map((card, i) => {
          const isUp = flipped.includes(i) || card.matched;
          return (
            <motion.button
              key={card.id}
              onClick={() => flip(i)}
              whileHover={{ scale: isUp ? 1 : 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="relative aspect-square w-full"
              style={{ perspective: 1000 }}
            >
              <motion.div
                className="relative h-full w-full"
                animate={{ rotateY: isUp ? 180 : 0 }}
                transition={{ duration: 0.6, ease: easeLux }}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Back */}
                <div
                  className="glass absolute inset-0 flex items-center justify-center rounded-2xl"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <span
                    className="font-display text-3xl italic text-rose/80"
                    style={{ textShadow: "0 0 18px oklch(0.78 0.13 10 / .7)" }}
                  >
                    M
                  </span>
                </div>
                {/* Front */}
                <div
                  className="absolute inset-0 flex items-center justify-center rounded-2xl"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                    background:
                      "linear-gradient(135deg, oklch(0.78 0.13 10 / .25), oklch(0.78 0.06 310 / .15))",
                    border: "1px solid oklch(1 0 0 / .12)",
                    boxShadow: card.matched
                      ? "0 0 40px oklch(0.88 0.10 85 / .55), inset 0 0 30px oklch(0.78 0.13 10 / .25)"
                      : "0 10px 40px -10px oklch(0.78 0.13 10 / .35)",
                  }}
                >
                  <span className="text-3xl md:text-4xl">{card.icon}</span>
                </div>
              </motion.div>
            </motion.button>
          );
        })}
      </div>

      <div className="mx-auto mt-10 flex max-w-2xl items-center justify-between px-6 text-sm text-luxwhite/70">
        <span className="uppercase tracking-[0.3em] text-xs">Moves · {moves}</span>
        <button
          onClick={reset}
          className="glass rounded-full px-5 py-2 text-xs uppercase tracking-[0.3em] text-luxwhite/80 transition hover:text-luxwhite"
        >
          Shuffle
        </button>
      </div>

      <AnimatePresence>
        {won && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: easeLux }}
            className="mx-auto mt-12 max-w-xl px-6 text-center"
          >
            <p className="font-display text-2xl italic text-luxwhite md:text-3xl text-shadow-glow">
              Every memory found — just like she always finds her way to your heart. 💖
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
