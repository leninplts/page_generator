import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Stepper } from "../ui/stepper";
import { clsx } from "clsx";

const EVENT_TYPES = [
  {
    value: "birthday",
    label: "Cumpleanos",
    icon: "🎂",
    description: "Celebra un ano mas de vida",
  },
  {
    value: "xv",
    label: "XV Anos",
    icon: "👑",
    description: "La fiesta de quince anos",
  },
  {
    value: "baptism",
    label: "Bautizo",
    icon: "✝️",
    description: "Celebra el bautizo de tu bebe",
  },
  {
    value: "wedding",
    label: "Boda",
    icon: "💍",
    description: "El dia mas especial",
  },
  {
    value: "graduation",
    label: "Graduacion",
    icon: "🎓",
    description: "Celebra tu logro academico",
  },
];

const STEPS = [
  { label: "Tipo de evento" },
  { label: "Detalles" },
  { label: "Diseno" },
  { label: "Confirmar" },
];

interface Template {
  id: string;
  name: string;
  slug: string;
  category: string;
  defaultConfig: {
    colors: {
      primary: string;
      secondary: string;
      accent: string;
      background: string;
      text: string;
    };
    fonts: { heading: string; body: string };
  };
}

export function EventWizard() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Form state
  const [eventType, setEventType] = useState("");
  const [title, setTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [templateId, setTemplateId] = useState("");

  // Templates
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loadingTemplates, setLoadingTemplates] = useState(false);

  const selectedType = EVENT_TYPES.find((t) => t.value === eventType);
  const selectedTemplate = templates.find((t) => t.id === templateId);

  const canProceedStep1 = eventType !== "";
  const canProceedStep2 = title.trim().length >= 3;
  const canProceedStep3 = templateId !== "";

  // Fetch templates when entering step 3
  useEffect(() => {
    if (step === 2 && eventType) {
      setLoadingTemplates(true);
      fetch(`/api/templates?eventType=${eventType}`)
        .then((res) => res.json())
        .then((data) => {
          setTemplates(data);
          setLoadingTemplates(false);
        })
        .catch(() => setLoadingTemplates(false));
    }
  }, [step, eventType]);

  const handleCreate = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventType,
          title,
          eventDate: eventDate || undefined,
          eventTime: eventTime || undefined,
          templateId: templateId || undefined,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Error al crear el evento");
        return;
      }
      const event = await res.json();
      window.location.href = `/dashboard/events/${event.id}`;
    } catch (err) {
      setError("Error de conexion. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <Stepper steps={STEPS} currentStep={step} />

      {error && (
        <div className="mb-6 rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Step 1: Event Type */}
      {step === 0 && (
        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-2">
            Que tipo de evento vas a celebrar?
          </h2>
          <p className="text-sm text-slate-500 mb-6">
            Selecciona el tipo de evento para personalizar tu invitacion.
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {EVENT_TYPES.map((type) => (
              <button
                key={type.value}
                type="button"
                onClick={() => {
                  setEventType(type.value);
                  setTemplateId("");
                }}
                className={clsx(
                  "flex items-center gap-4 rounded-xl border-2 p-4 text-left transition-all",
                  eventType === type.value
                    ? "border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm",
                )}
              >
                <span className="text-3xl">{type.icon}</span>
                <div>
                  <p className="font-semibold text-slate-900">{type.label}</p>
                  <p className="text-sm text-slate-500">{type.description}</p>
                </div>
              </button>
            ))}
          </div>
          <div className="mt-8 flex justify-end">
            <Button
              onClick={() => setStep(1)}
              disabled={!canProceedStep1}
              size="lg"
            >
              Siguiente
              <svg
                className="ml-2 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </Button>
          </div>
        </div>
      )}

      {/* Step 2: Details */}
      {step === 1 && (
        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-2">
            Datos del evento
          </h2>
          <p className="text-sm text-slate-500 mb-6">
            Ingresa los datos basicos de tu{" "}
            {selectedType?.label.toLowerCase() || "evento"}.
          </p>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="title" required>
                Titulo del evento
              </Label>
              <Input
                id="title"
                type="text"
                placeholder={
                  eventType === "wedding"
                    ? "Boda de Juan y Maria"
                    : eventType === "xv"
                      ? "XV Anos de Sofia"
                      : eventType === "baptism"
                        ? "Bautizo de Mateo"
                        : eventType === "graduation"
                          ? "Graduacion de Carlos"
                          : "Cumpleanos de Ana"
                }
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="eventDate">Fecha del evento</Label>
                <Input
                  id="eventDate"
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="eventTime">Hora del evento</Label>
                <Input
                  id="eventTime"
                  type="time"
                  value={eventTime}
                  onChange={(e) => setEventTime(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="mt-8 flex justify-between">
            <Button variant="outline" onClick={() => setStep(0)}>
              <svg
                className="mr-2 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
              Atras
            </Button>
            <Button
              onClick={() => setStep(2)}
              disabled={!canProceedStep2}
              size="lg"
            >
              Siguiente
              <svg
                className="ml-2 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Template Selection */}
      {step === 2 && (
        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-2">
            Elige un diseno
          </h2>
          <p className="text-sm text-slate-500 mb-6">
            Selecciona el estilo visual para tu invitacion. Podras
            personalizarlo despues.
          </p>

          {loadingTemplates ? (
            <div className="flex items-center justify-center py-12">
              <svg
                className="h-8 w-8 animate-spin text-indigo-600"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              <span className="ml-3 text-sm text-slate-500">
                Cargando disenos...
              </span>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {templates.map((template) => (
                <button
                  key={template.id}
                  type="button"
                  onClick={() => setTemplateId(template.id)}
                  className={clsx(
                    "rounded-xl border-2 p-4 text-left transition-all",
                    templateId === template.id
                      ? "border-indigo-600 ring-1 ring-indigo-600"
                      : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm",
                  )}
                >
                  {/* Color preview bar */}
                  <div className="flex h-12 rounded-lg overflow-hidden mb-3">
                    <div
                      className="flex-1"
                      style={{
                        backgroundColor: template.defaultConfig.colors.primary,
                      }}
                    />
                    <div
                      className="flex-1"
                      style={{
                        backgroundColor:
                          template.defaultConfig.colors.secondary,
                      }}
                    />
                    <div
                      className="flex-1"
                      style={{
                        backgroundColor: template.defaultConfig.colors.accent,
                      }}
                    />
                    <div
                      className="flex-1"
                      style={{
                        backgroundColor:
                          template.defaultConfig.colors.background,
                      }}
                    />
                  </div>

                  <p className="font-semibold text-slate-900">
                    {template.name}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5 capitalize">
                    {template.category}
                  </p>

                  {/* Font preview */}
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-xs text-slate-400">Fuentes:</span>
                    <span className="text-xs text-slate-600">
                      {template.defaultConfig.fonts.heading}
                    </span>
                    <span className="text-xs text-slate-300">/</span>
                    <span className="text-xs text-slate-600">
                      {template.defaultConfig.fonts.body}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}

          <div className="mt-8 flex justify-between">
            <Button variant="outline" onClick={() => setStep(1)}>
              <svg
                className="mr-2 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
              Atras
            </Button>
            <Button
              onClick={() => setStep(3)}
              disabled={!canProceedStep3}
              size="lg"
            >
              Siguiente
              <svg
                className="ml-2 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </Button>
          </div>
        </div>
      )}

      {/* Step 4: Confirmation */}
      {step === 3 && (
        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-2">
            Confirma tu evento
          </h2>
          <p className="text-sm text-slate-500 mb-6">
            Revisa los datos antes de crear tu invitacion.
          </p>

          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{selectedType?.icon}</span>
              <div>
                <p className="text-sm text-slate-500">Tipo de evento</p>
                <p className="font-semibold text-slate-900">
                  {selectedType?.label}
                </p>
              </div>
            </div>

            <hr className="border-slate-100" />

            <div>
              <p className="text-sm text-slate-500">Titulo</p>
              <p className="font-semibold text-slate-900">{title}</p>
            </div>

            {eventDate && (
              <div>
                <p className="text-sm text-slate-500">Fecha</p>
                <p className="font-semibold text-slate-900">
                  {new Date(eventDate + "T00:00:00").toLocaleDateString(
                    "es-ES",
                    {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    },
                  )}
                </p>
              </div>
            )}

            {eventTime && (
              <div>
                <p className="text-sm text-slate-500">Hora</p>
                <p className="font-semibold text-slate-900">{eventTime} hrs</p>
              </div>
            )}

            {selectedTemplate && (
              <>
                <hr className="border-slate-100" />
                <div>
                  <p className="text-sm text-slate-500">Diseno</p>
                  <div className="flex items-center gap-3 mt-1">
                    <div className="flex h-6 w-20 rounded overflow-hidden">
                      <div
                        className="flex-1"
                        style={{
                          backgroundColor:
                            selectedTemplate.defaultConfig.colors.primary,
                        }}
                      />
                      <div
                        className="flex-1"
                        style={{
                          backgroundColor:
                            selectedTemplate.defaultConfig.colors.secondary,
                        }}
                      />
                      <div
                        className="flex-1"
                        style={{
                          backgroundColor:
                            selectedTemplate.defaultConfig.colors.accent,
                        }}
                      />
                    </div>
                    <p className="font-semibold text-slate-900">
                      {selectedTemplate.name}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>

          <p className="mt-4 text-sm text-slate-500">
            Despues de crear el evento, podras personalizar todos los detalles
            de tu invitacion.
          </p>

          <div className="mt-8 flex justify-between">
            <Button variant="outline" onClick={() => setStep(2)}>
              <svg
                className="mr-2 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
              Atras
            </Button>
            <Button onClick={handleCreate} loading={loading} size="lg">
              Crear Invitacion
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
