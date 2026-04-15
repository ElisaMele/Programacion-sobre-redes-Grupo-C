import { useEffect, useState } from "react";

interface TimerBarProps {
  duration: number;
  onTimeUp: () => void;
  isPaused: boolean;
  onTick?: (timeLeft: number) => void;
  timerMessage: string;
}

export function TimerBar({
  duration,
  onTimeUp,
  isPaused,
  onTick,
  timerMessage,
}: TimerBarProps) {
  const [timeLeft, setTimeLeft] = useState(duration);

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

  useEffect(() => {
    if (onTick) onTick(timeLeft);

    if (timeLeft === 0 && !isPaused) {
      onTimeUp();
    }
  }, [timeLeft]);

  const percentage = (timeLeft / duration) * 100;

  const message = timerMessage.replace("{time}", String(timeLeft));

  return (
    <div className="w-full space-y-2">

      <div className="flex justify-between items-center text-sm">
        <span className="text-green-400 font-mono">
          {message}
        </span>

        <span
          className={`text-xl font-bold ${
            timeLeft <= 10
              ? "text-red-500 drop-shadow-[0_0_6px_rgba(255,0,0,0.8)]"
              : "text-green-400 drop-shadow-[0_0_6px_rgba(0,255,0,0.8)]"
          }`}
        >
          {timeLeft}s
        </span>
      </div>

      <div className="w-full h-2 bg-gray-700 overflow-hidden border border-green-500/20 rounded-none">
        <div
          className={`h-full ${
            timeLeft <= 10 ? "bg-red-500" : "bg-green-500"
          }`}
          style={{
            width: `${percentage}%`,
            transition: "width 0.3s linear",
          }}
        />
      </div>

    </div>
  );
}