type Props = {
  onRestart: () => void;
};

export const GameOverScreen = ({ onRestart }: Props) => {
  return (
    <div>
      <h1>💀 Sistema bloqueado</h1>
      <p>Te quedaste sin vidas...</p>

      <button onClick={onRestart}>
        🔄 Reintentar
      </button>
    </div>
  );
};