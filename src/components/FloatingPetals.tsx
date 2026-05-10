import { useMemo } from "react";

export function FloatingPetals({ count = 28 }: { count?: number }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * -20,
        duration: 18 + Math.random() * 22,
        size: 8 + Math.random() * 14,
        hue: Math.random() > 0.5 ? "rose" : "peach",
        drift: (Math.random() - 0.5) * 200,
      })),
    [count]
  );

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-[5] overflow-hidden">
      {petals.map((p) => (
        <span
          key={p.id}
          className="absolute top-[-10%] block will-transform"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 1.4,
            animation: `petalFall ${p.duration}s linear ${p.delay}s infinite`,
            // @ts-expect-error css var
            "--drift": `${p.drift}px`,
          }}
        >
          <svg viewBox="0 0 20 28" className="h-full w-full" style={{ filter: "drop-shadow(0 0 6px oklch(0.78 0.13 10 / .6))" }}>
            <path
              d="M10 0 C 16 8, 18 18, 10 28 C 2 18, 4 8, 10 0 Z"
              fill={p.hue === "rose" ? "oklch(0.82 0.13 10 / .85)" : "oklch(0.9 0.08 70 / .85)"}
            />
          </svg>
        </span>
      ))}
      <style>{`
        @keyframes petalFall {
          0% { transform: translate3d(0,0,0) rotate(0); opacity: 0; }
          10% { opacity: .9; }
          100% { transform: translate3d(var(--drift), 110vh, 0) rotate(540deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
