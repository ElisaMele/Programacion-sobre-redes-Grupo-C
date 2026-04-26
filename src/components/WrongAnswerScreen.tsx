import { motion } from "framer-motion";
import { useEffect, useRef, useMemo, useState } from "react";

import nedryGif from "@/assets/nedry.gif";
import toyStoryGif from "@/assets/algo-anda-mal-toy-story.gif";
import jjjGif from "@/assets/jonah-jameson.gif";

interface WrongAnswerScreenProps {
  explanation: string;
  onContinue: () => void;
  isLastLife?: boolean;
}

type Meme = {
  gif: string;
  audio: string;
  title: string;
  subtitle: string;
};

const MEMES: Meme[] = [
  {
    gif: nedryGif,
    audio: "/sounds/nedry.mp3",
    title: "AH AH AH!",
    subtitle: "You didn't say the magic word",
  },
  {
    gif: toyStoryGif,
    audio: "/sounds/algo-anda-mal.mp3",
    title: "Algo anda mal...",
    subtitle: "Esto no debería pasar 🤨",
  },
  {
    gif: jjjGif,
    audio: "/sounds/j-jonah-jameson-laugh.mp3",
    title: "Jajajajaja",
    subtitle: "¿En serio elegiste eso?",
  },
];

let memeBag: number[] = [];

function getNextMemeIndex() {
  if (memeBag.length === 0) {
    memeBag = [...Array(MEMES.length).keys()]
      .sort(() => Math.random() - 0.5);
  }

  return memeBag.pop()!;
}

export function WrongAnswerScreen({
  explanation,
  onContinue,
  isLastLife = false,
}: WrongAnswerScreenProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [canContinue, setCanContinue] = useState(false);

  const meme = useMemo(() => {
  const index = getNextMemeIndex();
  return MEMES[index];
}, []);

  useEffect(() => {
    const audio = new Audio(meme.audio);
    audioRef.current = audio;
    audio.play().catch(() => {});

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [meme]);

  useEffect(() => {
    const delay = isLastLife ? 3500 : 1500;

    const timer = setTimeout(() => {
      setCanContinue(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [isLastLife]);

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
          src={meme.gif}
          alt="meme"
          className="w-52 h-52 md:w-64 md:h-64 object-contain rounded-lg mb-6"
        />

        <motion.h2
          className="text-3xl md:text-4xl font-bold text-red-500 tracking-wider text-center mb-2"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          {meme.title}
        </motion.h2>

        <p className="text-lg text-white/80 text-center mb-6">
          {meme.subtitle}
        </p>

        <div className="border border-red-500/30 bg-red-500/10 rounded-none p-4 mb-6 w-full">
          <p className="font-bold text-sm mb-2 text-red-500">
            ✗ ACCESO DENEGADO
          </p>
          <p className="text-sm text-white/70 leading-relaxed">
            {explanation}
          </p>
        </div>

        <motion.button
          onClick={onContinue}
          disabled={!canContinue}
          className={`px-6 py-2 border border-red-500 rounded-none transition-all
            ${
              canContinue
                ? "text-red-500 hover:bg-red-500/10"
                : "text-red-500/40 cursor-not-allowed"
            }`}
          whileHover={canContinue ? { scale: 1.05 } : {}}
          whileTap={canContinue ? { scale: 0.95 } : {}}
        >
          {isLastLife ? "[ VER RESULTADO ]" : "[ CONTINUAR ]"}
        </motion.button>
      </motion.div>
    </motion.div>
  );
}