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
    title: "FIREWALL BREACH",
    narrative: "Has sido atrapado dentro de una red corporativa. El firewall está bloqueando tu salida. Necesitás demostrar que sabés qué es para poder desactivarlo.",
    timerMessage: "⚠ El firewall se reiniciará en {time}s y perderás el acceso...",
    question: "¿Qué es un Firewall?",
    type: "multiple-choice",
    choices: [
      { id: "a", text: "Un dispositivo que amplifica la señal de red" },
      { id: "b", text: "Un protocolo para encriptar datos en tránsito" },
      { id: "c", text: "Un sistema que controla el tráfico de red entrante y saliente según reglas de seguridad predefinidas" },
      { id: "d", text: "Un servidor que almacena copias de páginas web" },
    ],
    correctAnswer: "c",
    explanation: "Un Firewall es un sistema de seguridad que monitorea y controla el tráfico de red entrante y saliente basándose en reglas de seguridad predeterminadas. Puede ser hardware, software o ambos.",
  },
  {
    id: 2,
    title: "IDENTIDAD DE RED",
    narrative: "Lograste pasar el firewall, pero estás en una zona desmilitarizada. Necesitás saber dónde estás parado.",
    timerMessage: "⚠ El sistema de detección de intrusos te encontrará en {time}s...",
    question: "¿Qué es una DMZ (Zona Desmilitarizada) en redes?",
    type: "multiple-choice",
    choices: [
      { id: "a", text: "Una subred que se encuentra entre la red interna y la externa, exponiendo servicios al exterior de forma controlada" },
      { id: "b", text: "Una red privada virtual para empleados remotos" },
      { id: "c", text: "Un protocolo de cifrado militar" },
      { id: "d", text: "Un tipo de cable blindado para conexiones seguras" },
    ],
    correctAnswer: "a",
    explanation: "La DMZ es una subred perimetral que actúa como zona intermedia entre la red interna (confiable) y la externa (no confiable, como Internet). Allí se colocan servidores que necesitan ser accesibles desde Internet (web, mail, DNS).",
  },

];