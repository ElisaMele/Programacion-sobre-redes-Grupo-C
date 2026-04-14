import { useState, useCallback } from "react";
import { levels } from "../data/levels";

export type GameState = "start" | "playing" | "result" | "wrong" | "gameover" | "victory";

export function useGameStore() {
  const [state, setState] = useState<GameState>("start");
  const [currentLevel, setCurrentLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [lastCorrect, setLastCorrect] = useState<boolean | null>(null);
  const [lastTimeLeft, setLastTimeLeft] = useState(0);

  const startGame = useCallback(() => {
    setState("playing");
    setCurrentLevel(0);
    setScore(0);
    setLives(3);
    setLastCorrect(null);
    setLastTimeLeft(0);
  }, []);

  const answerQuestion = useCallback((id: string, timeLeft: number) => {
    const current = levels[currentLevel];
    if (!current) return;

    const safeTime = Math.max(0, timeLeft);

    const correct =
      id !== "timeout" &&
      id === current.correctAnswer;

    setLastCorrect(correct);
    setLastTimeLeft(safeTime);

    if (correct) {
      const bonus = Math.floor(safeTime * 5);

      setScore((s) => s + 100 + bonus);
      setState("result");
      return;
    }

    setLives((l) => {
      const newLives = l - 1;

      if (newLives <= 0) {
        setState("gameover");
      } else {
        setState("wrong");
      }

      return newLives;
    });
  }, [currentLevel]);

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
    setLastCorrect(null);
    setLastTimeLeft(0);
  }, []);

  return {
    state,
    currentLevel,
    score,
    lives,
    lastCorrect,
    lastTimeLeft,
    startGame,
    answerQuestion,
    nextLevel,
    resetGame,
  };
}