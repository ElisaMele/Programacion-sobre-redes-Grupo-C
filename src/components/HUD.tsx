import { motion } from "framer-motion";
import { Shield, Heart } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface HUDProps {
  level: number;
  totalLevels: number;
  score: number;
  lives: number;
}

export function HUD({ level, totalLevels, score, lives }: HUDProps) {
  const isMobile = useIsMobile();

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-3 md:px-4 py-2 md:py-3 bg-black border-b border-green-500/30">

      {/* LEVEL */}
      <div className="flex items-center gap-1 md:gap-2">
        <Shield className="w-4 h-4 text-green-400" />

        {!isMobile && (
          <span className="text-xs uppercase tracking-widest text-green-500/70">
            nivel
          </span>
        )}

        <span className="font-bold text-green-300 text-sm md:text-base">
          {level}/{totalLevels}
        </span>
      </div>

      {/* LIVES */}
      <div className="flex items-center gap-1">
        {Array.from({ length: 3 }).map((_, i) => {
          const alive = i < lives;

          return (
            <motion.div
              key={i}
              animate={
                alive
                  ? { scale: 1, opacity: 1 }
                  : { scale: 0.85, opacity: 0.25 }
              }
              transition={{ duration: 0.2 }}
            >
              <Heart
                className={`w-4 md:w-5 h-4 md:h-5 ${
                  alive
                    ? "text-red-500 fill-red-500"
                    : "text-gray-600"
                }`}
              />
            </motion.div>
          );
        })}
      </div>

      {/* SCORE */}
      <div className="flex items-center gap-1 md:gap-2">
        {!isMobile && (
          <span className="text-xs uppercase tracking-widest text-green-500/70">
            score
          </span>
        )}

        <motion.span
          key={score}
          className="font-bold text-green-300 text-sm md:text-base"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
        >
          {score}
        </motion.span>
      </div>

    </div>
  );
}