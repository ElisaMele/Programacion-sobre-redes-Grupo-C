type Props = {
  score: number;
  onRestart: () => void;
};

export const VictoryScreen = ({ score, onRestart }: Props) => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-green-400 mb-2">
        🎉 ¡Escapaste de la red!
        </h1>
      <p>Completaste todos los niveles</p>

      <p>⭐ Puntaje final: {score}</p>

      <button onClick={onRestart}>
        🔄 Jugar de nuevo
      </button>
    </div>
  );
};