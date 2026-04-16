import { motion } from "framer-motion";
import type { Level } from "@/data/levels";

type Props = {
  level: Level;
  wasCorrect: boolean;
  lives: number;
  onNext: () => void;
  isLastLevel: boolean;
};

export function ResultScreen({
  level,
  wasCorrect,
  lives,
  onNext,
  isLastLevel,
}: Props) {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="text-center max-w-md space-y-6">

        <motion.div
          className={`font-display text-6xl ${
            wasCorrect ? "text-green-400" : "text-red-500"
          }`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 10 }}
        >
          {wasCorrect ? "✓" : "✗"}
        </motion.div>

        <h2
          className={`font-display text-2xl font-bold ${
            wasCorrect ? "text-green-400" : "text-red-500"
          }`}
        >
          {wasCorrect
            ? "NODO DESBLOQUEADO"
            : "CONEXIÓN FALLIDA"}
        </h2>

        <p className="text-green-300/70 text-sm">
          {wasCorrect
            ? "Has avanzado al siguiente nodo de la red."
            : `Has perdido una vida. Te quedan ${lives} vida${lives !== 1 ? "s" : ""}.`}
        </p>

        {!wasCorrect && (
          <motion.div
            className="border border-red-500/40 bg-black/60 p-4 rounded-none"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-green-400 font-bold text-sm mb-2">
              ✓ RESPUESTA CORRECTA
            </p>
            <p className="text-green-300 text-sm leading-relaxed">
              {level.explanation}
            </p>
          </motion.div>
        )}

        {lives > 0 && (
          <motion.button
            onClick={onNext}
            className={`px-8 py-3 font-display font-bold rounded-none tracking-wider transition-all ${
              wasCorrect
                ? "bg-green-500 text-black hover:bg-green-400"
                : "bg-red-500 text-black hover:bg-red-400"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isLastLevel && wasCorrect
              ? "> RESULTADO FINAL <"
              : "> CONTINUAR <"}
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}