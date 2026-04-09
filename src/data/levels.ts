export type ChallengeType = "multiple-choice" | "true-false" | "match" | "order";

export interface Choice {
  id: string;
  text: string;
}

export interface Level {
  id: number;
  title: string;
  narrative: string;
  timerMessage: string;
  question: string;
  type: ChallengeType;
  choices: Choice[];
  correctAnswer: string;
  explanation: string;
  hint?: string;
}

export const levels: Level[] = [
  {
    id: 1,
    title: "Network Scape Room",
    narrative: "Has sido atrapado dentro de una red corporativa...",
    timerMessage: "⚠ El firewall se reiniciará en {time}s...",
    question: "¿Qué es un Firewall?",
    type: "multiple-choice",
    choices: [
      { id: "a", text: "Un dispositivo que amplifica la señal de red" },
      { id: "b", text: "Un protocolo para encriptar datos en tránsito" },
      { id: "c", text: "Un sistema que controla el tráfico..." },
      { id: "d", text: "Un servidor que almacena copias..." },
    ],
    correctAnswer: "c",
    explanation: "Un Firewall es un sistema de seguridad...",
  },

];