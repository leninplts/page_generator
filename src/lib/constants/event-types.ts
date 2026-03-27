export const EVENT_TYPES = {
  birthday: {
    label: 'Cumpleanos',
    icon: '🎂',
    description: 'Celebra un ano mas de vida',
    requiredSections: ['hero', 'countdown', 'gallery', 'message'],
    optionalSections: ['ceremony', 'reception', 'entertainment', 'dresscode', 'rsvp', 'video', 'music'],
  },
  xv: {
    label: 'XV Anos',
    icon: '👑',
    description: 'La fiesta de quince anos',
    requiredSections: ['hero', 'countdown', 'godparents', 'ceremony', 'reception', 'gallery', 'message', 'music'],
    optionalSections: ['story', 'video', 'itinerary', 'dresscode', 'entertainment', 'gifts', 'rsvp'],
  },
  baptism: {
    label: 'Bautizo',
    icon: '✝️',
    description: 'Celebra el bautizo de tu bebe',
    requiredSections: ['hero', 'countdown', 'godparents', 'ceremony', 'reception', 'gallery', 'message'],
    optionalSections: ['video', 'music', 'rsvp'],
  },
  wedding: {
    label: 'Boda',
    icon: '💍',
    description: 'El dia mas especial',
    requiredSections: ['hero', 'countdown', 'story', 'ceremony', 'reception', 'godparents', 'gallery', 'message', 'music'],
    optionalSections: ['video', 'itinerary', 'dresscode', 'entertainment', 'gifts', 'rsvp'],
  },
  graduation: {
    label: 'Graduacion',
    icon: '🎓',
    description: 'Celebra tu logro academico',
    requiredSections: ['hero', 'countdown', 'ceremony', 'reception', 'gallery', 'message'],
    optionalSections: ['video', 'itinerary', 'dresscode', 'entertainment', 'rsvp', 'music'],
  },
} as const;

export type EventType = keyof typeof EVENT_TYPES;
