import { useState, useEffect } from "react";

interface MusicPlayerProps {
  audioUrl?: string;
  colors: { primary: string; background: string };
}

export function MusicPlayer({ audioUrl, colors }: MusicPlayerProps) {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = document.getElementById("bg-music") as HTMLAudioElement;
    if (audio) {
      const handlePlay = () => setPlaying(true);
      const handlePause = () => setPlaying(false);
      audio.addEventListener("play", handlePlay);
      audio.addEventListener("pause", handlePause);
      return () => {
        audio.removeEventListener("play", handlePlay);
        audio.removeEventListener("pause", handlePause);
      };
    }
  }, []);

  const togglePlay = () => {
    const audio = document.getElementById("bg-music") as HTMLAudioElement;
    if (!audio) return;
    if (audio.paused) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  };

  if (!audioUrl) return null;

  return (
    <button
      onClick={togglePlay}
      className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110"
      style={{ backgroundColor: colors.primary, color: colors.background }}
      aria-label={playing ? "Pausar musica" : "Reproducir musica"}
    >
      {playing ? (
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 5.25v13.5m-7.5-13.5v13.5"
          />
        </svg>
      ) : (
        <svg className="h-5 w-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
      )}
    </button>
  );
}
