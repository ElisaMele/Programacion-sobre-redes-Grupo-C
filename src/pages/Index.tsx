import { levels } from "../data/levels";
import { useState } from "react";
import { StartScreen } from "../components/StartScreen";
import { GamePlay } from "../components/GamePlay";
import { ResultScreen } from "../components/ResultScreen";

const Index = () => {

  const [currentLevel, setCurrentLevel] = useState(0);
  const [gameState, setGameState] = useState("start");
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | null>(null);
  const [answered, setAnswered] = useState(false);
  const level = levels[currentLevel];

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

  const isCorrect = id === level.correctAnswer;

  setLastAnswerCorrect(isCorrect);

  setTimeout(() => {
    setGameState("result");
    setAnswered(false);
  }, 500);
};

const handleNext = () => {
  if (currentLevel >= levels.length - 1) {
    setGameState("victory");
  } else {
    setCurrentLevel((prev) => prev + 1);
    setGameState("playing");
  }
};

if (currentLevel >= levels.length) {
  return (
    <div>
      <h1>🎉 ¡Escapaste de la red!</h1>
      <button onClick={() => {
        setCurrentLevel(0);
        setGameState("start");
      }}>
        Volver a jugar
      </button>
    </div>
  );
}

if (gameState === "result" && lastAnswerCorrect !== null) {
  return (
    <ResultScreen
      level={level}
      wasCorrect={lastAnswerCorrect}
      onNext={handleNext}
      isLastLevel={currentLevel >= levels.length - 1}
    />
  );
}

  return (
    <GamePlay
      level={level}
      currentLevel={currentLevel}
      totalLevels={levels.length}
      answered={answered}
      onAnswer={handleAnswer}
    />
  );

};

export default Index;