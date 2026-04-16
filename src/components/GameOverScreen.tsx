import { useEffect } from "react";
import { motion } from "framer-motion";
import { Skull } from "lucide-react";
import { MatrixRain } from "./MatrixRain";
import { playGameOver } from "@/lib/sounds";
import { levels } from "@/data/levels";

type Props = {
  score: number;
  levelsCompleted: number;
  onRestart: () => void;
};

function getMessage(completed: number, total: number) {
  const pct = completed / total;

  if (pct >= 0.8)
    return {
      text: "¡Estuviste MUY cerca! Solo te faltó un poco más...",
      sub: "Casi lográs escapar. ¡Intentá de nuevo!",
    };

  if (pct >= 0.6)
    return {
      text: "¡Buen intento! Avanzaste bastante en la red.",
      sub: "Repasá algunos conceptos y volvé a intentar.",
    };

  if (pct >= 0.4)
    return {
      text: "Llegaste hasta la mitad del camino.",
      sub: "No te rindas, cada intento te acerca más a la salida.",
    };

  if (pct >= 0.2)
    return {
      text: "La red te atrapó rápido esta vez.",
      sub: "Revisá los temas y volvé con más fuerza.",
    };

  return {
    text: "La red te atrapó. No pudiste escapar.",
    sub: "Estudiá los conceptos y volvé a intentarlo.",
  };
}

export const GameOverScreen = ({
  score,
  levelsCompleted,
  onRestart,
}: Props) => {
  useEffect(() => {
    playGameOver();
  }, []);

  const msg = getMessage(levelsCompleted, levels.length);

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
            <span className="text-gray-400">Niveles completados:</span>
            <span className="text-green-400 font-bold">
              {levelsCompleted}/{levels.length}
            </span>
          </div>

          <div className="flex justify-between text-sm">
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