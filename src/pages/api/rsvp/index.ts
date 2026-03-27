import type { APIRoute } from "astro";
import { db } from "../../../lib/db";
import { events, rsvps } from "../../../lib/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

const rsvpSchema = z.object({
  eventId: z.string().uuid(),
  name: z.string().min(2, "El nombre es requerido").max(255),
  email: z.string().email().optional().nullable(),
  attending: z.boolean(),
  guestsCount: z.number().int().min(0).max(10).default(0),
  dietaryNotes: z.string().max(500).optional().nullable(),
  message: z.string().max(1000).optional().nullable(),
});

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const parsed = rsvpSchema.safeParse(body);

    if (!parsed.success) {
      return new Response(
        JSON.stringify({
          error: "Datos invalidos",
          details: parsed.error.flatten(),
        }),
        { status: 400 },
      );
    }

    // Verify event exists and is published
    const [event] = await db
      .select()
      .from(events)
      .where(eq(events.id, parsed.data.eventId));

    if (!event || event.status !== "published") {
      return new Response(JSON.stringify({ error: "Evento no encontrado" }), {
        status: 404,
      });
    }

    // Insert RSVP
    const [rsvp] = await db
      .insert(rsvps)
      .values({
        eventId: parsed.data.eventId,
        name: parsed.data.name,
        email: parsed.data.email || null,
        attending: parsed.data.attending,
        guestsCount: parsed.data.guestsCount,
        dietaryNotes: parsed.data.dietaryNotes || null,
        message: parsed.data.message || null,
      })
      .returning();

    return new Response(JSON.stringify({ success: true, rsvp }), {
      status: 201,
    });
  } catch (error) {
    console.error("RSVP error:", error);
    return new Response(
      JSON.stringify({ error: "Error al guardar confirmacion" }),
      { status: 500 },
    );
  }
};
