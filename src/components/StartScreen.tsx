import { motion } from "framer-motion";
import { MatrixRain } from "./MatrixRain";
import { Terminal, Zap } from "lucide-react";

interface Props {
  onStart: () => void;
}

export function StartScreen({ onStart }: Props) {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      
      <MatrixRain />

      <div className="scanline" />

      <div className="absolute inset-0 bg-black/40" />

      <motion.div
        className="relative z-10 text-center max-w-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-8"
        >
          <Terminal className="w-16 h-16 text-primary mx-auto mb-4" />
          <h1 className="font-display text-4xl md:text-6xl font-black text-foreground text-glow tracking-wider">
            NETWORK
          </h1>
          <h1 className="font-display text-4xl md:text-6xl font-black text-primary text-glow tracking-wider">
            ESCAPE ROOM
          </h1>
        </motion.div>

        <motion.p
          className="text-muted-foreground text-lg mb-4 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Sistema corporativo comprometido.
          <br />
          Resolvé <span className="text-foreground font-semibold">15 desafíos</span> para escapar.
        </motion.p>

        <motion.div
          className="flex flex-col items-center gap-3 text-sm text-terminal-dim mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-warning" />
            <span>60 segundos por pregunta</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-danger">♥♥♥</span>
            <span>3 vidas — si las perdés, game over</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-primary">+</span>
            <span>Bonus por responder rápido</span>
          </div>
        </motion.div>

        {/* BOTÓN igual al original */}
        <motion.button
          onClick={onStart}
          className="px-10 py-4 bg-black text-primary border border-primary font-display font-bold text-lg rounded-sm box-glow tracking-widest hover:brightness-125 transition-all"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {">"} INICIAR ESCAPE {"<"}
        </motion.button>

        <motion.p
          className="mt-6 text-xs text-terminal-dim"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          Programación sobre Redes — Trabajo Práctico
        </motion.p>
      </motion.div>
    </div>
  );
}