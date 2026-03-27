import type { APIRoute } from "astro";
import { db } from "../../../../lib/db";
import { events, eventSections } from "../../../../lib/db/schema";
import { updateSectionSchema } from "../../../../lib/validators/events";
import { eq, and } from "drizzle-orm";

export const PATCH: APIRoute = async ({ locals, params, request }) => {
  if (!locals.user) {
    return new Response(JSON.stringify({ error: "No autorizado" }), {
      status: 401,
    });
  }

  try {
    // Verify event ownership
    const [event] = await db
      .select()
      .from(events)
      .where(and(eq(events.id, params.id!), eq(events.userId, locals.user.id)));

    if (!event) {
      return new Response(JSON.stringify({ error: "Evento no encontrado" }), {
        status: 404,
      });
    }

    const body = await request.json();

    // Expect array of section updates: [{ id, isActive, order, config, content }]
    if (!Array.isArray(body)) {
      return new Response(
        JSON.stringify({ error: "Se espera un array de secciones" }),
        { status: 400 },
      );
    }

    const results = [];
    for (const sectionUpdate of body) {
      const { id: sectionId, ...data } = sectionUpdate;
      const parsed = updateSectionSchema.safeParse(data);

      if (!parsed.success) continue;

      const [updated] = await db
        .update(eventSections)
        .set({ ...parsed.data, updatedAt: new Date() })
        .where(
          and(
            eq(eventSections.id, sectionId),
            eq(eventSections.eventId, params.id!),
          ),
        )
        .returning();

      if (updated) results.push(updated);
    }

    return new Response(JSON.stringify(results), { status: 200 });
  } catch (error) {
    console.error("Error updating sections:", error);
    return new Response(
      JSON.stringify({ error: "Error al actualizar secciones" }),
      { status: 500 },
    );
  }
};
