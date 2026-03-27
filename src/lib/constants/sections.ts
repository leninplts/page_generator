export const SECTION_DEFINITIONS = {
  hero: {
    label: 'Portada',
    icon: '🖼️',
    description: 'Imagen principal con nombres y fecha',
    fields: ['image', 'title', 'subtitle', 'date'],
  },
  countdown: {
    label: 'Cuenta Regresiva',
    icon: '⏰',
    description: 'Contador animado hacia el evento',
    fields: ['style', 'endMessage'],
  },
  story: {
    label: 'Nuestra Historia',
    icon: '📖',
    description: 'Texto narrativo sobre el evento',
    fields: ['title', 'content', 'image'],
  },
  ceremony: {
    label: 'Ceremonia',
    icon: '⛪',
    description: 'Lugar y hora de la ceremonia',
    fields: ['placeName', 'address', 'time', 'latitude', 'longitude', 'notes'],
  },
  reception: {
    label: 'Recepcion',
    icon: '🎉',
    description: 'Lugar y hora de la fiesta',
    fields: ['placeName', 'address', 'time', 'latitude', 'longitude', 'notes'],
  },
  godparents: {
    label: 'Padrinos y Familia',
    icon: '👨‍👩‍👧‍👦',
    description: 'Padrinos, padres y familia',
    fields: ['people'],
  },
  gallery: {
    label: 'Galeria',
    icon: '📸',
    description: 'Fotos del evento o los festejados',
    fields: ['images'],
  },
  video: {
    label: 'Video',
    icon: '🎬',
    description: 'Video especial del evento',
    fields: ['url', 'type', 'poster'],
  },
  itinerary: {
    label: 'Itinerario',
    icon: '📋',
    description: 'Programa del evento',
    fields: ['items'],
  },
  dresscode: {
    label: 'Codigo de Vestimenta',
    icon: '👔',
    description: 'Indicaciones de vestimenta',
    fields: ['description', 'colors', 'examples'],
  },
  entertainment: {
    label: 'Amenidades',
    icon: '🎵',
    description: 'Musica y entretenimiento',
    fields: ['items'],
  },
  gifts: {
    label: 'Mesa de Regalos',
    icon: '🎁',
    description: 'Links de mesa de regalos o datos bancarios',
    fields: ['items'],
  },
  rsvp: {
    label: 'Confirmacion',
    icon: '✉️',
    description: 'Formulario de confirmacion de asistencia',
    fields: ['deadline', 'maxGuests', 'showDietary', 'showMessage'],
  },
  message: {
    label: 'Mensaje',
    icon: '💌',
    description: 'Mensaje o dedicatoria especial',
    fields: ['title', 'content'],
  },
  music: {
    label: 'Musica de Fondo',
    icon: '🎶',
    description: 'Musica ambiental de la invitacion',
    fields: ['audioUrl', 'autoplay'],
  },
} as const;

export type SectionType = keyof typeof SECTION_DEFINITIONS;
