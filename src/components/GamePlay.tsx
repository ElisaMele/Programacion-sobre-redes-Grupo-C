import { useEffect, useRef, useState } from "react";
import type { Level } from "@/data/levels";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HUD } from "@/components/HUD";
import { TimerBar } from "@/components/TimerBar";

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

  useEffect(() => {
    setSelected(null);
    setRevealed(false);
    startTimeRef.current = Date.now();
  }, [level.id]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">

      <div className="w-full max-w-2xl space-y-4">

        <HUD
          level={currentLevel + 1}
          totalLevels={totalLevels}
          score={score}
          lives={lives}
        />

        <Card className="bg-black/80 border-green-500/20">
          <CardContent className="space-y-4 p-6">

            <TimerBar
              duration={TIMER_DURATION}
              isPaused={revealed || answered}
              onTimeUp={() => {
                if (!answered) onAnswer("timeout", 0);
              }}
            />

            <h1 className="text-green-400 font-bold text-lg">
              {level.title}
            </h1>

            <p className="text-green-300/70">
              {level.question}
            </p>

            <div className="space-y-2">
              {level.choices.map((choice) => (
                <Button
                  key={choice.id}
                  disabled={answered || revealed}
                  onClick={() => {
                    if (answered || revealed) return;

                    const elapsed = Math.floor(
                      (Date.now() - startTimeRef.current) / 1000
                    );

                    const timeLeft = Math.max(0, TIMER_DURATION - elapsed);

                    setSelected(choice.id);
                    setRevealed(true);

                    setTimeout(() => {
                      onAnswer(choice.id, timeLeft);
                    }, 600);
                  }}
                  className={`w-full justify-start ${
                    revealed
                      ? choice.id === level.correctAnswer
                        ? "bg-green-600"
                        : choice.id === selected
                          ? "bg-red-600"
                          : "bg-gray-800 opacity-50"
                      : "bg-green-500/10 hover:bg-green-500/20"
                  }`}
                >
                  {choice.text}
                </Button>
              ))}
            </div>

          </CardContent>
        </Card>

      </div>
    </div>
  );
}