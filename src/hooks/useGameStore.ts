import type { Level } from "@/data/levels";
import { useState, useCallback } from "react";
import { levels } from "@/data/levels";

function shuffleArray<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

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
  gameLevels: Level[];
  answers: Answer[];
  startGame: () => void;
  answerQuestion: (id: string, timeLeft: number) => void;
  nextLevel: () => void;
  resetGame: () => void;
  continueAfterWrong: () => void;
}

export function useGameStore(): GameStore {
  const [state, setState] = useState<GameState>("start");
  const [currentLevel, setCurrentLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [gameLevels, setGameLevels] = useState(levels);

  const startGame = useCallback(() => {
  const shuffled = shuffleArray(levels);
  const selected = shuffled.slice(0, 10);

  setGameLevels(selected);

  setState("playing");
  setCurrentLevel(0);
  setScore(0);
  setLives(3);
  setAnswers([]);
}, []);

  const answerQuestion = useCallback(
    (id: string, timeLeft: number) => {
      const current = gameLevels[currentLevel];
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
        const bonus = Math.floor(timeLeft * 10);
        setScore((s) => s + 100 + bonus);
        setState("result");
      } else {
        setLives((l) => {
          const newLives = l - 1;

          if (newLives <= 0) {
            setTimeout(() => setState("gameover"), 1500);
          }

          return newLives;
        });

        setState("wrong");
      }
    },
    [currentLevel, gameLevels]
  );

  const continueAfterWrong = useCallback(() => {
    setState("result");
  }, []);

  const nextLevel = useCallback(() => {
    setCurrentLevel((prev) => {
      const next = prev + 1;

      if (next >= gameLevels.length) {
        setState("victory");
        return prev;
      }

      setState("playing");
      return next;
    });
  }, [gameLevels]);

  const resetGame = useCallback(() => {
    setState("start");
    setCurrentLevel(0);
    setScore(0);
    setLives(3);
    setAnswers([]);
  }, []);

  return {
    state,
    currentLevel,
    score,
    lives,
    answers,
    gameLevels,
    startGame,
    answerQuestion,
    nextLevel,
    resetGame,
    continueAfterWrong,
  };
}