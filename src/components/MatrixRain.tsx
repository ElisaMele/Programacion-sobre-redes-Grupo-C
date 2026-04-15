import { motion } from "framer-motion";

const chars = "01アイウエオ";

export function MatrixRain() {
  const columns = Array.from({ length: 18 });

  return (
    <div className="fixed inset-0 pointer-events-none z-0 opacity-10 overflow-hidden">

      {columns.map((_, col) => (
        <motion.div
          key={col}
          className="absolute text-green-500/20 text-xs"
          style={{
            left: `${(col / 18) * 100}%`,
            top: -100,
            writingMode: "vertical-rl",
          }}
          animate={{ y: ["-10vh", "110vh"] }}
          transition={{
            duration: 18 + Math.random() * 10,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 6,
          }}
        >
          {Array.from({ length: 14 })
            .map(() => chars[Math.floor(Math.random() * chars.length)])
            .join("")}
        </motion.div>
      ))}
    </div>
  );
}