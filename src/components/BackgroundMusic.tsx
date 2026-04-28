import { useEffect, useRef } from "react";

interface BackgroundMusicProps {
  isPlaying: boolean; // Suena cuando el estado es 'playing', 'wrong', etc.
  isLowVolume: boolean; // Baja el volumen cuando el estado es 'wrong' (el meme)
}

export const BackgroundMusic = ({ isPlaying, isLowVolume }: BackgroundMusicProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Ruta a tu archivo en public/sounds
    const audio = new Audio("/sounds/acdc.mp3"); 
    audio.loop = true;
    audioRef.current = audio;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play().catch(() => {
        console.log("El navegador bloqueó el autoplay. Haz clic en 'Iniciar' para activar.");
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (!audioRef.current) return;

    // Control de volumen: 0.4 normal, 0.05 cuando hay un meme
    audioRef.current.volume = isLowVolume ? 0.05 : 0.4;
  }, [isLowVolume]);

  return null; // Este componente no renderiza nada visual
};