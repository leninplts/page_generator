import { useState, useEffect } from "react";

interface MusicPlayerProps {
  audioUrl?: string;
  colors: { primary: string; background: string; accent: string };
}

export function MusicPlayer({ audioUrl, colors }: MusicPlayerProps) {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = document.getElementById("bg-music") as HTMLAudioElement;
    if (!audio) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, []);

  const togglePlay = () => {
    const audio = document.getElementById("bg-music") as HTMLAudioElement;
    if (!audio) return;
    audio.paused ? audio.play().catch(() => {}) : audio.pause();
  };

  if (!audioUrl) return null;

  return (
    <button
      onClick={togglePlay}
      className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 border"
      style={{
        backgroundColor: `${colors.background}dd`,
        borderColor: `${colors.accent}40`,
        color: colors.primary,
        backdropFilter: "blur(8px)",
      }}
      aria-label={playing ? "Pausar musica" : "Reproducir musica"}
    >
      {playing ? (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 5.25v13.5m-7.5-13.5v13.5"
          />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z" />
        </svg>
      )}
    </button>
  );
}
