import { motion } from "framer-motion";

interface WrongAnswerScreenProps {
  explanation: string;
  onContinue: () => void;
}

export function WrongAnswerScreen({ explanation, onContinue }: WrongAnswerScreenProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 px-6 text-center relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >

      {/* 🔥 scanlines / glitch overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,0,0,0.04)_2px,rgba(255,0,0,0.04)_4px)]" />

      {/* contenido */}
      <motion.div
        className="max-w-md w-full space-y-6"
        initial={{ scale: 0.85, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >

        {/* título tipo sistema */}
        <motion.h1
          className="text-4xl font-bold text-red-500 tracking-widest"
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ repeat: Infinity, duration: 1.2 }}
        >
          AH AH AH!
        </motion.h1>

        <p className="text-white/70 text-sm">
          ACCESO DENEGADO
        </p>

        {/* explicación */}
        <div className="bg-red-900/20 border border-red-500/40 p-4 rounded-sm">
          <p className="text-xs text-red-400 font-mono mb-2">
            [SYSTEM ERROR]
          </p>
          <p className="text-sm text-white/80 leading-relaxed">
            {explanation}
          </p>
        </div>

        {/* botón */}
        <motion.button
          onClick={onContinue}
          className="px-8 py-3 border border-red-500 text-red-400 hover:bg-red-500/10 rounded-sm tracking-widest transition-all font-mono"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          [ CONTINUAR ]
        </motion.button>

      </motion.div>
    </motion.div>
  );
}