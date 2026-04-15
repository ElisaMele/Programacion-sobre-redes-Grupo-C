import { useState, useCallback, useEffect } from "react";
import { levels } from "@/data/levels";

export type GameState =
  | "start"
  | "playing"
  | "result"
  | "wrong"
  | "gameover"
  | "victory";

export type Answer = {
  levelId: number;
  correct: boolean;
  timeLeft: number;
};

interface GameStore {
  state: GameState;
  currentLevel: number;
  score: number;
  lives: number;
  answers: Answer[];
  startGame: () => void;
  answerQuestion: (id: string, timeLeft: number) => void;
  nextLevel: () => void;
  resetGame: () => void;
}

export function useGameStore(): GameStore {
  const [state, setState] = useState<GameState>("start");
  const [currentLevel, setCurrentLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [answers, setAnswers] = useState<Answer[]>([]);

  const startGame = useCallback(() => {
    setState("playing");
    setCurrentLevel(0);
    setScore(0);
    setLives(3);
    setAnswers([]);
  }, []);

  const answerQuestion = useCallback(
    (id: string, timeLeft: number) => {
      const current = levels[currentLevel];
      if (!current) return;

      const correct =
        id !== "timeout" && id === current.correctAnswer;

      setAnswers((prev) => [
        ...prev,
        {
          levelId: currentLevel,
          correct,
          timeLeft,
        },
      ]);

      if (correct) {
        setScore((s) => s + 100 + timeLeft * 5);
        setState("result");
      } else {
        setLives((l) => Math.max(0, l - 1));
        setState("wrong");
      }
    },
    [currentLevel]
  );

  const nextLevel = useCallback(() => {
    setCurrentLevel((prev) => {
      const next = prev + 1;

      if (next >= levels.length) {
        setState("victory");
        return prev;
      }

      setState("playing");
      return next;
    });
  }, []);

  const resetGame = useCallback(() => {
    setState("start");
    setCurrentLevel(0);
    setScore(0);
    setLives(3);
    setAnswers([]);
  }, []);

  useEffect(() => {
    if (lives <= 0) {
      setState("gameover");
    }
  }, [lives]);

  return {
    state,
    currentLevel,
    score,
    lives,
    answers,
    startGame,
    answerQuestion,
    nextLevel,
    resetGame,
  };
}