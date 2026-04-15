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
  level,
  wasCorrect,
  lives,
  onNext,
  isLastLevel,
}: Props) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">

      <Card className="bg-black/90 border-green-500/30 text-center max-w-md w-full">
        <CardContent className="p-8 space-y-4">

          <motion.div
            className={`text-5xl font-bold ${
              wasCorrect ? "text-green-400" : "text-red-500"
            }`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            {wasCorrect ? "✓" : "✗"}
          </motion.div>

          <h2 className="text-xl font-bold text-green-400">
            {wasCorrect ? "ACCESS GRANTED" : "ACCESS DENIED"}
          </h2>

          <p className="text-green-300/60 text-sm">
            {wasCorrect
              ? "Nodo desbloqueado"
              : `Te quedan ${lives} vidas`}
          </p>

          <Button onClick={onNext} className="w-full">
            {isLastLevel ? "FINAL RESULT" : "CONTINUE"}
          </Button>

        </CardContent>
      </Card>

    </div>
  );
}