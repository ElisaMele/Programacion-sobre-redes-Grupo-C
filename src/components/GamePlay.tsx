type Choice = {
  id: string;
  text: string;
};

type Level = {
  title: string;
  narrative: string;
  question: string;
  choices: Choice[];
};

type Props = {
  level: Level;
  currentLevel: number;
  totalLevels: number;
  answered: boolean;
  onAnswer: (id: string) => void;
};

export const GamePlay = ({
  level,
  currentLevel,
  totalLevels,
  answered,
  onAnswer,
}: Props) => {
  return (
    <div>
      <p>Nivel {currentLevel + 1} / {totalLevels}</p>

      <h1>{level.title}</h1>
      <p>{level.narrative}</p>
      <h2>{level.question}</h2>

      {level.choices.map((choice) => (
        <button
          key={choice.id}
          onClick={() => onAnswer(choice.id)}
          disabled={answered}
        >
          {choice.text}
        </button>
      ))}

    </div>
  );
};