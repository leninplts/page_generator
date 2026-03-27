export interface TemplateDefinition {
  name: string;
  slug: string;
  eventType: "birthday" | "xv" | "baptism" | "wedding" | "graduation";
  category: string;
  description: string;
  previewImage: string | null;
  defaultConfig: {
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
  };
  sectionsOrder: string[];
}

// --- WEDDING TEMPLATES ---

export const weddingElegant: TemplateDefinition = {
  name: "Elegante Clasico",
  slug: "wedding-elegant",
  eventType: "wedding",
  category: "elegant",
  description: "Diseno clasico y sofisticado con tonos dorados",
  previewImage: null,
  defaultConfig: {
    colors: {
      primary: "#8B7355",
      secondary: "#D4C5A9",
      accent: "#C9A96E",
      background: "#FDF8F0",
      text: "#3D3229",
    },
    fonts: {
      heading: "Playfair Display",
      body: "Lato",
    },
  },
  sectionsOrder: [
    "hero",
    "countdown",
    "story",
    "ceremony",
    "reception",
    "godparents",
    "gallery",
    "dresscode",
    "gifts",
    "rsvp",
    "message",
    "music",
  ],
};

export const weddingModern: TemplateDefinition = {
  name: "Moderno Minimal",
  slug: "wedding-modern",
  eventType: "wedding",
  category: "modern",
  description: "Lineas limpias y tipografia contemporanea",
  previewImage: null,
  defaultConfig: {
    colors: {
      primary: "#2D3436",
      secondary: "#636E72",
      accent: "#E17055",
      background: "#FFFFFF",
      text: "#2D3436",
    },
    fonts: {
      heading: "Montserrat",
      body: "Open Sans",
    },
  },
  sectionsOrder: [
    "hero",
    "countdown",
    "story",
    "ceremony",
    "reception",
    "godparents",
    "gallery",
    "itinerary",
    "rsvp",
    "message",
    "music",
  ],
};

export const weddingRomantic: TemplateDefinition = {
  name: "Romantico Floral",
  slug: "wedding-romantic",
  eventType: "wedding",
  category: "romantic",
  description: "Suave y romantico con detalles florales",
  previewImage: null,
  defaultConfig: {
    colors: {
      primary: "#B76E79",
      secondary: "#F2D7D9",
      accent: "#D4A5A5",
      background: "#FFF5F5",
      text: "#4A3035",
    },
    fonts: {
      heading: "Great Vibes",
      body: "Raleway",
    },
  },
  sectionsOrder: [
    "hero",
    "countdown",
    "story",
    "ceremony",
    "reception",
    "godparents",
    "gallery",
    "dresscode",
    "entertainment",
    "gifts",
    "rsvp",
    "message",
    "music",
  ],
};

// --- XV ANOS TEMPLATES ---

export const xvPrincess: TemplateDefinition = {
  name: "Princesa",
  slug: "xv-princess",
  eventType: "xv",
  category: "elegant",
  description: "Elegante con tonos rosa y dorado",
  previewImage: null,
  defaultConfig: {
    colors: {
      primary: "#C77DBA",
      secondary: "#F0C5E0",
      accent: "#D4AF37",
      background: "#FFF8FC",
      text: "#3D2B35",
    },
    fonts: {
      heading: "Great Vibes",
      body: "Poppins",
    },
  },
  sectionsOrder: [
    "hero",
    "countdown",
    "godparents",
    "ceremony",
    "reception",
    "gallery",
    "itinerary",
    "dresscode",
    "entertainment",
    "rsvp",
    "message",
    "music",
  ],
};

export const xvModern: TemplateDefinition = {
  name: "XV Moderno",
  slug: "xv-modern",
  eventType: "xv",
  category: "modern",
  description: "Fresco y juvenil con colores vibrantes",
  previewImage: null,
  defaultConfig: {
    colors: {
      primary: "#6C5CE7",
      secondary: "#A29BFE",
      accent: "#FD79A8",
      background: "#FAFAFE",
      text: "#2D3436",
    },
    fonts: {
      heading: "Montserrat",
      body: "Nunito",
    },
  },
  sectionsOrder: [
    "hero",
    "countdown",
    "godparents",
    "ceremony",
    "reception",
    "gallery",
    "video",
    "entertainment",
    "rsvp",
    "message",
    "music",
  ],
};

// --- BAPTISM TEMPLATES ---

export const baptismAngelic: TemplateDefinition = {
  name: "Angelical",
  slug: "baptism-angelic",
  eventType: "baptism",
  category: "elegant",
  description: "Suave y celestial en tonos celestes",
  previewImage: null,
  defaultConfig: {
    colors: {
      primary: "#87CEEB",
      secondary: "#D6EAF8",
      accent: "#5DADE2",
      background: "#F8FBFF",
      text: "#2C3E50",
    },
    fonts: {
      heading: "Playfair Display",
      body: "Lato",
    },
  },
  sectionsOrder: [
    "hero",
    "countdown",
    "godparents",
    "ceremony",
    "reception",
    "gallery",
    "message",
    "music",
  ],
};

