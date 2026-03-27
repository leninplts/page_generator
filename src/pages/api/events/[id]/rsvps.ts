import type { APIRoute } from "astro";
import { db } from "../../../../lib/db";
import { events, rsvps } from "../../../../lib/db/schema";
import { eq, and, desc } from "drizzle-orm";

export const GET: APIRoute = async ({ locals, params }) => {
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

    // Fetch RSVPs
    const eventRsvps = await db
      .select()
      .from(rsvps)
      .where(eq(rsvps.eventId, params.id!))
      .orderBy(desc(rsvps.createdAt));

    const stats = {
      total: eventRsvps.length,
      attending: eventRsvps.filter((r) => r.attending).length,
      notAttending: eventRsvps.filter((r) => !r.attending).length,
      totalGuests: eventRsvps
        .filter((r) => r.attending)
        .reduce((sum, r) => sum + (r.guestsCount || 0), 0),
    };

    return new Response(JSON.stringify({ rsvps: eventRsvps, stats }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching RSVPs:", error);
    return new Response(
      JSON.stringify({ error: "Error al obtener confirmaciones" }),
      { status: 500 },
    );
  }
};
