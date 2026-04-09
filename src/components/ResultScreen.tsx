type Level = {
  title: string;
  explanation: string;
};

type Props = {
  level: Level;
  wasCorrect: boolean;
  onNext: () => void;
  isLastLevel: boolean;
};

export const ResultScreen = ({
  level,
  wasCorrect,
  onNext,
  isLastLevel,
}: Props) => {
  return (
    <div>
      <h1>
        {wasCorrect ? "✅ Correcto" : "❌ Incorrecto"}
      </h1>

      <p>{level.explanation}</p>

      <button onClick={onNext}>
        {isLastLevel ? "Ver resultado final" : "Siguiente nivel"}
      </button>
    </div>
  );
};