export const baptismGarden: TemplateDefinition = {
  name: "Jardin",
  slug: "baptism-garden",
  eventType: "baptism",
  category: "nature",
  description: "Natural y fresco con tonos verdes",
  previewImage: null,
  defaultConfig: {
    colors: {
      primary: "#6B8E6B",
      secondary: "#D4E6D4",
      accent: "#8FBC8F",
      background: "#F5FAF5",
      text: "#2D3B2D",
    },
    fonts: {
      heading: "Cormorant Garamond",
      body: "Nunito",
    },
  },
  sectionsOrder: [
    "hero",
    "countdown",
    "godparents",
    "ceremony",
    "reception",
    "gallery",
    "message",
    "music",
  ],
};

// --- BIRTHDAY TEMPLATES ---

export const birthdayFun: TemplateDefinition = {
  name: "Fiesta",
  slug: "birthday-fun",
  eventType: "birthday",
  category: "fun",
  description: "Colorido y divertido para celebrar",
  previewImage: null,
  defaultConfig: {
    colors: {
      primary: "#FF6B6B",
      secondary: "#FFE66D",
      accent: "#4ECDC4",
      background: "#FFFFFF",
      text: "#2C3E50",
    },
    fonts: {
      heading: "Fredoka One",
      body: "Nunito",
    },
  },
  sectionsOrder: [
    "hero",
    "countdown",
    "reception",
    "gallery",
    "entertainment",
    "rsvp",
    "message",
    "music",
  ],
};

export const birthdayElegant: TemplateDefinition = {
  name: "Celebracion Elegante",
  slug: "birthday-elegant",
  eventType: "birthday",
  category: "elegant",
  description: "Sofisticado para cumpleanos especiales",
  previewImage: null,
  defaultConfig: {
    colors: {
      primary: "#1A1A2E",
      secondary: "#16213E",
      accent: "#E94560",
      background: "#F8F8FF",
      text: "#1A1A2E",
    },
    fonts: {
      heading: "Playfair Display",
      body: "Source Sans Pro",
    },
  },
  sectionsOrder: [
    "hero",
    "countdown",
    "reception",
    "gallery",
    "entertainment",
    "dresscode",
    "rsvp",
    "message",
    "music",
  ],
};

// --- GRADUATION TEMPLATES ---

export const graduationAcademic: TemplateDefinition = {
  name: "Academico",
  slug: "graduation-academic",
  eventType: "graduation",
  category: "elegant",
  description: "Formal y academico para la ceremonia",
  previewImage: null,
  defaultConfig: {
    colors: {
      primary: "#1B3A5C",
      secondary: "#4A7FB5",
      accent: "#D4AF37",
      background: "#F5F7FA",
      text: "#1B3A5C",
    },
    fonts: {
      heading: "Merriweather",
      body: "Open Sans",
    },
  },
  sectionsOrder: [
    "hero",
    "countdown",
    "ceremony",
    "reception",
    "gallery",
    "itinerary",
    "rsvp",
    "message",
    "music",
  ],
};

export const graduationModern: TemplateDefinition = {
  name: "Logro Moderno",
  slug: "graduation-modern",
  eventType: "graduation",
  category: "modern",
  description: "Contemporaneo y fresco para celebrar",
  previewImage: null,
  defaultConfig: {
    colors: {
      primary: "#00B894",
      secondary: "#55EFC4",
      accent: "#FDCB6E",
      background: "#FFFFFF",
      text: "#2D3436",
    },
    fonts: {
      heading: "Montserrat",
      body: "Nunito",
    },
  },
  sectionsOrder: [
    "hero",
    "countdown",
    "ceremony",
    "reception",
    "gallery",
    "video",
    "entertainment",
    "message",
    "music",
  ],
};

// --- ALL TEMPLATES ---

export const ALL_TEMPLATES: TemplateDefinition[] = [
  weddingElegant,
  weddingModern,
  weddingRomantic,
  xvPrincess,
  xvModern,
  baptismAngelic,
  baptismGarden,
  birthdayFun,
  birthdayElegant,
  graduationAcademic,
  graduationModern,
];

export function getTemplatesByEventType(
  eventType: string,
): TemplateDefinition[] {
  return ALL_TEMPLATES.filter((t) => t.eventType === eventType);
}

export function getTemplateBySlug(
  slug: string,
): TemplateDefinition | undefined {
  return ALL_TEMPLATES.find((t) => t.slug === slug);
}
