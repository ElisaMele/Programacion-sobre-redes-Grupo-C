type Level = {
  title: string;
  explanation: string;
};

type Props = {
  level: Level;
  wasCorrect: boolean;
  onNext: () => void;
  isLastLevel: boolean;
  lives: number;
  onGameOver: () => void;
};

export const ResultScreen = ({
  level,
  wasCorrect,
  onNext,
  lives,
  onGameOver,
}: Props) => {
  return (
    <div>
      <p>
        {wasCorrect
          ? "✅ Correcto, ¡avanzaste al siguiente nivel!"
          : "❌ Incorrecto, intenta de nuevo"}
      </p>

      <p>{level.explanation}</p>

      <button
        onClick={() => {
          if (lives <= 0) {
            onGameOver();
          } else {
            onNext();
          }
        }}
      >
        {lives <= 0 ? "Reintentar" : "Ver siguiente nivel"}
      </button>
    </div>
  );
};