export function AuroraBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#050505]">
      <div className="absolute inset-0 opacity-90"
        style={{
          background:
            "radial-gradient(60% 50% at 20% 30%, oklch(0.78 0.13 10 / .35), transparent 60%), radial-gradient(50% 40% at 80% 20%, oklch(0.78 0.06 310 / .35), transparent 60%), radial-gradient(70% 60% at 60% 90%, oklch(0.88 0.10 85 / .25), transparent 60%)",
          filter: "blur(80px)",
          mixBlendMode: "screen",
          animation: "auroraShift 22s ease-in-out infinite",
        }}
      />
      <div className="absolute inset-0"
        style={{
          background:
            "radial-gradient(40% 30% at 75% 70%, oklch(0.78 0.13 10 / .3), transparent 70%), radial-gradient(40% 30% at 15% 80%, oklch(0.78 0.06 310 / .25), transparent 70%)",
          filter: "blur(120px)",
          mixBlendMode: "screen",
          animation: "auroraShift 30s ease-in-out infinite reverse",
        }}
      />
      {/* Vignette */}
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 40%, #050505 100%)" }} />
    </div>
  );
}
