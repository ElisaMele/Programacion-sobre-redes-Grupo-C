import { levels } from "@/data/levels";
import { useGameStore } from "@/hooks/useGameStore";

import { StartScreen } from "@/components/StartScreen";
import { GamePlay } from "@/components/GamePlay";
import { ResultScreen } from "@/components/ResultScreen";
import { GameOverScreen } from "@/components/GameOverScreen";
import { VictoryScreen } from "@/components/VictoryScreen";
import { MatrixRain } from "@/components/MatrixRain";

const Index = () => {
  const game = useGameStore();

  const currentLevel = levels[game.currentLevel];

  const lastAnswer =
    game.answers.length > 0
      ? game.answers[game.answers.length - 1]
      : null;

  return (
    <div className="w-full h-screen bg-black text-green-400 overflow-hidden relative">

      <div className="absolute inset-0 z-0">
        <MatrixRain />
      </div>

      <div className="absolute inset-0 bg-black/85 z-10" />

      <div className="absolute inset-0 z-20 pointer-events-none scanline opacity-[0.12]" />

      <div className="relative z-20 w-full h-full flex items-center justify-center">

        {game.state === "start" && (
          <StartScreen onStart={game.startGame} />
        )}

        {game.state === "playing" && currentLevel && (
          <GamePlay
            level={currentLevel}
            currentLevel={game.currentLevel}
            totalLevels={levels.length}
            score={game.score}
            lives={game.lives}
            answered={false}
            onAnswer={game.answerQuestion}
          />
        )}

        {game.state === "result" && currentLevel && lastAnswer && (
          <ResultScreen
            level={currentLevel}
            wasCorrect={lastAnswer.correct}
            lives={game.lives}
            onNext={game.nextLevel}
            isLastLevel={game.currentLevel >= levels.length - 1}
          />
        )}

        {game.state === "gameover" && (
          <GameOverScreen
            score={game.score}
            levelsCompleted={game.answers.filter(a => a.correct).length}
            onRestart={game.resetGame}
          />
        )}

        {game.state === "victory" && (
          <VictoryScreen
            score={game.score}
            answers={game.answers}
            onRestart={game.resetGame}
          />
        )}

      </div>
    </div>
  );
};

export default Index;