import { useState, useEffect, useRef } from "react";

interface MusicPlayerProps {
  audioUrl?: string;
  colors: { primary: string; background: string; accent: string };
}

export function MusicPlayer({ audioUrl, colors }: MusicPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const wasPlayingRef = useRef(false);

  useEffect(() => {
    const audio = document.getElementById("bg-music") as HTMLAudioElement;
    if (!audio) return;

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    // Pause/resume on tab visibility change
    const handleVisibility = () => {
      if (document.hidden) {
        // Tab is now hidden — remember if we were playing
        wasPlayingRef.current = !audio.paused;
        if (!audio.paused) {
          audio.pause();
        }
      } else {
        // Tab is visible again — resume if we were playing before
        if (wasPlayingRef.current) {
          audio.play().catch(() => {});
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
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

  const toggleMute = () => {
    const audio = document.getElementById("bg-music") as HTMLAudioElement;
    if (!audio) return;
    audio.muted = !audio.muted;
    setMuted(audio.muted);
  };

  if (!audioUrl) return null;

  const btnStyle = {
    backgroundColor: `${colors.background}e6`,
    borderColor: `${colors.accent}30`,
    color: colors.primary,
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-2">
      {/* Play / Pause button */}
      <button
        onClick={togglePlay}
        className="w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 border"
        style={btnStyle}
        aria-label={playing ? "Pausar musica" : "Reproducir musica"}
      >
        {playing ? (
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 5.25v13.5m-7.5-13.5v13.5"
            />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>

      {/* Mute / Unmute button */}
      <button
        onClick={toggleMute}
        className="w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 border"
        style={btnStyle}
        aria-label={muted ? "Activar sonido" : "Silenciar"}
      >
        {muted ? (
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
            />
          </svg>
        ) : (
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
