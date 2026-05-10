import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Star, Cloud, Lock, Unlock, CheckCircle2 } from "lucide-react";

const QUOTES = [
  {
    id: 1,
    text: "A mother's love is the fuel that enables a normal human being to do the impossible.",
    author: "Marion C. Garretty",
    icon: Heart,
    color: "from-rose/20 to-rose/5",
    glow: "oklch(0.78 0.13 10 / .15)",
    hint: "The Fuel of Life"
  },
  {
    id: 2,
    text: "To the world you are a mother, but to our family you are the world.",
    author: "Unknown",
    icon: Star,
    color: "from-gold/20 to-gold/5",
    glow: "oklch(0.88 0.10 85 / .15)",
    hint: "Our Entire World"
  },
  {
    id: 3,
    text: "Everything I am, or ever hope to be, I owe to my angel mother.",
    author: "Abraham Lincoln",
    icon: Cloud,
    color: "from-lavender/20 to-lavender/5",
    glow: "oklch(0.78 0.06 310 / .15)",
    hint: "My Angel Guide"
  }
];

export function QuoteCards() {
  const [revealed, setRevealed] = useState<number[]>([]);
  const [activeId, setActiveId] = useState<number | null>(null);

  const handleReveal = (id: number) => {
    if (!revealed.includes(id)) {
      setRevealed([...revealed, id]);
    }
    setActiveId(id);
  };

  const allRevealed = revealed.length === QUOTES.length;

  return (
    <div className="mt-20 flex flex-col items-center">
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mb-12 text-center"
      >
        <h3 className="font-display text-2xl tracking-[0.2em] text-luxwhite/80 uppercase mb-4">
          Memory Cards Game
        </h3>
        <p className="text-luxwhite/50 text-sm tracking-widest uppercase mb-6">
          Tap each heart to reveal a hidden message of love
        </p>
        
        {/* Progress Bar */}
        <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden mx-auto">
          <motion.div 
            className="h-full bg-gradient-to-r from-rose to-gold"
            initial={{ width: 0 }}
            animate={{ width: `${(revealed.length / QUOTES.length) * 100}%` }}
          />
        </div>
        <div className="mt-2 text-[10px] text-rose/60 tracking-widest uppercase">
          {revealed.length} of {QUOTES.length} Discovered
        </div>
      </motion.div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 w-full">
        {QUOTES.map((quote, i) => {
          const isRevealed = revealed.includes(quote.id);
          return (
            <motion.div
              key={quote.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => handleReveal(quote.id)}
              className={`relative cursor-pointer group aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br ${quote.color} p-8 backdrop-blur-xl transition-all duration-700 ${isRevealed ? "ring-2 ring-white/20" : "hover:ring-1 hover:ring-white/10"}`}
              style={{ boxShadow: isRevealed ? `0 30px 60px -10px ${quote.glow}` : "none" }}
            >
              <AnimatePresence mode="wait">
                {!isRevealed ? (
                  <motion.div
                    key="hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                    className="flex flex-col items-center justify-center h-full text-center"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="mb-6 p-6 rounded-full bg-white/5 border border-white/10"
                    >
                      <Lock className="text-luxwhite/20" size={40} />
                    </motion.div>
                    <span className="font-display text-sm uppercase tracking-[0.3em] text-luxwhite/40">
                      {quote.hint}
                    </span>
                    <div className="mt-8 flex gap-2">
                      {[1, 2, 3].map(j => (
                        <div key={j} className="w-1.5 h-1.5 rounded-full bg-white/10" />
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="revealed"
                    initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    className="relative z-10 flex flex-col h-full"
                  >
                    <div className="absolute -right-4 -top-4 opacity-10">
                      <quote.icon size={120} />
                    </div>

                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-luxwhite/80">
                      <quote.icon size={24} />
                    </div>

                    <p className="mb-8 font-display text-xl leading-relaxed text-luxwhite/90 md:text-2xl italic">
                      “{quote.text}”
                    </p>

                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-px w-8 bg-white/20" />
                        <span className="font-display text-xs uppercase tracking-widest text-luxwhite/50">
                          {quote.author}
                        </span>
                      </div>
                      <CheckCircle2 size={16} className="text-rose/60" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Hover Glow Effect */}
              {!isRevealed && (
                <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {allRevealed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-16 text-center"
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="inline-block px-10 py-5 rounded-full border border-rose/30 bg-rose/5 backdrop-blur-sm"
            >
              <p className="font-display text-xl tracking-widest text-rose uppercase">
                All Memories Found · You are Loved
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
