import { motion } from "framer-motion";

interface WrongAnswerScreenProps {
  explanation: string;
  onContinue: () => void;
}

export function WrongAnswerScreen({ explanation, onContinue }: WrongAnswerScreenProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 text-white px-6 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Texto principal */}
      <h1 className="text-3xl font-bold text-red-500 mb-2">
        AH AH AH!
      </h1>

      <p className="text-lg mb-6">
        Respuesta incorrecta
      </p>

      {/* Explicación */}
      <div className="bg-red-900/20 border border-red-500 p-4 rounded mb-6 max-w-md">
        <p className="text-sm text-white/80">{explanation}</p>
      </div>

      {/* Botón */}
      <button
        onClick={onContinue}
        className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded"
      >
        CONTINUAR
      </button>
    </motion.div>
  );
}