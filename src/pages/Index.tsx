import { levels } from "../data/levels";

import { StartScreen } from "../components/StartScreen";
import { GamePlay } from "../components/GamePlay";
import { ResultScreen } from "../components/ResultScreen";
import { GameOverScreen } from "../components/GameOverScreen";
import { VictoryScreen } from "../components/VictoryScreen";
import { WrongAnswerScreen } from "../components/WrongAnswerScreen";

import { useGameStore } from "../hooks/useGameStore";

const Index = () => {
  const game = useGameStore();

  const level = levels[game.currentLevel];

  // START
  if (game.state === "start") {
    return (
      <StartScreen
        onStart={game.startGame}
        totalLevels={levels.length}
      />
    );
  }

  // WRONG
  if (game.state === "wrong") {
    return (
      <WrongAnswerScreen
        explanation={level.explanation}
        onContinue={game.nextLevel}
      />
    );
  }

  // RESULT
  if (game.state === "result") {
    return (
      <ResultScreen
        level={level}
        wasCorrect={game.lastCorrect ?? false}
        onNext={game.nextLevel}
        isLastLevel={game.currentLevel >= levels.length - 1}
        lives={game.lives}
        onGameOver={game.resetGame}
      />
    );
  }

  // GAME OVER
  if (game.state === "gameover") {
    return (
      <GameOverScreen
        score={game.score}
        onRestart={game.resetGame}
      />
    );
  }

  // VICTORY
  if (game.state === "victory") {
    return (
      <VictoryScreen
        score={game.score}
        onRestart={game.resetGame}
      />
    );
  }

  // GAMEPLAY
  return (
    <GamePlay
      level={level}
      currentLevel={game.currentLevel}
      totalLevels={levels.length}
      lives={game.lives}
      score={game.score}
      selectedAnswer={null}
      answered={false}
      onAnswer={game.answerQuestion}
    />
  );
};

export default Index;