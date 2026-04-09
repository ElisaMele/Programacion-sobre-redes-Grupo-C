type Props = {
  score: number;
  onRestart: () => void;
};

export const VictoryScreen = ({ score, onRestart }: Props) => {
  return (
    <div>
      <h1>🎉 ¡Escapaste de la red!</h1>
      <p>Completaste todos los niveles</p>

      <p>⭐ Puntaje final: {score}</p>

      <button onClick={onRestart}>
        🔄 Jugar de nuevo
      </button>
    </div>
  );
};