import { useState, useEffect } from "react";

interface CountdownSectionProps {
  eventDate: string;
  eventTime?: string;
  endMessage?: string;
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

function getTimeRemaining(targetDate: Date) {
  const now = new Date();
  const diff = targetDate.getTime() - now.getTime();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export function CountdownSection({
  eventDate,
  eventTime,
  endMessage,
  colors,
  fonts,
  variant = "classic",
}: CountdownSectionProps) {
  const timeStr = eventTime || "00:00:00";
  const normalizedTime =
    timeStr.split(":").length === 2 ? `${timeStr}:00` : timeStr;
  const targetDate = new Date(`${eventDate}T${normalizedTime}`);
  const [time, setTime] = useState(getTimeRemaining(targetDate));

  useEffect(() => {
    const timer = setInterval(
      () => setTime(getTimeRemaining(targetDate)),
      1000,
    );
    return () => clearInterval(timer);
  }, []);

  const units = time
    ? [
        { value: time.days, label: "Dias" },
        { value: time.hours, label: "Horas" },
        { value: time.minutes, label: "Mins" },
        { value: time.seconds, label: "Segs" },
      ]
    : null;

  return (
    <section
      className="py-20 px-6 text-center"
      style={{ backgroundColor: colors.secondary }}
    >
      <div className="max-w-md mx-auto">
        {/* Decorative element for classic */}
        {variant === "classic" && (
          <div className="mb-4 flex justify-center opacity-30">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke={colors.primary}
              strokeWidth="1"
            >
              <path d="M12 6v6l4 2" strokeLinecap="round" />
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2v2M12 20v2M2 12h2M20 12h2" strokeLinecap="round" />
            </svg>
          </div>
        )}

        <h2
          className="text-4xl mb-2"
          style={{
            fontFamily: `'${fonts.heading}', cursive`,
            color: colors.primary,
          }}
        >
          Nos vemos en
        </h2>

        {units ? (
          <div className="flex justify-center gap-4 mt-10">
            {units.map((unit, i) => (
              <div key={unit.label} className="text-center">
                {variant === "classic" && (
                  <div
                    className="text-4xl font-light tabular-nums mb-1"
                    style={{
                      color: colors.text,
                      fontFamily: `'${fonts.body}', sans-serif`,
                    }}
                  >
                    {unit.value}
                  </div>
                )}
                {variant === "modern" && (
                  <div
                    className="text-5xl font-bold tabular-nums mb-1"
                    style={{
                      color: colors.text,
                      fontFamily: `'${fonts.heading}', sans-serif`,
                    }}
                  >
                    {String(unit.value).padStart(2, "0")}
                  </div>
                )}
                {variant === "elegant" && (
                  <div
                    className="text-4xl font-light tabular-nums mb-1"
                    style={{
                      color: colors.primary,
                      fontFamily: `'${fonts.heading}', serif`,
                    }}
                  >
                    {unit.value}
                  </div>
                )}
                <div
                  className="text-[10px] uppercase tracking-[0.2em]"
                  style={{
                    color: colors.text,
                    opacity: 0.5,
                    fontFamily: `'${fonts.body}', sans-serif`,
                  }}
                >
                  {unit.label}
                </div>
                {/* Separator dot between units (not after last) */}
                {variant === "modern" && i < units.length - 1 && <span />}
              </div>
            ))}
          </div>
        ) : (
          <p
            className="text-lg mt-8"
            style={{
              fontFamily: `'${fonts.body}', sans-serif`,
              color: colors.text,
            }}
          >
            {endMessage || "El evento ya llego!"}
          </p>
        )}
      </div>
    </section>
  );
}
