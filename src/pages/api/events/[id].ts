import type { APIRoute } from "astro";
import { db } from "../../../lib/db";
import { events, eventSections } from "../../../lib/db/schema";
import { updateEventSchema } from "../../../lib/validators/events";
import { eq, and, ne } from "drizzle-orm";

export const GET: APIRoute = async ({ locals, params }) => {
  if (!locals.user) {
    return new Response(JSON.stringify({ error: "No autorizado" }), {
      status: 401,
    });
  }

  try {
    const [event] = await db
      .select()
      .from(events)
      .where(and(eq(events.id, params.id!), eq(events.userId, locals.user.id)));

    if (!event) {
      return new Response(JSON.stringify({ error: "Evento no encontrado" }), {
        status: 404,
      });
    }

    // Fetch sections
    const sections = await db
      .select()
      .from(eventSections)
      .where(eq(eventSections.eventId, event.id))
      .orderBy(eventSections.order);

    return new Response(JSON.stringify({ ...event, sections }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching event:", error);
    return new Response(JSON.stringify({ error: "Error al obtener evento" }), {
      status: 500,
    });
  }
};

export const PATCH: APIRoute = async ({ locals, params, request }) => {
  if (!locals.user) {
    return new Response(JSON.stringify({ error: "No autorizado" }), {
      status: 401,
    });
  }

  try {
    const body = await request.json();
    const parsed = updateEventSchema.safeParse(body);

    if (!parsed.success) {
      return new Response(
        JSON.stringify({
          error: "Datos invalidos",
          details: parsed.error.flatten(),
        }),
        { status: 400 },
      );
    }

    // Validate slug uniqueness if changing
    if (parsed.data.slug) {
      const [existing] = await db
        .select({ id: events.id })
        .from(events)
        .where(
          and(eq(events.slug, parsed.data.slug), ne(events.id, params.id!)),
        );
      if (existing) {
        return new Response(
          JSON.stringify({ error: "Esa URL ya esta en uso" }),
          { status: 409 },
        );
      }
    }

    // Handle publishedAt when status changes
    const updateData: Record<string, any> = {
      ...parsed.data,
      updatedAt: new Date(),
    };
    if (parsed.data.status === "published") {
      updateData.publishedAt = new Date();
    } else if (
      parsed.data.status === "draft" ||
      parsed.data.status === "archived"
    ) {
      updateData.publishedAt = null;
    }

    const [updated] = await db
      .update(events)
      .set(updateData)
      .where(and(eq(events.id, params.id!), eq(events.userId, locals.user.id)))
      .returning();

    if (!updated) {
      return new Response(JSON.stringify({ error: "Evento no encontrado" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(updated), { status: 200 });
  } catch (error) {
    console.error("Error updating event:", error);
    return new Response(
      JSON.stringify({ error: "Error al actualizar evento" }),
      { status: 500 },
    );
  }
};

export const DELETE: APIRoute = async ({ locals, params }) => {
  if (!locals.user) {
    return new Response(JSON.stringify({ error: "No autorizado" }), {
      status: 401,
    });
  }

  try {
    const [deleted] = await db
      .delete(events)
      .where(and(eq(events.id, params.id!), eq(events.userId, locals.user.id)))
      .returning();

    if (!deleted) {
      return new Response(JSON.stringify({ error: "Evento no encontrado" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Error deleting event:", error);
    return new Response(JSON.stringify({ error: "Error al eliminar evento" }), {
      status: 500,
    });
  }
};
