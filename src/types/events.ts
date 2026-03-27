import type { EventType, SectionType } from '.';

export interface Event {
  id: string;
  userId: string;
  templateId: string | null;
  eventType: EventType;
  title: string;
  slug: string;
  status: 'draft' | 'published' | 'archived';
  eventDate: string | null;
  eventTime: string | null;
  timezone: string;
  customConfig: Record<string, unknown>;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface EventSection {
  id: string;
  eventId: string;
  sectionType: SectionType;
  order: number;
  isActive: boolean;
  config: Record<string, unknown>;
  content: Record<string, unknown>;
}

export interface EventMedia {
  id: string;
  eventId: string;
  type: 'image' | 'audio' | 'video';
  url: string;
  thumbnailUrl: string | null;
  altText: string | null;
  order: number;
  sectionId: string | null;
  metadata: Record<string, unknown>;
}

export interface RSVP {
  id: string;
  eventId: string;
  name: string;
  email: string | null;
  attending: boolean;
  guestsCount: number;
  dietaryNotes: string | null;
  message: string | null;
  createdAt: Date;
}
