import { useState, useEffect } from "react";

interface CountdownSectionProps {
  eventDate: string;
  eventTime?: string;
  endMessage?: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
  };
  fonts: { heading: string; body: string };
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
}: CountdownSectionProps) {
  // eventTime may come as "HH:MM" or "HH:MM:SS" from DB
  const timeStr = eventTime || "00:00:00";
  const normalizedTime =
    timeStr.split(":").length === 2 ? `${timeStr}:00` : timeStr;
  const targetDate = new Date(`${eventDate}T${normalizedTime}`);
  const [time, setTime] = useState(getTimeRemaining(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getTimeRemaining(targetDate));
    }, 1000);
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
      className="py-14 px-6 text-center"
      style={{ backgroundColor: colors.secondary }}
    >
      <h2
        className="text-3xl mb-2"
        style={{
          fontFamily: `'${fonts.heading}', cursive`,
          color: colors.primary,
        }}
      >
        Nos vemos en
      </h2>

      {units ? (
        <div className="flex justify-center gap-3 mt-8">
          {units.map((unit) => (
            <div key={unit.label} className="text-center">
              <div
                className="text-3xl font-bold tabular-nums"
                style={{ color: colors.text }}
              >
                {unit.value}
              </div>
              <div
                className="text-xs uppercase tracking-wider mt-1"
                style={{ color: colors.text, opacity: 0.6 }}
              >
                {unit.label}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p
          className="text-lg mt-6"
          style={{
            fontFamily: `'${fonts.body}', sans-serif`,
            color: colors.text,
          }}
        >
          {endMessage || "El evento ya llego!"}
        </p>
      )}
    </section>
  );
}
