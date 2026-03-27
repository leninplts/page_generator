import { z } from "zod";

// Event types
export const eventTypeSchema = z.enum([
  "birthday",
  "xv",
  "baptism",
  "wedding",
  "graduation",
]);
export type EventTypeValue = z.infer<typeof eventTypeSchema>;

// Base event creation (step 1-2 of wizard)
export const createEventSchema = z.object({
  eventType: eventTypeSchema,
  title: z
    .string()
    .min(3, "El titulo debe tener al menos 3 caracteres")
    .max(255),
  eventDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha invalido (YYYY-MM-DD)")
    .optional(),
  eventTime: z
    .string()
    .regex(/^\d{2}:\d{2}$/, "Formato de hora invalido (HH:MM)")
    .optional(),
  timezone: z.string().default("America/La_Paz"),
});

export type CreateEventInput = z.infer<typeof createEventSchema>;

// Update event basic info
export const updateEventSchema = z.object({
  title: z.string().min(3).max(255).optional(),
  eventDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional()
    .nullable(),
  eventTime: z
    .string()
    .regex(/^\d{2}:\d{2}$/)
    .optional()
    .nullable(),
  timezone: z.string().optional(),
  status: z.enum(["draft", "published", "archived"]).optional(),
  customConfig: z.record(z.unknown()).optional(),
});

export type UpdateEventInput = z.infer<typeof updateEventSchema>;

// Section content schemas per type
export const heroContentSchema = z.object({
  title: z.string().optional(),
  subtitle: z.string().optional(),
  imageUrl: z.string().url().optional(),
});

export const ceremonyContentSchema = z.object({
  placeName: z.string().optional(),
  address: z.string().optional(),
  time: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  notes: z.string().optional(),
});

export const receptionContentSchema = z.object({
  placeName: z.string().optional(),
  address: z.string().optional(),
  time: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  notes: z.string().optional(),
});

export const godparentSchema = z.object({
  name: z.string(),
  role: z.string(),
  photoUrl: z.string().optional(),
});

export const godparentsContentSchema = z.object({
  people: z.array(godparentSchema).default([]),
});

export const itineraryItemSchema = z.object({
  time: z.string(),
  activity: z.string(),
  description: z.string().optional(),
});

export const itineraryContentSchema = z.object({
  items: z.array(itineraryItemSchema).default([]),
});

export const dressCodeContentSchema = z.object({
  description: z.string().optional(),
  colors: z.array(z.string()).default([]),
  examples: z.string().optional(),
});

export const entertainmentItemSchema = z.object({
  name: z.string(),
  type: z.string(),
  photoUrl: z.string().optional(),
});

export const entertainmentContentSchema = z.object({
  items: z.array(entertainmentItemSchema).default([]),
});

export const giftItemSchema = z.object({
  label: z.string(),
  url: z.string().optional(),
  description: z.string().optional(),
});

export const giftsContentSchema = z.object({
  items: z.array(giftItemSchema).default([]),
});

export const rsvpContentSchema = z.object({
  deadline: z.string().optional(),
  maxGuests: z.number().int().min(0).default(2),
  showDietary: z.boolean().default(false),
  showMessage: z.boolean().default(true),
});

export const messageContentSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
});

export const countdownContentSchema = z.object({
  style: z.enum(["flip", "circular", "numeric"]).default("numeric"),
  endMessage: z.string().default("El evento ya llego!"),
});

export const storyContentSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
  imageUrl: z.string().optional(),
});

export const videoContentSchema = z.object({
  url: z.string().optional(),
  type: z.enum(["youtube", "vimeo", "upload"]).optional(),
  poster: z.string().optional(),
});

export const musicContentSchema = z.object({
  audioUrl: z.string().optional(),
  autoplay: z.boolean().default(true),
});

// Map section type to content schema
export const sectionContentSchemas = {
  hero: heroContentSchema,
  countdown: countdownContentSchema,
  story: storyContentSchema,
  ceremony: ceremonyContentSchema,
  reception: receptionContentSchema,
  godparents: godparentsContentSchema,
  gallery: z.object({ images: z.array(z.string()).default([]) }),
  video: videoContentSchema,
  itinerary: itineraryContentSchema,
  dresscode: dressCodeContentSchema,
  entertainment: entertainmentContentSchema,
  gifts: giftsContentSchema,
  rsvp: rsvpContentSchema,
  message: messageContentSchema,
  music: musicContentSchema,
} as const;

// Update section
export const updateSectionSchema = z.object({
  isActive: z.boolean().optional(),
  order: z.number().int().min(0).optional(),
  config: z.record(z.unknown()).optional(),
  content: z.record(z.unknown()).optional(),
});

export type UpdateSectionInput = z.infer<typeof updateSectionSchema>;
