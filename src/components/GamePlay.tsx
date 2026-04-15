import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Level } from "@/data/levels";

import { TimerBar } from "@/components/TimerBar";
import { HUD } from "@/components/HUD";

type Props = {
  level: Level;
  currentLevel: number;
  totalLevels: number;
  score: number;
  lives: number;
  answered: boolean;
  onAnswer: (id: string, timeLeft: number) => void;
};

export function GamePlay({
  level,
  currentLevel,
  totalLevels,
  score,
  lives,
  answered,
  onAnswer,
}: Props) {
  const TIMER_DURATION = 60;
  const startTimeRef = useRef(Date.now());

  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);

  useEffect(() => {
  if (revealed || answered) return;

  const interval = setInterval(() => {
    setTimeLeft((prev) => {
      if (prev <= 1) {
        clearInterval(interval);
        onAnswer("timeout", 0);
        return 0;
      }
      return prev - 1;
    });
  }, 1000);

  return () => clearInterval(interval);
}, [revealed, answered, onAnswer]);

  useEffect(() => {
    setSelected(null);
    setRevealed(false);
    startTimeRef.current = Date.now();
    setTimeLeft(TIMER_DURATION);
  }, [level.id]);

  const handleSelect = (choiceId: string) => {
  if (revealed || answered) return;

  const currentTimeLeft = timeLeft;

  setSelected(choiceId);
  setRevealed(true);

  setTimeout(() => {
    onAnswer(choiceId, currentTimeLeft);
  }, 600);
};

  return (
    <div className="min-h-screen flex flex-col">

      <HUD
        level={currentLevel + 1}
        totalLevels={totalLevels}
        score={score}
        lives={lives}
      />

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-6 max-w-3xl mx-auto w-full">

        <AnimatePresence mode="wait">
          <motion.div
            key={level.id}
            className="w-full space-y-6"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
          >

            <div className="text-center space-y-2">
              <h2 className="text-xl md:text-2xl font-bold text-green-400">
                [{level.title}]
              </h2>
            </div>

            <p className="text-green-400 text-sm text-center">
              Tiempo restante: {timeLeft}s
            </p>

            <TimerBar
              duration={TIMER_DURATION}
              isPaused={revealed || answered}
              onTimeUp={() => {
                if (!answered) onAnswer("timeout", 0);
              }}
            />

            <div className="border border-green-500/30 bg-black/60 p-5 rounded">
              <p className="text-green-300 text-base md:text-lg leading-relaxed">
                <span className="text-green-500 mr-2">$</span>
                {level.question}
              </p>
            </div>

            <div className="grid gap-3">
              {level.choices.map((choice, i) => {
                const isCorrect = choice.id === level.correctAnswer;
                const isSelected = choice.id === selected;

                let style =
                  "border border-green-500/20 bg-black/40 hover:bg-green-500/10";

                if (revealed) {
                  if (isCorrect) {
                    style = "border-green-500 bg-green-500/10";
                  } else if (isSelected) {
                    style = "border-red-500 bg-red-500/10";
                  } else {
                    style = "opacity-50";
                  }
                }

                return (
                  <motion.button
                    key={choice.id}
                    onClick={() => handleSelect(choice.id)}
                    disabled={revealed || answered}
                    className={`w-full text-left p-4 rounded transition-all ${style}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * i }}
                    whileHover={!revealed ? { scale: 1.02 } : {}}
                    whileTap={!revealed ? { scale: 0.98 } : {}}
                  >
                    <span className="text-green-500 mr-3">
                      [{choice.id.toUpperCase()}]
                    </span>
                    <span>{choice.text}</span>
                  </motion.button>
                );
              })}
            </div>

            <AnimatePresence>
              {revealed && selected === level.correctAnswer && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="p-4 border border-green-500 bg-green-500/5 rounded"
                >
                  <p className="font-bold text-green-400 mb-2">
                    ✓ ACCESO CONCEDIDO
                  </p>
                  <p className="text-green-300/70 text-sm">
                    {level.explanation}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        </AnimatePresence>

      </div>
    </div>
  );
}