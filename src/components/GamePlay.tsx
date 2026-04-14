import type { Level } from "../data/levels";
import { useRef } from "react";
import { TimerBar } from "../components/TimerBar";

type Props = {
  level: Level;
  currentLevel: number;
  totalLevels: number;
  lives: number;
  score: number;
  answered: boolean;
  onAnswer: (id: string, timeLeft: number) => void;
};

export const GamePlay = ({
  level,
  currentLevel,
  totalLevels,
  lives,
  score,
  answered,
  onAnswer,
}: Props) => {

  const TIMER_DURATION = 60;
  const startTimeRef = useRef(Date.now());

  return (
    <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">
      <div className="bg-gray-800 p-6 rounded-xl w-full max-w-md">

        {/* HUD */}
        <div className="mb-4 text-center">
          <p>Nivel {currentLevel + 1} / {totalLevels}</p>
          <p>⭐ {score}</p>
          <p>❤️ {lives}</p>

          <TimerBar
            duration={TIMER_DURATION}
            isPaused={answered}
            onTimeUp={() => {
  if (!answered) onAnswer("timeout", 0);
}}
          />
        </div>

        {/* Pregunta */}
        <h1 className="text-xl font-bold mb-2">{level.title}</h1>
        <p className="mb-2">{level.question}</p>

        {/* Respuestas */}
        <div className="space-y-2">
          {level.choices.map((choice) => (
            <button
              key={choice.id}
              disabled={answered}
              onClick={() => {
                if (answered) return;

                const elapsed = Math.floor(
                    (Date.now() - startTimeRef.current) / 1000
                      );

                      const timeLeft = Math.max(0, TIMER_DURATION - elapsed);

                    onAnswer(choice.id, timeLeft);

              }}
              className={`w-full p-2 rounded transition ${
                answered
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {choice.text}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};