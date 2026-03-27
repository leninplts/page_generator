import { useState, useCallback } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { clsx } from "clsx";

interface Section {
  id: string;
  sectionType: string;
  order: number;
  isActive: boolean;
  config: Record<string, unknown>;
  content: Record<string, unknown>;
}

interface SectionEditorProps {
  eventId: string;
  initialSections: Section[];
}

const SECTION_INFO: Record<
  string,
  { label: string; icon: string; description: string }
> = {
  hero: {
    label: "Portada",
    icon: "🖼️",
    description: "Imagen principal con nombres y fecha",
  },
  countdown: {
    label: "Cuenta Regresiva",
    icon: "⏰",
    description: "Contador animado hacia el evento",
  },
  story: {
    label: "Nuestra Historia",
    icon: "📖",
    description: "Texto narrativo sobre el evento",
  },
  ceremony: {
    label: "Ceremonia",
    icon: "⛪",
    description: "Lugar y hora de la ceremonia",
  },
  reception: {
    label: "Recepcion",
    icon: "🎉",
    description: "Lugar y hora de la fiesta",
  },
  godparents: {
    label: "Padrinos y Familia",
    icon: "👨‍👩‍👧‍👦",
    description: "Padrinos, padres y familia",
  },
  gallery: {
    label: "Galeria",
    icon: "📸",
    description: "Fotos del evento",
  },
  video: {
    label: "Video",
    icon: "🎬",
    description: "Video especial",
  },
  itinerary: {
    label: "Itinerario",
    icon: "📋",
    description: "Programa del evento",
  },
  dresscode: {
    label: "Codigo de Vestimenta",
    icon: "👔",
    description: "Indicaciones de vestimenta",
  },
  entertainment: {
    label: "Amenidades",
    icon: "🎵",
    description: "Musica y entretenimiento",
  },
  gifts: {
    label: "Mesa de Regalos",
    icon: "🎁",
    description: "Links o datos bancarios",
  },
  rsvp: {
    label: "Confirmacion",
    icon: "✉️",
    description: "Formulario de asistencia",
  },
  message: {
    label: "Mensaje",
    icon: "💌",
    description: "Dedicatoria especial",
  },
  music: {
    label: "Musica de Fondo",
    icon: "🎶",
    description: "Musica ambiental",
  },
};

function SortableSection({
  section,
  onToggle,
}: {
  section: Section;
  onToggle: (id: string) => void;
}) {
  const info = SECTION_INFO[section.sectionType] || {
    label: section.sectionType,
    icon: "📄",
    description: "",
  };
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={clsx(
        "flex items-center gap-3 rounded-lg border p-3 transition-all",
        isDragging && "z-50 shadow-lg scale-[1.02]",
        section.isActive
          ? "border-slate-200 bg-white"
          : "border-slate-100 bg-slate-50 opacity-60",
      )}
    >
      {/* Drag handle */}
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab touch-none rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 active:cursor-grabbing"
        aria-label="Arrastrar"
      >
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>

      {/* Icon + Info */}
      <span className="text-xl flex-shrink-0">{info.icon}</span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-slate-900">{info.label}</p>
        <p className="truncate text-xs text-slate-400">{info.description}</p>
      </div>

      {/* Toggle */}
      <button
        type="button"
        onClick={() => onToggle(section.id)}
        className={clsx(
          "relative inline-flex h-6 w-11 flex-shrink-0 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
          section.isActive ? "bg-indigo-600" : "bg-slate-200",
        )}
        role="switch"
        aria-checked={section.isActive}
        aria-label={`${section.isActive ? "Desactivar" : "Activar"} ${info.label}`}
      >
        <span
          className={clsx(
            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition-transform",
            section.isActive ? "translate-x-5" : "translate-x-0.5",
          )}
          style={{ marginTop: "2px" }}
        />
      </button>
    </div>
  );
}

export function SectionEditor({
  eventId,
  initialSections,
}: SectionEditorProps) {
  const [sections, setSections] = useState<Section[]>(initialSections);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const saveChanges = useCallback(
    async (updatedSections: Section[]) => {
      setSaving(true);
      try {
        const updates = updatedSections.map((s, index) => ({
          id: s.id,
          order: index,
          isActive: s.isActive,
        }));

        await fetch(`/api/events/${eventId}/sections`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updates),
        });

        setLastSaved(
          new Date().toLocaleTimeString("es-ES", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        );
      } catch (err) {
        console.error("Error saving sections:", err);
      } finally {
        setSaving(false);
      }
    },
    [eventId],
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = sections.findIndex((s) => s.id === active.id);
    const newIndex = sections.findIndex((s) => s.id === over.id);
    const newSections = arrayMove(sections, oldIndex, newIndex);

    setSections(newSections);
    saveChanges(newSections);
  };

  const handleToggle = (id: string) => {
    const newSections = sections.map((s) =>
      s.id === id ? { ...s, isActive: !s.isActive } : s,
    );
    setSections(newSections);
    saveChanges(newSections);
  };

  const activeCount = sections.filter((s) => s.isActive).length;

  return (
    <div>
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            Secciones de la invitacion
          </h3>
          <p className="text-sm text-slate-500">
            Arrastra para reordenar. Activa o desactiva secciones.
            <span className="ml-2 font-medium text-indigo-600">
              {activeCount} activas
            </span>
          </p>
        </div>
        <div className="text-xs text-slate-400">
          {saving && (
            <span className="flex items-center gap-1">
              <svg
                className="h-3 w-3 animate-spin"
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
              Guardando...
            </span>
          )}
          {!saving && lastSaved && (
            <span className="text-green-600">Guardado a las {lastSaved}</span>
          )}
        </div>
      </div>

      {/* Draggable list */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={sections.map((s) => s.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-2">
            {sections.map((section) => (
              <SortableSection
                key={section.id}
                section={section}
                onToggle={handleToggle}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
