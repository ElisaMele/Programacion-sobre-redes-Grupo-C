type Props = {
  score: number;
  onRestart: () => void;
};

export const GameOverScreen = ({ score, onRestart }: Props) => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-red-500 mb-2">
        💀 Sistema bloqueado
      </h1>
      <p>Te quedaste sin vidas...</p>

      <p>⭐ Puntaje final: {score}</p>

      <button
        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
        onClick={onRestart}
      >
        🔄 Reintentar
      </button>
    </div>
  );
};