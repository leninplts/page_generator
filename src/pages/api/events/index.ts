import type { APIRoute } from "astro";
import { db } from "../../../lib/db";
import {
  events,
  eventSections,
  templates,
  sectionTypeEnum,
} from "../../../lib/db/schema";
import { createEventSchema } from "../../../lib/validators/events";
import { generateUniqueSlug } from "../../../lib/utils";
import { eq, desc } from "drizzle-orm";
import { EVENT_TYPES } from "../../../lib/constants/event-types";

export const GET: APIRoute = async ({ locals }) => {
  if (!locals.user) {
    return new Response(JSON.stringify({ error: "No autorizado" }), {
      status: 401,
    });
  }

  try {
    const userEvents = await db
      .select()
      .from(events)
      .where(eq(events.userId, locals.user.id))
      .orderBy(desc(events.createdAt));

    return new Response(JSON.stringify(userEvents), { status: 200 });
  } catch (error) {
    console.error("Error fetching events:", error);
    return new Response(JSON.stringify({ error: "Error al obtener eventos" }), {
      status: 500,
    });
  }
};

export const POST: APIRoute = async ({ locals, request }) => {
  if (!locals.user) {
    return new Response(JSON.stringify({ error: "No autorizado" }), {
      status: 401,
    });
  }

  try {
    const body = await request.json();
    const parsed = createEventSchema.safeParse(body);

    if (!parsed.success) {
      return new Response(
        JSON.stringify({
          error: "Datos invalidos",
          details: parsed.error.flatten(),
        }),
        { status: 400 },
      );
    }

    const { eventType, title, eventDate, eventTime, timezone, templateId } =
      parsed.data;
    const slug = generateUniqueSlug(title);

    // If a template is selected, fetch it for defaultConfig and sectionsSchema
    let templateConfig: Record<string, unknown> = {};
    let templateSections: Record<string, unknown>[] | null = null;

    if (templateId) {
      const [template] = await db
        .select()
        .from(templates)
        .where(eq(templates.id, templateId))
        .limit(1);

      if (template) {
        templateConfig =
          (template.defaultConfig as Record<string, unknown>) ?? {};
        const sections = template.sectionsSchema as Record<string, unknown>[];
        if (sections && sections.length > 0) {
          templateSections = sections;
        }
      }
    }

    // Create the event
    const [newEvent] = await db
      .insert(events)
      .values({
        userId: locals.user.id,
        eventType,
        title,
        slug,
        status: "draft",
        eventDate: eventDate || null,
        eventTime: eventTime || null,
        timezone,
        templateId: templateId || null,
        customConfig:
          Object.keys(templateConfig).length > 0 ? templateConfig : {},
      })
      .returning();

    // Create sections: use template's sectionsSchema if available, else default
    const eventTypeConfig = EVENT_TYPES[eventType];
    let sectionsToInsert: {
      eventId: string;
      sectionType: (typeof sectionTypeEnum.enumValues)[number];
      order: number;
      isActive: boolean;
      config: Record<string, unknown>;
      content: Record<string, unknown>;
    }[];

    if (templateSections) {
      sectionsToInsert = templateSections.map((section, index) => ({
        eventId: newEvent.id,
        sectionType:
          section.sectionType as string as (typeof sectionTypeEnum.enumValues)[number],
        order: index,
        isActive: section.isActive !== false,
        config: (section.config as Record<string, unknown>) ?? {},
        content: (section.content as Record<string, unknown>) ?? {},
      }));
    } else {
      const allSections = [
        ...eventTypeConfig.requiredSections,
        ...eventTypeConfig.optionalSections,
      ];

      sectionsToInsert = allSections.map((sectionType, index) => ({
        eventId: newEvent.id,
        sectionType: sectionType as (typeof sectionTypeEnum.enumValues)[number],
        order: index,
        isActive: eventTypeConfig.requiredSections.includes(sectionType),
        config: {},
        content: {},
      }));
    }

    if (sectionsToInsert.length > 0) {
      await db.insert(eventSections).values(sectionsToInsert);
    }

    return new Response(JSON.stringify(newEvent), { status: 201 });
  } catch (error) {
    console.error("Error creating event:", error);
    return new Response(JSON.stringify({ error: "Error al crear evento" }), {
      status: 500,
    });
  }
};
