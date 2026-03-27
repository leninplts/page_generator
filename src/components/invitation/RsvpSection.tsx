import { useState } from "react";

interface RsvpSectionProps {
  eventId: string;
  deadline?: string;
  maxGuests?: number;
  showDietary?: boolean;
  showMessage?: boolean;
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

export function RsvpSection({
  eventId,
  deadline,
  maxGuests = 2,
  showDietary = false,
  showMessage = true,
  colors,
  fonts,
  variant = "classic",
}: RsvpSectionProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [attending, setAttending] = useState<boolean | null>(null);
  const [guestsCount, setGuestsCount] = useState(0);
  const [dietaryNotes, setDietaryNotes] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (attending === null) {
      setError("Indica si asistiras");
      return;
    }
    if (!name.trim()) {
      setError("Tu nombre es requerido");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId,
          name: name.trim(),
          email: email.trim() || null,
          attending,
          guestsCount: attending ? guestsCount : 0,
          dietaryNotes: dietaryNotes.trim() || null,
          message: message.trim() || null,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Error al enviar");
        return;
      }

      setSubmitted(true);
    } catch (err) {
      setError("Error de conexion");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    fontFamily: `'${fonts.body}', sans-serif`,
    color: colors.text,
    borderColor: `${colors.accent}40`,
    backgroundColor: colors.background,
  };

  if (submitted) {
    return (
      <section
        className="py-24 px-6 text-center"
        style={{ backgroundColor: colors.secondary }}
      >
        <div className="max-w-sm mx-auto">
          <div className="text-5xl mb-4">{attending ? "🎉" : "💌"}</div>
          <h2
            className="text-3xl mb-4"
            style={{
              fontFamily: `'${fonts.heading}', cursive`,
              color: colors.primary,
            }}
          >
            {attending ? "Nos vemos ahi!" : "Gracias por avisarnos"}
          </h2>
          <p
            className="text-sm"
            style={{
              color: colors.text,
              opacity: 0.6,
              fontFamily: `'${fonts.body}', sans-serif`,
            }}
          >
            {attending
              ? "Tu confirmacion ha sido registrada. Te esperamos con los brazos abiertos!"
              : "Lamentamos que no puedas asistir. Te tendremos en nuestros corazones."}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      className="py-20 px-6 text-center"
      style={{ backgroundColor: colors.secondary }}
    >
      <div className="max-w-sm mx-auto">
        {variant === "classic" && (
          <div className="mb-4 flex justify-center opacity-25">
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke={colors.primary}
              strokeWidth="1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>
          </div>
        )}

        <h2
          className="text-4xl mb-3"
          style={{
            fontFamily: `'${fonts.heading}', cursive`,
            color: colors.primary,
          }}
        >
          Confirmar Asistencia
        </h2>

        {deadline && (
          <p
            className="text-xs mb-8"
            style={{
              color: colors.text,
              opacity: 0.5,
              fontFamily: `'${fonts.body}', sans-serif`,
            }}
          >
            Confirma antes del{" "}
            {new Date(deadline).toLocaleDateString("es-ES", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        )}

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          {/* Attending buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setAttending(true)}
              className="flex-1 rounded-xl py-3 text-sm font-medium transition-all border-2"
              style={{
                backgroundColor:
                  attending === true ? colors.primary : colors.background,
                color: attending === true ? colors.background : colors.text,
                borderColor:
                  attending === true ? colors.primary : `${colors.accent}30`,
                fontFamily: `'${fonts.body}', sans-serif`,
              }}
            >
              Asistire
            </button>
            <button
              type="button"
              onClick={() => setAttending(false)}
              className="flex-1 rounded-xl py-3 text-sm font-medium transition-all border-2"
              style={{
                backgroundColor:
                  attending === false ? colors.text : colors.background,
                color: attending === false ? colors.background : colors.text,
                borderColor:
                  attending === false ? colors.text : `${colors.accent}30`,
                fontFamily: `'${fonts.body}', sans-serif`,
              }}
            >
              No podre ir
            </button>
          </div>

          {/* Name */}
          <input
            type="text"
            placeholder="Tu nombre completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full rounded-xl px-4 py-3 text-sm border focus:outline-none focus:ring-2 focus:ring-offset-1"
            style={
              { ...inputStyle, "--tw-ring-color": `${colors.accent}40` } as any
            }
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Tu email (opcional)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl px-4 py-3 text-sm border focus:outline-none focus:ring-2 focus:ring-offset-1"
            style={
              { ...inputStyle, "--tw-ring-color": `${colors.accent}40` } as any
            }
          />

          {/* Guests count */}
          {attending && maxGuests > 0 && (
            <div>
              <label
                className="text-xs block mb-1"
                style={{
                  color: colors.text,
                  opacity: 0.6,
                  fontFamily: `'${fonts.body}', sans-serif`,
                }}
              >
                Acompanantes adicionales
              </label>
              <select
                value={guestsCount}
                onChange={(e) => setGuestsCount(parseInt(e.target.value))}
                className="w-full rounded-xl px-4 py-3 text-sm border focus:outline-none"
                style={inputStyle}
              >
                {Array.from({ length: maxGuests + 1 }, (_, i) => (
                  <option key={i} value={i}>
                    {i === 0
                      ? "Solo yo"
                      : `+${i} acompanante${i > 1 ? "s" : ""}`}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Dietary notes */}
          {showDietary && attending && (
            <textarea
              placeholder="Restricciones alimentarias (opcional)"
              value={dietaryNotes}
              onChange={(e) => setDietaryNotes(e.target.value)}
              rows={2}
              className="w-full rounded-xl px-4 py-3 text-sm border focus:outline-none resize-none"
              style={inputStyle}
            />
          )}

          {/* Message */}
          {showMessage && (
            <textarea
              placeholder="Mensaje para los anfitriones (opcional)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="w-full rounded-xl px-4 py-3 text-sm border focus:outline-none resize-none"
              style={inputStyle}
            />
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || attending === null}
            className="w-full rounded-xl py-3.5 text-sm font-semibold transition-all disabled:opacity-50"
            style={{
              backgroundColor: colors.primary,
              color: colors.background,
              fontFamily: `'${fonts.body}', sans-serif`,
            }}
          >
            {loading ? "Enviando..." : "Confirmar"}
          </button>
        </form>
      </div>
    </section>
  );
}
