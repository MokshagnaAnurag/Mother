import { motion } from "framer-motion";
import { wordChild, wordStagger, easeLux } from "@/lib/animationPresets";

const memories = [
  {
    chapter: "Chapter I",
    title: "The First Lullaby",
    text: "Before I knew the world, I knew the warmth of your voice — the first music my heart ever learned to dance to.",
    accent: "from-rose/30 via-rose/10 to-transparent",
  },
  {
    chapter: "Chapter II",
    title: "Hands That Held the Sky",
    text: "Every fall, your hands were already there — a quiet promise that nothing in this world could ever truly break me.",
    accent: "from-peach/30 via-peach/10 to-transparent",
  },
  {
    chapter: "Chapter III",
    title: "A Garden of Patience",
    text: "You watered every dream I dared to whisper, and waited — softly, endlessly — for me to bloom into who I am.",
    accent: "from-lavender/30 via-lavender/10 to-transparent",
  },
];

const QUOTES = [
  "In every smile of mine, there is a piece of you.",
  "You held my hand for a while, but my heart forever.",
  "Home is not a place. It is my mother.",
];

function CinematicQuote({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <motion.p
      variants={wordStagger}
      initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.6 }}
      className="mx-auto max-w-4xl px-6 text-center font-display text-3xl italic leading-tight text-luxwhite/90 md:text-5xl text-shadow-glow"
    >
      {words.map((w, i) => (
        <motion.span key={i} variants={wordChild} className="mr-[0.22em] inline-block will-transform">{w}</motion.span>
      ))}
    </motion.p>
  );
}

export function MemoryTimeline() {
  return (
    <section id="memories" className="relative py-24 md:py-32">
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.15 }}
          className="absolute top-1/4 left-0 w-full h-[50vh] bg-rose blur-[150px] rounded-full"
        />
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.1 }}
          className="absolute bottom-1/4 right-0 w-full h-[50vh] bg-gold blur-[150px] rounded-full"
        />
      </div>


      <div className="mx-auto mb-24 max-w-3xl px-6 text-center">
        <p className="mb-4 text-[10px] uppercase tracking-[0.5em] text-rose/80">Chapters of Her Love</p>
        <h2 className="font-display text-4xl text-luxwhite md:text-6xl text-shadow-glow">A Story Written in Light</h2>
      </div>

      <div className="space-y-24 md:space-y-32">

        {memories.map((m, i) => (
          <div key={i} className="mx-auto max-w-6xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 80, filter: "blur(20px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.4, ease: easeLux }}
              whileHover={{ rotateX: -3, rotateY: 4, scale: 1.015 }}
              style={{ transformStyle: "preserve-3d", transformPerspective: 1200 }}
              className={`glass relative overflow-hidden rounded-3xl p-10 md:p-16 ${i % 2 ? "md:ml-auto md:mr-0 md:max-w-3xl" : "md:max-w-3xl"}`}
            >
              <div className={`pointer-events-none absolute -inset-32 -z-10 bg-gradient-to-br ${m.accent}`} style={{ filter: "blur(80px)" }} />
              <p className="mb-3 text-[10px] uppercase tracking-[0.5em] text-luxwhite/50">{m.chapter}</p>
              <h3 className="font-display text-3xl text-luxwhite md:text-5xl">{m.title}</h3>
              <p className="mt-6 max-w-xl font-sans text-base leading-relaxed text-luxwhite/70 md:text-lg">{m.text}</p>
            </motion.div>

            {QUOTES[i] && (
              <div className="pt-24 md:pt-32">

                <CinematicQuote text={QUOTES[i]} />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
