import { useEffect } from "react";
import { motion } from "framer-motion";
import { Skull } from "lucide-react";
import { MatrixRain } from "./MatrixRain";
import { playGameOver } from "@/lib/sounds";
import type { Answer } from "@/hooks/useGameStore";

type Props = {
  score: number;
  levelsCompleted: number;
  totalLevels: number;
  answers: Answer[];
  onRestart: () => void;
};

function getMessage(correctCount: number, total: number) {
  const pct = correctCount / total;

  if (pct >= 0.8)
    return {
      text: "¡Estuviste MUY cerca! Solo te faltó un poco más...",
      sub: "Casi lográs escapar. ¡Intentá de nuevo!",
    };

  if (pct >= 0.6)
    return {
      text: "¡Buen intento! Tenés una base sólida.",
      sub: "Con un poco más de práctica, lo resolvés.",
    };

  if (pct >= 0.4)
    return {
      text: "Vas bien, pero te falta afinar conceptos.",
      sub: "Seguí intentando, estás en camino.",
    };

  if (pct >= 0.2)
    return {
      text: "La red te complicó bastante esta vez.",
      sub: "Repasá los temas clave y volvé a intentar.",
    };

  return {
    text: "La red te atrapó rápido.",
    sub: "Necesitás reforzar las bases.",
  };
}

export const GameOverScreen = ({
  score,
  levelsCompleted,
  totalLevels,
  answers,
  onRestart,
}: Props) => {
  useEffect(() => {
    playGameOver();
  }, []);

  const correctCount = answers.filter((a) => a.correct).length;
  const msg = getMessage(correctCount, totalLevels);

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      <MatrixRain />

      <motion.div
        className="relative z-10 text-center max-w-md space-y-6"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          animate={{ rotate: [0, 6, -6, 0] }}
          transition={{ duration: 0.4, repeat: 2 }}
        >
          <Skull className="w-20 h-20 text-red-600 mx-auto" />
        </motion.div>

        <h1 className="text-4xl md:text-5xl font-black text-red-600 tracking-widest">
          GAME OVER
        </h1>

        <p className="text-lg text-gray-200">{msg.text}</p>
        <p className="text-sm text-gray-400">{msg.sub}</p>

        <div className="bg-black/80 border border-green-900 p-4 rounded-sm space-y-2">
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Progreso:</span>
            <span className="text-green-400 font-bold">
              {levelsCompleted}/{totalLevels}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Correctas:</span>
            <span className="text-green-400 font-bold">
              {correctCount}/{totalLevels}
            </span>
          </div>

          <div className="flex justify-between text-sm border-t border-green-900 pt-2">
            <span className="text-gray-400">Puntaje final:</span>
            <span className="text-green-400 font-bold">
              {score}
            </span>
          </div>

        </div>

        <motion.button
          onClick={onRestart}
          className="px-8 py-3 bg-red-600 text-black font-bold tracking-wider rounded-sm hover:brightness-110"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {">"} REINTENTAR {"<"}
        </motion.button>
      </motion.div>
    </div>
  );
};