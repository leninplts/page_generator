import type { EventType } from '.';

export interface Template {
  id: string;
  name: string;
  slug: string;
  eventType: EventType;
  category: string;
  previewImage: string | null;
  defaultConfig: Record<string, unknown>;
  sectionsSchema: Record<string, unknown>[];
  isActive: boolean;
  createdAt: Date;
}
