import { levels } from "../data/levels";
import { useState } from "react";
import { StartScreen } from "../components/StartScreen";
import { GamePlay } from "../components/GamePlay";
import { ResultScreen } from "../components/ResultScreen";
import { GameOverScreen } from "../components/GameOverScreen";
import { VictoryScreen } from "../components/VictoryScreen";

const Index = () => {

  const [currentLevel, setCurrentLevel] = useState(0);
  const [gameState, setGameState] = useState("start");
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | null>(null);
  const [answered, setAnswered] = useState(false);
  const level = levels[currentLevel];
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  if (gameState === "start") {
  return (
    <StartScreen
      onStart={() => setGameState("playing")}
      totalLevels={levels.length}
    />
  );
}

const handleAnswer = (id: string) => {
  if (answered) return;

  setAnswered(true);
  setSelectedAnswer(id);

  const isCorrect = id === level.correctAnswer;
  setLastAnswerCorrect(isCorrect);

  if (isCorrect) {
    setScore((prev) => prev + 150);
    setTimeout(() => {
      setGameState("result");
      setAnswered(false);
    }, 500);
  } else {

    const newLives = lives - 1;
    setLives(newLives);

    if (newLives <= 0) {

      setTimeout(() => setGameState("gameover"), 500);
    } else {

      setTimeout(() => setGameState("result"), 500);
    }

    setTimeout(() => setAnswered(false), 500);
  }
};

const handleNext = () => {

  if (lives <= 0) {
    setGameState("start");
    setCurrentLevel(0);
    setScore(0);
    setLives(3);
    return;
  }

  if (currentLevel >= levels.length - 1) {
    setGameState("victory");
  } else {

    setCurrentLevel((prev) => prev + 1);
    setGameState("playing");
  }
};

if (gameState === "result" && lastAnswerCorrect !== null) {
  return (
    <ResultScreen
      level={level}
      wasCorrect={lastAnswerCorrect}
      onNext={handleNext}
      isLastLevel={currentLevel >= levels.length - 1}
      lives={lives}
      onGameOver={() => setGameState("gameover")}
    />
  );
}

if (gameState === "gameover") {
  return (
    <GameOverScreen
      score={score}
      onRestart={() => {
        setLives(3);
        setCurrentLevel(0);
        setGameState("start");
      }}
    />
  );
}

if (gameState === "victory") {
  return (
    <VictoryScreen
      score={score}
      onRestart={() => {
        setLives(3);
        setScore(0);
        setCurrentLevel(0);
        setGameState("start");
      }}
    />
  );
}

  return (
    <GamePlay
      level={level}
      lives={lives}
      score={score}
      currentLevel={currentLevel}
      totalLevels={levels.length}
      answered={answered}
      selectedAnswer={selectedAnswer}
      onAnswer={handleAnswer}
    />
  );

};

export default Index;