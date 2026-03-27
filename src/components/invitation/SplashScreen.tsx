import { useState } from "react";

interface SplashScreenProps {
  title: string;
  subtitle?: string;
  colors: { primary: string; background: string; text: string };
  fonts: { heading: string };
}

export function SplashScreen({
  title,
  subtitle,
  colors,
  fonts,
}: SplashScreenProps) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const handleEnter = () => {
    setVisible(false);
    // Try to play audio
    const audio = document.getElementById("bg-music") as HTMLAudioElement;
    if (audio) {
      audio.play().catch(() => {});
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center cursor-pointer"
      style={{ backgroundColor: colors.background }}
      onClick={handleEnter}
    >
      <p
        className="text-4xl md:text-5xl text-center mb-4"
        style={{
          fontFamily: `'${fonts.heading}', cursive`,
          color: colors.primary,
        }}
      >
        {title}
      </p>
      {subtitle && (
        <p
          className="text-sm tracking-widest uppercase mb-8"
          style={{ color: colors.text, opacity: 0.6 }}
        >
          {subtitle}
        </p>
      )}
      <div className="animate-bounce mt-8">
        <p
          className="text-xs tracking-widest uppercase"
          style={{ color: colors.text, opacity: 0.5 }}
        >
          Toca para entrar
        </p>
        <svg
          className="mx-auto mt-2 h-6 w-6"
          style={{ color: colors.primary }}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
          />
        </svg>
      </div>
    </div>
  );
}
