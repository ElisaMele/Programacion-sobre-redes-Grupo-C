type Props = {
  onStart: () => void;
  totalLevels: number;
};

export const StartScreen = ({ onStart, totalLevels }: Props) => {
  return (
    <div>
      <h1>🧠 Network Escape Room</h1>

      <p>
        Has sido atrapado dentro de una red corporativa.
        Deberás responder correctamente para escapar.
      </p>

      <ul>
        <li>60 segundos por pregunta</li>
        <li>3 vidas — si las perdés, game over</li>
        <li>Bonus por responder rápido</li>
      </ul>

      <p>Niveles: {totalLevels}</p>

      <button onClick={onStart}>
        ▶ Iniciar escape
      </button>
    </div>
  );
};