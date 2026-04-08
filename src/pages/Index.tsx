import { levels } from "../data/levels";
import { useState } from "react";

const Index = () => {

  const [gameState, setGameState] = useState("start");
  
  const level = levels[0];

  if (gameState === "start") {
  return (
    <div>
      <h1>Network Challenge</h1>
      <p>Estás atrapado en una red. Respondé correctamente para escapar.</p>

      <button onClick={() => setGameState("playing")}>
        Comenzar
      </button>
    </div>
  );
}

  return (
    <div>
      <h1>{level.title}</h1>
      <p>{level.narrative}</p>
      <h2>{level.question}</h2>

      {level.choices.map((choice) => (
        <button key={choice.id}>
          {choice.text}
        </button>
      ))}
    </div>
  );
};

export default Index;