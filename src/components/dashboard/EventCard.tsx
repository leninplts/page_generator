import { useState } from "react";
import { Dropdown } from "../ui/dropdown";
import { ConfirmDialog } from "../ui/confirm-dialog";

interface EventCardProps {
  id: string;
  title: string;
  eventType: string;
  status: "draft" | "published" | "archived";
  eventDate: string | null;
  slug: string;
}

const eventTypeLabels: Record<string, { label: string; icon: string }> = {
  birthday: { label: "Cumpleanos", icon: "🎂" },
  xv: { label: "XV Anos", icon: "👑" },
  baptism: { label: "Bautizo", icon: "✝️" },
  wedding: { label: "Boda", icon: "💍" },
  graduation: { label: "Graduacion", icon: "🎓" },
};

const statusStyles: Record<
  string,
  { bg: string; text: string; label: string }
> = {
  draft: { bg: "bg-amber-50", text: "text-amber-700", label: "Borrador" },
  published: { bg: "bg-green-50", text: "text-green-700", label: "Publicado" },
  archived: { bg: "bg-slate-100", text: "text-slate-600", label: "Archivado" },
};

export function EventCard({
  id,
  title,
  eventType,
  status,
  eventDate,
  slug,
}: EventCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const type = eventTypeLabels[eventType] || { label: eventType, icon: "📅" };
  const statusStyle = statusStyles[status] || statusStyles.draft;

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await fetch(`/api/events/${id}`, { method: "DELETE" });
      if (res.ok) {
        window.location.reload();
      }
    } catch (err) {
      console.error("Error deleting event:", err);
    } finally {
      setDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    try {
      const res = await fetch(`/api/events/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        window.location.reload();
      }
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const handleDuplicate = async () => {
    try {
      // Fetch original event data
      const res = await fetch(`/api/events/${id}`);
      if (!res.ok) return;
      const eventData = await res.json();

      // Create new event with same data
      const createRes = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventType: eventData.eventType,
          title: `${eventData.title} (copia)`,
          eventDate: eventData.eventDate || undefined,
          eventTime: eventData.eventTime || undefined,
          timezone: eventData.timezone,
        }),
      });
      if (createRes.ok) {
        window.location.reload();
      }
    } catch (err) {
      console.error("Error duplicating event:", err);
    }
  };

  const dropdownItems = [
    {
      label: "Editar",
      icon: (
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          />
        </svg>
      ),
      onClick: () => {
        window.location.href = `/dashboard/events/${id}`;
      },
    },
    {
      label: "Duplicar",
      icon: (
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
          />
        </svg>
      ),
      onClick: handleDuplicate,
    },
    ...(status === "draft"
      ? [
          {
            label: "Publicar",
            icon: (
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                />
              </svg>
            ),
            onClick: () => handleStatusChange("published"),
          },
        ]
      : status === "published"
        ? [
            {
              label: "Archivar",
              icon: (
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                  />
                </svg>
              ),
              onClick: () => handleStatusChange("archived"),
            },
          ]
        : [
            {
              label: "Restaurar",
              icon: (
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182"
                  />
                </svg>
              ),
              onClick: () => handleStatusChange("draft"),
            },
          ]),
    {
      label: "Eliminar",
      icon: (
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
      ),
      onClick: () => setShowDeleteDialog(true),
      variant: "destructive" as const,
    },
  ];

  return (
    <>
      <div className="group relative rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-indigo-200">
        {/* Header with dropdown */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{type.icon}</span>
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              {type.label}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyle.bg} ${statusStyle.text}`}
            >
              {statusStyle.label}
            </span>
            <Dropdown items={dropdownItems} />
          </div>
        </div>

        {/* Title - clickable to edit */}
        <a href={`/dashboard/events/${id}`} className="block mt-3">
          <h3 className="text-base font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
            {title}
          </h3>
        </a>

        {/* Date */}
        {eventDate && (
          <p className="mt-1 text-sm text-slate-500">
            {new Date(eventDate).toLocaleDateString("es-ES", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        )}

        {/* Edit link */}
        <a
          href={`/dashboard/events/${id}`}
          className="mt-4 flex items-center text-xs text-slate-400 group-hover:text-indigo-500 transition-colors"
        >
          <span>Editar invitacion</span>
          <svg
            className="ml-1 h-3.5 w-3.5"
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
        </a>
      </div>

      {/* Delete confirmation dialog */}
      <ConfirmDialog
        isOpen={showDeleteDialog}
        title="Eliminar evento"
        message={`Estas seguro de que quieres eliminar "${title}"? Esta accion no se puede deshacer.`}
        confirmLabel="Eliminar"
        variant="destructive"
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteDialog(false)}
      />
    </>
  );
}
