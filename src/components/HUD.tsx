import { motion } from "framer-motion";
import { Shield, Heart } from "lucide-react";

interface HUDProps {
  level: number;
  totalLevels: number;
  score: number;
  lives: number;
}

export function HUD({ level, totalLevels, score, lives }: HUDProps) {
  return (
    <div className="flex items-center justify-between w-full mb-4 text-green-300 text-sm border-b border-green-500/30 pb-2">

      {/* LEVEL */}
      <div className="flex items-center gap-2">
        <Shield className="w-4 h-4 text-green-400" />
        <span className="uppercase tracking-widest text-green-500/70">
          level
        </span>
        <span className="font-bold text-green-300">
          {level}/{totalLevels}
        </span>
      </div>

      {/* LIVES */}
      <div className="flex items-center gap-1">
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={i}
            animate={
              i >= lives
                ? { scale: 0.8, opacity: 0.2 }
                : { scale: 1, opacity: 1 }
            }
          >
            <Heart
              className={`w-4 h-4 ${
                i < lives
                  ? "text-red-500 fill-red-500"
                  : "text-green-900"
              }`}
            />
          </motion.div>
        ))}
      </div>

      {/* SCORE */}
      <div className="flex items-center gap-2">
        <span className="uppercase tracking-widest text-green-500/70">
          score
        </span>

        <motion.span
          key={score}
          className="font-bold text-green-400"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
        >
          {score}
        </motion.span>
      </div>

    </div>
  );
}