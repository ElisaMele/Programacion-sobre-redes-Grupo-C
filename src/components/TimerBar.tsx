import { useEffect, useState } from "react";

interface TimerBarProps {
  duration: number;
  onTimeUp: () => void;
  isPaused: boolean;
  onTick?: (timeLeft: number) => void;
}

export function TimerBar({
  duration,
  onTimeUp,
  isPaused,
  onTick,
}: TimerBarProps) {
  const [timeLeft, setTimeLeft] = useState(duration);

  // reset cuando cambia nivel o duration
  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused, duration]);

  // efectos separados (ESTO ES LA CLAVE)
  useEffect(() => {
    if (onTick) onTick(timeLeft);

    if (timeLeft === 0 && !isPaused) {
      onTimeUp();
    }
  }, [timeLeft]);

  const percentage = (timeLeft / duration) * 100;

  return (
    <div
      style={{
        width: "100%",
        height: "10px",
        backgroundColor: "#374151",
        borderRadius: "999px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: `${percentage}%`,
          height: "100%",
          backgroundColor: "#22c55e",
          transition: "width 0.3s linear",
        }}
      />
    </div>
  );
}