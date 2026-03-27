import { useState } from "react";

interface SplashScreenProps {
  title: string;
  subtitle?: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  fonts: { heading: string; body: string };
  variant?: string;
}

export function SplashScreen({
  title,
  subtitle,
  colors,
  fonts,
  variant = "classic",
}: SplashScreenProps) {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);

  if (!visible) return null;

  const handleEnter = () => {
    setExiting(true);
    const audio = document.getElementById("bg-music") as HTMLAudioElement;
    if (audio) audio.play().catch(() => {});
    setTimeout(() => setVisible(false), 600);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center cursor-pointer transition-all duration-600 ${exiting ? "opacity-0 scale-110" : "opacity-100 scale-100"}`}
      style={{ backgroundColor: colors.background }}
      onClick={handleEnter}
    >
      {/* Decorative top ornament for classic */}
      {variant === "classic" && (
        <div className="absolute top-12 opacity-20">
          <svg width="120" height="60" viewBox="0 0 120 60" fill="none">
            <path
              d="M60 0C40 20 10 15 0 30C10 25 30 35 60 20C90 35 110 25 120 30C110 15 80 20 60 0Z"
              fill={colors.primary}
            />
          </svg>
        </div>
      )}

      {/* Main content */}
      <div className="text-center px-8">
        {variant === "classic" && (
          <div className="mb-6 flex justify-center">
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke={colors.primary}
              strokeWidth="1"
              opacity="0.4"
            >
              <path d="M21 8V6a2 2 0 00-2-2H5a2 2 0 00-2 2v2m18 0v10a2 2 0 01-2 2H5a2 2 0 01-2-2V8m18 0l-9 6-9-6" />
            </svg>
          </div>
        )}

        <p
          className="text-5xl md:text-6xl mb-4 leading-tight"
          style={{
            fontFamily: `'${fonts.heading}', cursive`,
            color: colors.primary,
          }}
        >
          {title}
        </p>

        {subtitle && (
          <p
            className="text-sm tracking-[0.3em] uppercase mt-4"
            style={{
              fontFamily: `'${fonts.body}', sans-serif`,
              color: colors.text,
              opacity: 0.5,
            }}
          >
            — {subtitle} —
          </p>
        )}

        <div className="mt-16 animate-bounce">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke={colors.primary}
            strokeWidth="1.5"
            className="mx-auto opacity-50"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
            />
          </svg>
          <p
            className="text-[10px] tracking-[0.4em] uppercase mt-3"
            style={{
              color: colors.text,
              opacity: 0.35,
              fontFamily: `'${fonts.body}', sans-serif`,
            }}
          >
            Toca para abrir
          </p>
        </div>
      </div>

      {/* Decorative bottom ornament for classic */}
      {variant === "classic" && (
        <div className="absolute bottom-12 opacity-20 rotate-180">
          <svg width="120" height="60" viewBox="0 0 120 60" fill="none">
            <path
              d="M60 0C40 20 10 15 0 30C10 25 30 35 60 20C90 35 110 25 120 30C110 15 80 20 60 0Z"
              fill={colors.primary}
            />
          </svg>
        </div>
      )}

      {variant === "modern" && (
        <div className="absolute bottom-12 flex gap-1.5">
          <div
            className="w-8 h-0.5 rounded-full"
            style={{ backgroundColor: colors.primary, opacity: 0.3 }}
          />
          <div
            className="w-2 h-0.5 rounded-full"
            style={{ backgroundColor: colors.primary, opacity: 0.15 }}
          />
        </div>
      )}
    </div>
  );
}
