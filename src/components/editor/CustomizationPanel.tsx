import { useState, useRef, useCallback } from "react";
import { Label } from "../ui/label";
import { clsx } from "clsx";

interface CustomConfig {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
}

interface CustomizationPanelProps {
  eventId: string;
  initialConfig: CustomConfig;
}

const FONT_OPTIONS = [
  { value: "Playfair Display", label: "Playfair Display", style: "serif" },
  { value: "Great Vibes", label: "Great Vibes", style: "cursive" },
  { value: "Montserrat", label: "Montserrat", style: "sans-serif" },
  { value: "Lato", label: "Lato", style: "sans-serif" },
  { value: "Open Sans", label: "Open Sans", style: "sans-serif" },
  { value: "Raleway", label: "Raleway", style: "sans-serif" },
  { value: "Poppins", label: "Poppins", style: "sans-serif" },
  { value: "Nunito", label: "Nunito", style: "sans-serif" },
  { value: "Cormorant Garamond", label: "Cormorant Garamond", style: "serif" },
  { value: "Merriweather", label: "Merriweather", style: "serif" },
  { value: "Source Sans Pro", label: "Source Sans Pro", style: "sans-serif" },
  { value: "Fredoka One", label: "Fredoka One", style: "display" },
  { value: "Alex Brush", label: "Alex Brush", style: "cursive" },
  { value: "Dancing Script", label: "Dancing Script", style: "cursive" },
  { value: "Inter", label: "Inter", style: "sans-serif" },
];

const COLOR_FIELDS = [
  {
    key: "primary",
    label: "Color primario",
    description: "Titulos y acentos principales",
  },
  {
    key: "secondary",
    label: "Color secundario",
    description: "Fondos alternos de secciones",
  },
  { key: "accent", label: "Color acento", description: "Botones y detalles" },
  {
    key: "background",
    label: "Fondo",
    description: "Color de fondo principal",
  },
  { key: "text", label: "Texto", description: "Color del texto general" },
] as const;

export function CustomizationPanel({
  eventId,
  initialConfig,
}: CustomizationPanelProps) {
  const [config, setConfig] = useState<CustomConfig>(initialConfig);
  const [isOpen, setIsOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const saveConfig = useCallback(
    async (newConfig: CustomConfig) => {
      setSaving(true);
      try {
        await fetch(`/api/events/${eventId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ customConfig: newConfig }),
        });
        setLastSaved(
          new Date().toLocaleTimeString("es-ES", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        );
      } catch (err) {
        console.error("Error saving config:", err);
      } finally {
        setSaving(false);
      }
    },
    [eventId],
  );

  const debouncedSave = useCallback(
    (newConfig: CustomConfig) => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
      saveTimerRef.current = setTimeout(() => saveConfig(newConfig), 800);
    },
    [saveConfig],
  );

  const updateColor = (key: string, value: string) => {
    const newConfig = {
      ...config,
      colors: { ...config.colors, [key]: value },
    };
    setConfig(newConfig);
    debouncedSave(newConfig);
  };

  const updateFont = (key: string, value: string) => {
    const newConfig = {
      ...config,
      fonts: { ...config.fonts, [key]: value },
    };
    setConfig(newConfig);
    debouncedSave(newConfig);
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Header — clickable to toggle */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between px-6 py-4"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50">
            <svg
              className="h-5 w-5 text-orange-600"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"
              />
            </svg>
          </div>
          <div className="text-left">
            <h3 className="text-sm font-semibold text-slate-900">
              Personalizacion Visual
            </h3>
            <p className="text-xs text-slate-500">
              Colores, tipografias y estilos
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* Color preview dots */}
          <div className="hidden sm:flex items-center gap-1">
            {Object.values(config.colors)
              .slice(0, 4)
              .map((color, i) => (
                <div
                  key={i}
                  className="h-4 w-4 rounded-full border border-slate-200"
                  style={{ backgroundColor: color }}
                />
              ))}
          </div>
          {/* Save indicator */}
          <span className="text-xs text-slate-400">
            {saving && "Guardando..."}
            {!saving && lastSaved && (
              <span className="text-green-600">Guardado</span>
            )}
          </span>
          {/* Chevron */}
          <svg
            className={clsx(
              "h-4 w-4 text-slate-400 transition-transform",
              isOpen && "rotate-180",
            )}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>
      </button>

      {/* Content */}
      {isOpen && (
        <div className="border-t border-slate-100 px-6 py-5 space-y-6">
          {/* Colors */}
          <div>
            <h4 className="text-sm font-semibold text-slate-900 mb-3">
              Paleta de colores
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {COLOR_FIELDS.map((field) => (
                <div key={field.key} className="space-y-1.5">
                  <Label className="text-xs">{field.label}</Label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={config.colors[field.key]}
                      onChange={(e) => updateColor(field.key, e.target.value)}
                      className="h-9 w-12 cursor-pointer rounded-lg border border-slate-200 p-0.5"
                    />
                    <input
                      type="text"
                      value={config.colors[field.key]}
                      onChange={(e) => updateColor(field.key, e.target.value)}
                      className="h-9 flex-1 rounded-lg border border-slate-200 px-2 text-xs font-mono text-slate-600 uppercase focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-300"
                    />
                  </div>
                  <p className="text-[10px] text-slate-400">
                    {field.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Fonts */}
          <div>
            <h4 className="text-sm font-semibold text-slate-900 mb-3">
              Tipografias
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs">Fuente de titulos</Label>
                <select
                  value={config.fonts.heading}
                  onChange={(e) => updateFont("heading", e.target.value)}
                  className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-300"
                >
                  {FONT_OPTIONS.map((font) => (
                    <option key={font.value} value={font.value}>
                      {font.label} ({font.style})
                    </option>
                  ))}
                </select>
                <p
                  className="text-lg mt-1"
                  style={{ fontFamily: `'${config.fonts.heading}', serif` }}
                >
                  Vista previa del titulo
                </p>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Fuente del cuerpo</Label>
                <select
                  value={config.fonts.body}
                  onChange={(e) => updateFont("body", e.target.value)}
                  className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-300"
                >
                  {FONT_OPTIONS.map((font) => (
                    <option key={font.value} value={font.value}>
                      {font.label} ({font.style})
                    </option>
                  ))}
                </select>
                <p
                  className="text-sm mt-1"
                  style={{ fontFamily: `'${config.fonts.body}', sans-serif` }}
                >
                  Vista previa del texto de cuerpo
                </p>
              </div>
            </div>
          </div>

          {/* Color Preview Bar */}
          <div>
            <h4 className="text-sm font-semibold text-slate-900 mb-2">
              Vista previa de paleta
            </h4>
            <div className="flex h-14 rounded-xl overflow-hidden shadow-inner border border-slate-100">
              <div
                className="flex-1"
                style={{ backgroundColor: config.colors.primary }}
              />
              <div
                className="flex-1"
                style={{ backgroundColor: config.colors.secondary }}
              />
              <div
                className="flex-1"
                style={{ backgroundColor: config.colors.accent }}
              />
              <div
                className="flex-1"
                style={{ backgroundColor: config.colors.background }}
              />
              <div
                className="flex-1 flex items-center justify-center text-xs font-medium"
                style={{
                  backgroundColor: config.colors.background,
                  color: config.colors.text,
                }}
              >
                Texto
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
