import { useEffect } from "react";
import { motion } from "framer-motion";
import { Trophy, Star, } from "lucide-react";
import { MatrixRain } from "./MatrixRain";
import { playVictory } from "@/lib/sounds";
import type { Answer } from "@/hooks/useGameStore";

type Props = {
  score: number;
  answers: Answer[];
  onRestart: () => void;
};

export const VictoryScreen = ({ score, answers, onRestart }: Props) => {
  useEffect(() => {
    playVictory();
  }, []);

  const correctCount = answers.filter((a) => a.correct).length;

  const getRank = () => {
  const total = answers.length;
  const pct = correctCount / total;

  if (pct >= 0.9)
    return { title: "SYSADMIN LEGENDARIO", icon: "👑", color: "text-yellow-400" };

  if (pct >= 0.7)
    return { title: "NETWORK ENGINEER", icon: "🌟", color: "text-blue-400" };

  if (pct >= 0.5)
    return { title: "JUNIOR ADMIN", icon: "⚡", color: "text-cyan-400" };

  return { title: "TRAINEE", icon: "🔧", color: "text-gray-400" };
};

  const rank = getRank();

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      <MatrixRain />

      <motion.div
        className="relative z-10 text-center max-w-lg space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", damping: 10, delay: 0.3 }}
        >
          <Trophy className="w-20 h-20 text-yellow-400 mx-auto" />
        </motion.div>

        <motion.h1
          className="font-display text-3xl md:text-5xl font-black text-green-400 text-glow tracking-wider"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          ¡ESCAPASTE!
        </motion.h1>

        <motion.p
          className="text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Has logrado escapar de la red. Tu rango:
        </motion.p>

        <motion.div
          className={`font-display text-2xl font-bold ${rank.color}`}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
        >
          {rank.icon} {rank.title}
        </motion.div>

        <motion.div
          className="terminal-border bg-card/60 p-5 rounded-sm space-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <div className="flex justify-between text-sm">
            <span className="text-gray-400 flex items-center gap-2">
              <Star className="w-4 h-4" /> Respuestas correctas
            </span>
            <span className="text-green-400 font-bold">
              {correctCount}/{answers.length}
            </span>
          </div>

          <div className="flex justify-between text-sm border-t border-green-900 pt-3">
            <span className="text-gray-400">Puntaje total</span>
            <span className="text-green-400 text-lg font-bold">
              {score}
            </span>
          </div>
        </motion.div>

        <motion.button
          onClick={onRestart}
          className="px-8 py-3 bg-green-500 text-black font-bold tracking-wider rounded-sm hover:brightness-110"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {">"} JUGAR DE NUEVO {"<"}
        </motion.button>
      </motion.div>
    </div>
  );
};