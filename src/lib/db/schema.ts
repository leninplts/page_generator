import {
  pgTable,
  uuid,
  varchar,
  text,
  boolean,
  integer,
  timestamp,
  date,
  time,
  pgEnum,
  jsonb,
  uniqueIndex,
  index,
} from "drizzle-orm/pg-core";

// Enums
export const userRoleEnum = pgEnum("user_role", ["admin", "organizer"]);
export const eventTypeEnum = pgEnum("event_type", [
  "birthday",
  "xv",
  "baptism",
  "wedding",
  "graduation",
]);
export const eventStatusEnum = pgEnum("event_status", [
  "draft",
  "published",
  "archived",
]);
export const mediaTypeEnum = pgEnum("media_type", ["image", "audio", "video"]);
export const deviceTypeEnum = pgEnum("device_type", [
  "mobile",
  "tablet",
  "desktop",
]);
export const sectionTypeEnum = pgEnum("section_type", [
  "hero",
  "countdown",
  "story",
  "ceremony",
  "reception",
  "godparents",
  "gallery",
  "video",
  "itinerary",
  "dresscode",
  "entertainment",
  "gifts",
  "rsvp",
  "message",
  "music",
]);

// Tables
// NOTE: Better Auth generates string IDs (not UUIDs), so users.id must be text
export const users = pgTable("users", {
  id: text("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  role: userRoleEnum("role").default("organizer").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const sessions = pgTable("sessions", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

export const accounts = pgTable("accounts", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const verifications = pgTable("verifications", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const templates = pgTable(
  "templates",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    eventType: eventTypeEnum("event_type").notNull(),
    category: varchar("category", { length: 100 }).notNull(),
    previewImage: text("preview_image"),
    defaultConfig: jsonb("default_config")
      .$type<Record<string, unknown>>()
      .default({}),
    sectionsSchema: jsonb("sections_schema")
      .$type<Record<string, unknown>[]>()
      .default([]),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("idx_templates_type_active").on(table.eventType, table.isActive),
  ],
);

export const events = pgTable(
  "events",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    templateId: uuid("template_id").references(() => templates.id),
    eventType: eventTypeEnum("event_type").notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    status: eventStatusEnum("status").default("draft").notNull(),
    eventDate: date("event_date"),
    eventTime: time("event_time"),
    timezone: varchar("timezone", { length: 50 }).default("America/La_Paz"),
    customConfig: jsonb("custom_config")
      .$type<Record<string, unknown>>()
      .default({}),
    publishedAt: timestamp("published_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    index("idx_events_user_id").on(table.userId),
    index("idx_events_type_status").on(table.eventType, table.status),
  ],
);

export const eventSections = pgTable(
  "event_sections",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    eventId: uuid("event_id")
      .notNull()
      .references(() => events.id, { onDelete: "cascade" }),
    sectionType: sectionTypeEnum("section_type").notNull(),
    order: integer("order").notNull().default(0),
    isActive: boolean("is_active").default(true).notNull(),
    config: jsonb("config").$type<Record<string, unknown>>().default({}),
    content: jsonb("content").$type<Record<string, unknown>>().default({}),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [index("idx_sections_event_order").on(table.eventId, table.order)],
);

export const eventMedia = pgTable(
  "event_media",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    eventId: uuid("event_id")
      .notNull()
      .references(() => events.id, { onDelete: "cascade" }),
    type: mediaTypeEnum("type").notNull(),
    url: text("url").notNull(),
    thumbnailUrl: text("thumbnail_url"),
    altText: varchar("alt_text", { length: 255 }),
    order: integer("order").default(0),
    sectionId: uuid("section_id").references(() => eventSections.id, {
      onDelete: "set null",
    }),
    metadata: jsonb("metadata").$type<Record<string, unknown>>().default({}),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [index("idx_media_event").on(table.eventId)],
);

export const rsvps = pgTable(
  "rsvps",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    eventId: uuid("event_id")
      .notNull()
      .references(() => events.id, { onDelete: "cascade" }),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }),
    attending: boolean("attending").notNull(),
    guestsCount: integer("guests_count").default(0),
    dietaryNotes: text("dietary_notes"),
    message: text("message"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [index("idx_rsvps_event").on(table.eventId)],
);

export const eventViews = pgTable(
  "event_views",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    eventId: uuid("event_id")
      .notNull()
      .references(() => events.id, { onDelete: "cascade" }),
    ipHash: varchar("ip_hash", { length: 64 }),
    userAgent: text("user_agent"),
    referrer: text("referrer"),
    deviceType: deviceTypeEnum("device_type"),
    viewedAt: timestamp("viewed_at").defaultNow().notNull(),
  },
  (table) => [index("idx_views_event_date").on(table.eventId, table.viewedAt)],
);
