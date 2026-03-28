import { useState, useEffect, useCallback } from "react";

interface Rsvp {
  id: string;
  name: string;
  email: string | null;
  attending: boolean;
  guestsCount: number;
  dietaryNotes: string | null;
  message: string | null;
  createdAt: string;
}

interface Stats {
  total: number;
  attending: number;
  notAttending: number;
  totalGuests: number;
}

interface RsvpPanelProps {
  eventId: string;
}

export function RsvpPanel({ eventId }: RsvpPanelProps) {
  const [rsvps, setRsvps] = useState<Rsvp[]>([]);
  const [stats, setStats] = useState<Stats>({
    total: 0,
    attending: 0,
    notAttending: 0,
    totalGuests: 0,
  });
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    fetch(`/api/events/${eventId}/rsvps`)
      .then((r) => r.json())
      .then((data) => {
        setRsvps(data.rsvps || []);
        setStats(
          data.stats || {
            total: 0,
            attending: 0,
            notAttending: 0,
            totalGuests: 0,
          },
        );
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [eventId]);

  const handleDownloadCSV = useCallback(() => {
    if (rsvps.length === 0) return;

    const headers = [
      "Nombre",
      "Email",
      "Asiste",
      "Acompanantes",
      "Notas alimentarias",
      "Mensaje",
      "Fecha",
    ];
    const rows = rsvps.map((r) => [
      r.name,
      r.email || "",
      r.attending ? "Si" : "No",
      String(r.guestsCount || 0),
      r.dietaryNotes || "",
      r.message || "",
      new Date(r.createdAt).toLocaleDateString("es-ES"),
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) =>
        row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(","),
      ),
    ].join("\n");

    const blob = new Blob(["\uFEFF" + csvContent], {
      type: "text/csv;charset=utf-8;",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `rsvps-${eventId.slice(0, 8)}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
  }, [rsvps, eventId]);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between border-b border-slate-100 px-6 py-4 hover:bg-slate-50/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <h3 className="text-base font-semibold text-slate-900">
            Confirmaciones (RSVP)
          </h3>
          {!loading && (
            <span className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700">
              {stats.total}
            </span>
          )}
        </div>
        <svg
          className={`h-5 w-5 text-slate-400 transition-transform ${expanded ? "rotate-180" : ""}`}
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
      </button>

      {expanded && (
        <div className="p-6">
          {loading ? (
            <p className="text-sm text-slate-400 text-center py-4">
              Cargando...
            </p>
          ) : rsvps.length === 0 ? (
            <p className="text-sm text-slate-400 text-center py-4">
              Aun no hay confirmaciones.
            </p>
          ) : (
            <>
              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="rounded-xl bg-green-50 p-3 text-center">
                  <p className="text-2xl font-bold text-green-700">
                    {stats.attending}
                  </p>
                  <p className="text-xs text-green-600">Asisten</p>
                </div>
                <div className="rounded-xl bg-red-50 p-3 text-center">
                  <p className="text-2xl font-bold text-red-700">
                    {stats.notAttending}
                  </p>
                  <p className="text-xs text-red-600">No asisten</p>
                </div>
                <div className="rounded-xl bg-indigo-50 p-3 text-center">
                  <p className="text-2xl font-bold text-indigo-700">
                    {stats.totalGuests}
                  </p>
                  <p className="text-xs text-indigo-600">Total personas</p>
                </div>
              </div>

              {/* RSVP list */}
              <div className="space-y-3 max-h-80 overflow-y-auto mb-4">
                {rsvps.map((r) => (
                  <div
                    key={r.id}
                    className="flex items-start gap-3 rounded-xl border border-slate-100 p-3"
                  >
                    <div
                      className={`mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full ${
                        r.attending ? "bg-green-100" : "bg-red-100"
                      }`}
                    >
                      {r.attending ? (
                        <svg
                          className="h-3.5 w-3.5 text-green-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 12.75l6 6 9-13.5"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="h-3.5 w-3.5 text-red-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900">
                        {r.name}
                      </p>
                      {r.email && (
                        <p className="text-xs text-slate-400">{r.email}</p>
                      )}
                      <div className="mt-1 flex flex-wrap gap-2">
                        {r.guestsCount > 0 && (
                          <span className="text-xs text-slate-500">
                            +{r.guestsCount} acompanantes
                          </span>
                        )}
                        {r.dietaryNotes && (
                          <span className="text-xs text-amber-600">
                            Dieta: {r.dietaryNotes}
                          </span>
                        )}
                      </div>
                      {r.message && (
                        <p className="mt-1 text-xs text-slate-500 italic">
                          "{r.message}"
                        </p>
                      )}
                    </div>
                    <span className="text-xs text-slate-300 whitespace-nowrap">
                      {new Date(r.createdAt).toLocaleDateString("es-ES", {
                        day: "numeric",
                        month: "short",
                      })}
                    </span>
                  </div>
                ))}
              </div>

              {/* Export CSV */}
              <button
                onClick={handleDownloadCSV}
                className="w-full flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
              >
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
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                  />
                </svg>
                Descargar CSV
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
