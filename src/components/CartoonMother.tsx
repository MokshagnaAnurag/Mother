import { motion } from "framer-motion";
import { useState } from "react";

export function CartoonMother() {
  const [hover, setHover] = useState(false);
  return (
    <motion.div
      className="relative mx-auto h-[520px] w-[420px] max-w-full will-transform"
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Aura */}
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-10 rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, oklch(0.78 0.13 10 / .55), transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={{ scale: hover ? 1.15 : 1, opacity: hover ? 1 : 0.75 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Floating hearts on hover */}
      {hover && Array.from({ length: 6 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute text-rose"
          initial={{ opacity: 0, y: 0, x: 0, scale: 0.6 }}
          animate={{ opacity: [0, 1, 0], y: -160 - i * 10, x: (i - 3) * 18, scale: 1 }}
          transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.3, ease: "easeOut" }}
          style={{ left: "50%", top: "55%", filter: "drop-shadow(0 0 10px oklch(0.78 0.13 10 / .9))" }}
        >
          ♥
        </motion.span>
      ))}

      <svg viewBox="0 0 420 520" className="h-full w-full">
        <defs>
          <radialGradient id="skin" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#ffe0c2" />
            <stop offset="100%" stopColor="#e8b890" />
          </radialGradient>
          <linearGradient id="dress" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#ff8fab" />
            <stop offset="100%" stopColor="#cdb4db" />
          </linearGradient>
          <linearGradient id="hair" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#3b1f2b" />
            <stop offset="100%" stopColor="#1a0d14" />
          </linearGradient>
          <radialGradient id="cheek" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ff8fab" stopOpacity=".7" />
            <stop offset="100%" stopColor="#ff8fab" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Dress / body */}
        <motion.g
          animate={{ scale: [1, 1.015, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "210px 380px" }}
        >
          <path d="M120 360 C 150 300, 270 300, 300 360 L 340 500 L 80 500 Z" fill="url(#dress)" />
          {/* shoulders */}
          <path d="M150 320 C 180 300, 240 300, 270 320 L 260 360 L 160 360 Z" fill="url(#dress)" opacity=".9" />
        </motion.g>

        {/* Hair back */}
        <path d="M120 200 C 100 270, 120 340, 160 340 L 260 340 C 300 340, 320 270, 300 200 Z" fill="url(#hair)" />

        {/* Head */}
        <motion.g
          animate={{ rotate: [-2, 2, -2] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "210px 230px" }}
        >
          <ellipse cx="210" cy="230" rx="78" ry="92" fill="url(#skin)" />

          {/* Hair top */}
          <path d="M132 220 C 130 150, 180 110, 210 110 C 240 110, 295 145, 290 220 C 270 180, 230 170, 210 175 C 190 170, 150 180, 132 220 Z" fill="url(#hair)" />

          {/* Cheeks */}
          <ellipse cx="170" cy="252" rx="14" ry="9" fill="url(#cheek)" />
          <ellipse cx="250" cy="252" rx="14" ry="9" fill="url(#cheek)" />

          {/* Eyes (blink) */}
          <motion.g style={{ transformOrigin: "180px 232px", animation: "blink 5s infinite" }}>
            <ellipse cx="180" cy="232" rx="7" ry="9" fill="#1a0d14" />
            <circle cx="182" cy="229" r="2" fill="#fff" />
          </motion.g>
          <motion.g style={{ transformOrigin: "240px 232px", animation: "blink 5s infinite" }}>
            <ellipse cx="240" cy="232" rx="7" ry="9" fill="#1a0d14" />
            <circle cx="242" cy="229" r="2" fill="#fff" />
          </motion.g>

          {/* Eyebrows */}
          <path d="M165 215 q 15 -8 30 0" stroke="#1a0d14" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M225 215 q 15 -8 30 0" stroke="#1a0d14" strokeWidth="3" fill="none" strokeLinecap="round" />

          {/* Smile */}
          <motion.path
            d="M188 278 Q 210 295 232 278"
            stroke="#7a2540" strokeWidth="3" fill="none" strokeLinecap="round"
            animate={{ d: hover ? "M184 276 Q 210 305 236 276" : "M188 278 Q 210 295 232 278" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Nose */}
          <path d="M210 248 q -3 12 0 18" stroke="#c98f6c" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </motion.g>

        {/* Earrings */}
        <circle cx="135" cy="252" r="3" fill="#f8d49d" />
        <circle cx="285" cy="252" r="3" fill="#f8d49d" />

        {/* Hand on heart */}
        <motion.g
          animate={{ rotate: [-3, 3, -3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "210px 410px" }}
        >
          <path d="M180 380 q 30 -10 60 0 q 5 30 -30 40 q -35 -10 -30 -40 Z" fill="url(#skin)" />
          <path d="M210 395 a 8 8 0 1 0 0.1 0 Z M210 395 a 8 8 0 1 1 -0.1 0 Z" fill="#ff8fab" transform="translate(0,5)" />
        </motion.g>
      </svg>
    </motion.div>
  );
}
