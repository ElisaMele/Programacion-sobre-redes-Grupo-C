import { levels } from "../data/levels";
import { useState } from "react";

const Index = () => {

  const [gameState, setGameState] = useState("start");
  const [feedback, setFeedback] = useState("");
  const [currentLevel, setCurrentLevel] = useState(0);
  const level = levels[currentLevel];

  if (gameState === "start") {
  return (
    <div>
      <h1>🧠 Network Escape Challenge</h1>

      <p>
        Has sido atrapado dentro de una red corporativa.
        Deberás responder correctamente para escapar.
      </p>

      <ul>
        <li>✔ Respondé bien para avanzar</li>
        <li>❌ Si fallás, quedás expuesto</li>
        <li>⏱ El sistema te está rastreando...</li>
      </ul>

      <p>Niveles: {levels.length}</p>

      <button onClick={() => setGameState("playing")}>
        ▶ Iniciar misión
      </button>
    </div>
  );
}

const handleAnswer = (id: string) => {
  if (id === level.correctAnswer) {
    setFeedback("✅ Correcto");

    setTimeout(() => {
      setCurrentLevel((prev) => prev + 1);
      setFeedback("");
    }, 1000);
  } else {
    setFeedback("❌ Incorrecto");
  }
};

if (currentLevel >= levels.length) {
  return <h1>🎉 ¡Ganaste!</h1>;
}

  return (
    <div>
      <h1>{level.title}</h1>
      <p>{level.narrative}</p>
      <h2>{level.question}</h2>

      {level.choices.map((choice) => (
      <button key={choice.id} onClick={() => handleAnswer(choice.id)}>
    {choice.text}
      </button>
  
))}

    <p>{feedback}</p>
    </div>
  );
};

export default Index;