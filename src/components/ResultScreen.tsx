import { motion } from "framer-motion";
import type { Level } from "@/data/levels";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Props = {
  level: Level;
  wasCorrect: boolean;
  lives: number;
  onNext: () => void;
  isLastLevel: boolean;
};

export function ResultScreen({
  wasCorrect,
  lives,
  onNext,
  isLastLevel,
}: Props) {
  return (
    <motion.div
      className="min-h-screen flex items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Card className=" text-center">
        <CardContent className="p-8 space-y-6">

          <motion.div
            className={`text-6xl font-bold ${
              wasCorrect ? "text-green-400" : "text-red-500"
            }`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 10 }}
          >
            {wasCorrect ? "✓" : "✗"}
          </motion.div>

          <h2
            className={`text-2xl font-bold tracking-wider ${
              wasCorrect ? "text-green-400" : "text-red-500"
            }`}
          >
            {wasCorrect
              ? "NODO DESBLOQUEADO"
              : "ACCESO DENEGADO"}
          </h2>

          <p className="text-green-300/70 text-sm">
            {wasCorrect
              ? "Has avanzado al siguiente nodo de la red."
              : `Te quedan ${lives} vida${lives !== 1 ? "s" : ""}.`}
          </p>

          {wasCorrect && (
            <motion.div
              className="border border-green-500/30 bg-green-500/5 p-4 rounded"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="text-green-400 font-bold text-sm">
                ✓ ACCESO CONCEDIDO
              </p>
            </motion.div>
          )}

          {lives > 0 && (
            <Button
              onClick={onNext}
              className={`w-full font-bold tracking-wider ${
                wasCorrect
                  ? "bg-green-500 hover:bg-green-400 text-black"
                  : "bg-red-500 hover:bg-red-400 text-black"
              }`}
            >
              {isLastLevel && wasCorrect
                ? "> RESULTADO FINAL <"
                : "> CONTINUAR <"}
            </Button>
          )}

        </CardContent>
      </Card>
    </motion.div>
  );
}