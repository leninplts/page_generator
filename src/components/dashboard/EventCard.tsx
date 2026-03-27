interface EventCardProps {
  title: string;
  eventType: string;
  status: 'draft' | 'published' | 'archived';
  eventDate: string | null;
  slug: string;
}

const eventTypeLabels: Record<string, { label: string; icon: string }> = {
  birthday: { label: 'Cumpleanos', icon: '🎂' },
  xv: { label: 'XV Anos', icon: '👑' },
  baptism: { label: 'Bautizo', icon: '✝️' },
  wedding: { label: 'Boda', icon: '💍' },
  graduation: { label: 'Graduacion', icon: '🎓' },
};

const statusStyles: Record<string, { bg: string; text: string; label: string }> = {
  draft: { bg: 'bg-amber-50', text: 'text-amber-700', label: 'Borrador' },
  published: { bg: 'bg-green-50', text: 'text-green-700', label: 'Publicado' },
  archived: { bg: 'bg-slate-100', text: 'text-slate-600', label: 'Archivado' },
};

export function EventCard({ title, eventType, status, eventDate, slug }: EventCardProps) {
  const type = eventTypeLabels[eventType] || { label: eventType, icon: '📅' };
  const statusStyle = statusStyles[status] || statusStyles.draft;

  return (
    <a
      href={`/dashboard/events/${slug}`}
      className="group block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-indigo-200"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{type.icon}</span>
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
            {type.label}
          </span>
        </div>
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyle.bg} ${statusStyle.text}`}>
          {statusStyle.label}
        </span>
      </div>

      {/* Title */}
      <h3 className="mt-3 text-base font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
        {title}
      </h3>

      {/* Date */}
      {eventDate && (
        <p className="mt-1 text-sm text-slate-500">
          {new Date(eventDate).toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      )}

      {/* Actions hint */}
      <div className="mt-4 flex items-center text-xs text-slate-400 group-hover:text-indigo-500 transition-colors">
        <span>Editar invitacion</span>
        <svg className="ml-1 h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </div>
    </a>
  );
}
