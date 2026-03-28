import { useState, useMemo } from "react";
import { EventCard } from "./EventCard";

interface Event {
  id: string;
  title: string;
  eventType: string;
  status: "draft" | "published" | "archived";
  eventDate: string | null;
  slug: string;
}

interface EventListProps {
  events: Event[];
}

const eventTypeOptions = [
  { value: "", label: "Todos los tipos" },
  { value: "wedding", label: "Boda" },
  { value: "xv", label: "XV Anos" },
  { value: "baptism", label: "Bautizo" },
  { value: "birthday", label: "Cumpleanos" },
  { value: "graduation", label: "Graduacion" },
];

const statusOptions = [
  { value: "", label: "Todos" },
  { value: "draft", label: "Borrador" },
  { value: "published", label: "Publicado" },
  { value: "archived", label: "Archivado" },
];

export function EventList({ events }: EventListProps) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filtered = useMemo(() => {
    return events.filter((e) => {
      const matchesSearch =
        !search || e.title.toLowerCase().includes(search.toLowerCase());
      const matchesType = !typeFilter || e.eventType === typeFilter;
      const matchesStatus = !statusFilter || e.status === statusFilter;
      return matchesSearch && matchesType && matchesStatus;
    });
  }, [events, search, typeFilter, statusFilter]);

  const hasFilters = search || typeFilter || statusFilter;

  return (
    <div>
      {/* Filter bar */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <svg
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm placeholder:text-slate-400 focus:border-orange-300 focus:outline-none focus:ring-1 focus:ring-orange-500/20"
          />
        </div>

        {/* Type filter */}
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 focus:border-orange-300 focus:outline-none focus:ring-1 focus:ring-orange-500/20"
        >
          {eventTypeOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Status filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 focus:border-orange-300 focus:outline-none focus:ring-1 focus:ring-orange-500/20"
        >
          {statusOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Clear filters */}
        {hasFilters && (
          <button
            onClick={() => {
              setSearch("");
              setTypeFilter("");
              setStatusFilter("");
            }}
            className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-500 hover:bg-slate-50 transition-colors"
          >
            Limpiar
          </button>
        )}
      </div>

      {/* Results count */}
      {hasFilters && (
        <p className="mb-4 text-sm text-slate-500">
          {filtered.length}{" "}
          {filtered.length === 1 ? "evento encontrado" : "eventos encontrados"}
        </p>
      )}

      {/* Event cards grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((event) => (
            <EventCard
              key={event.id}
              id={event.id}
              title={event.title}
              eventType={event.eventType}
              status={event.status}
              eventDate={event.eventDate}
              slug={event.slug}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
          <svg
            className="mx-auto h-10 w-10 text-slate-300"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          <p className="mt-3 text-sm font-medium text-slate-500">
            No se encontraron eventos
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Intenta con otros filtros
          </p>
        </div>
      )}
    </div>
  );
}
