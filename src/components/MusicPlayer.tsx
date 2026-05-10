import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Music, Volume2, VolumeX } from "lucide-react";
import musicFile from "@/music/Pedave Palikina-SenSongsMp3.Co.mp3";

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = true;
      audioRef.current.volume = 0.55;
    }

    const handleStartMusic = () => {
      if (audioRef.current) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(err => console.error("Audio play failed:", err));
      }
    };

    window.addEventListener("start-music", handleStartMusic);
    return () => {
      window.removeEventListener("start-music", handleStartMusic);
      audioRef.current?.pause();
    };
  }, []);

  const togglePlayback = async () => {
    if (!audioRef.current) return;
    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (err) {
      console.error("Playback toggle failed:", err);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.2, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-8 left-8 z-[100] flex items-center gap-3 rounded-full border border-white/10 bg-black/20 px-4 py-2.5 backdrop-blur-md shadow-2xl"
    >
      <audio 
        ref={audioRef} 
        src={musicFile} 
        onCanPlayThrough={() => setReady(true)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      
      <button
        onClick={togglePlayback}
        aria-label={isPlaying ? "Pause music" : "Play music"}
        className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-rose to-lavender text-[#1a0d14] transition-transform hover:scale-105 active:scale-95 shadow-lg"
      >
        {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
      </button>

      <div className="flex items-center gap-1 pr-2">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.span
            key={i}
            className="block w-[3px] rounded-full bg-rose/80"
            animate={isPlaying && !isMuted ? { height: [6, 18, 9, 22, 8], opacity: [.6, 1, .7, 1, .6] } : { height: 6, opacity: .4 }}
            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.12, ease: "easeInOut" }}
            style={{ height: 6 }}
          />
        ))}
      </div>

      <button
        onClick={toggleMute}
        className="text-luxwhite/60 hover:text-luxwhite transition-colors p-1"
      >
        {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </button>

      <div className="hidden pr-2 text-[10px] uppercase tracking-[0.3em] text-luxwhite/50 sm:block">
        {ready ? (isPlaying ? "Now Playing" : "Paused") : "Loading Audio"}
      </div>
    </motion.div>
  );
}

