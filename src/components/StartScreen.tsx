import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type Props = {
  onStart: () => void;
};

export function StartScreen({ onStart }: Props) {
  const [starting, setStarting] = useState(false);

  const handleStart = () => {
    setStarting(true);
    setTimeout(onStart, 600);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">

      {/* fondo real del sistema */}
      <div className="absolute inset-0 scanline opacity-30 pointer-events-none" />

      {/* glow ambiental (MUY suave) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--terminal)/0.08),transparent_60%)]" />

      <AnimatePresence>
        {!starting && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md px-4"
          >
            <Card className="bg-card/80 border border-border box-glow backdrop-blur-sm">
              <CardContent className="p-8 space-y-6 text-center">

                {/* estado sistema */}
                <p className="text-xs text-red-500 tracking-widest animate-flicker">
                  ● SYSTEM LOCKED
                </p>

                {/* título (LO MÁS IMPORTANTE) */}
                <div className="space-y-2">
                  <h1 className="font-display text-4xl font-bold text-foreground text-glow">
                    NETWORK
                  </h1>
                  <h1 className="font-display text-4xl font-bold text-primary text-glow">
                    SCAPE ROOM
                  </h1>
                </div>

                {/* narrativa */}
                <div className="text-sm text-muted-foreground space-y-2 leading-relaxed">
                  <p>
                    <span className="text-primary">&gt;</span> Sistema corporativo comprometido
                  </p>
                  <p>
                    <span className="text-primary">&gt;</span> Resolvé{" "}
                    <span className="text-foreground font-bold">15 desafíos</span> para escapar
                  </p>
                </div>

                {/* reglas */}
                <div className="terminal-border bg-muted/20 p-3 text-xs text-muted-foreground space-y-1">
                  <p>⏱ 60 segundos por pregunta</p>
                  <p>♥ 3 vidas</p>
                  <p>⚡ bonus por velocidad</p>
                </div>

                {/* CTA (único foco visual fuerte) */}
                <Button
                  onClick={handleStart}
                  className="w-full bg-primary text-primary-foreground font-bold tracking-widest box-glow hover:brightness-110 active:scale-[0.98] transition-all"
                >
                  &gt; INICIAR ESCAPE &lt;
                </Button>

                {/* footer mínimo */}
                <p className="text-[10px] text-muted-foreground">
                  PROGRAMA DE REDES — SIMULACIÓN
                </p>

              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}