import { motion } from "framer-motion";
import nedryGif from "@/assets/nedry.gif";
import { useEffect, useRef } from "react";

interface WrongAnswerScreenProps {
  explanation: string;
  onContinue: () => void;
}

export function WrongAnswerScreen({
  explanation,
  onContinue,
}: WrongAnswerScreenProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

useEffect(() => {
  const audio = new Audio("/sounds/nedry.mp3");
  audioRef.current = audio;
  audio.play().catch(() => {});

  return () => {
    audio.pause();
    audio.currentTime = 0;
  };
}, []);

  const handleContinue = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    onContinue();
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 backdrop-blur-md px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 pointer-events-none bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,0,0,0.03)_2px,rgba(255,0,0,0.03)_4px)]" />

      <motion.div
        className="flex flex-col items-center max-w-md w-full"
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 12, stiffness: 180 }}
      >
        <motion.img
          src={nedryGif}
          alt="Nedry"
          className="w-52 h-52 md:w-64 md:h-64 object-contain rounded-lg mb-6"
          animate={{ rotate: [0, -2, 2, -2, 0] }}
          transition={{ repeat: Infinity, duration: 0.5, repeatDelay: 2 }}
        />

        <motion.h2
          className="text-3xl md:text-4xl font-bold text-red-500 tracking-wider text-center mb-2"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          AH AH AH!
        </motion.h2>

        <p className="text-lg text-white/80 text-center mb-6">
          You didn't say the magic word
        </p>

        <div className="border border-red-500/30 bg-red-500/10 rounded p-4 mb-6 w-full">
          <p className="font-bold text-sm mb-2 text-red-500">
            ✗ ACCESO DENEGADO
          </p>
          <p className="text-sm text-white/70 leading-relaxed">
            {explanation}
          </p>
        </div>

        <motion.button
          onClick={handleContinue}
          className="px-6 py-2 border border-red-500 text-red-500 hover:bg-red-500/10 rounded transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          [ CONTINUAR ]
        </motion.button>
      </motion.div>
    </motion.div>
  );
}