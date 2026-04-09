import type { Level } from "../data/levels";

type Choice = {
  id: string;
  text: string;
};

type Props = {
  level: Level;
  currentLevel: number;
  totalLevels: number;
  answered: boolean;
  lives: number;
  score: number;
  selectedAnswer: string | null;
  onAnswer: (id: string) => void;
};

export const GamePlay = ({
  level,
  currentLevel,
  totalLevels,
  answered,
  selectedAnswer,
  lives,
  score,
  onAnswer,
}: Props) => {
  return (
  <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
    <div className="bg-gray-800 p-6 rounded-2xl shadow-lg max-w-md w-full text-center">
      
      <p>Nivel {currentLevel + 1} / {totalLevels}</p>

      <div className="flex justify-center gap-2 mb-2">
        {Array.from({ length: lives }).map((_, i) => (
          <span key={i}>❤️</span>
        ))}
      </div>

      <p className="text-yellow-400 font-bold mb-2">
        ⭐ {score}
      </p>

      <h1 className="text-xl font-bold mb-2">{level.title}</h1>
      <p className="text-gray-300 mb-4">{level.narrative}</p>
      <h2 className="text-lg mb-4">{level.question}</h2>

      {level.choices.map((choice) => (
        <button
          key={choice.id}
          onClick={() => onAnswer(choice.id)}
          disabled={answered}
          className={`w-full p-2 rounded-lg mb-2 transition
            ${
              answered
                ? choice.id === level.correctAnswer
                  ? "bg-green-600"
                  : choice.id === selectedAnswer
                  ? "bg-red-600"
                  : "bg-gray-600"
                : "bg-blue-600 hover:bg-blue-700"
            }
          `}
        >
          {choice.text}
        </button>
      ))}

    </div>
  </div>

);
};