import type { APIRoute } from "astro";
import { db } from "../../../lib/db";
import { templates } from "../../../lib/db/schema";
import { eq, and } from "drizzle-orm";

export const GET: APIRoute = async ({ url }) => {
  try {
    const eventType = url.searchParams.get("eventType");

    let results;

    if (eventType) {
      results = await db
        .select()
        .from(templates)
        .where(
          and(
            eq(templates.isActive, true),
            eq(templates.eventType, eventType as any),
          ),
        );
    } else {
      results = await db
        .select()
        .from(templates)
        .where(eq(templates.isActive, true));
    }

    return new Response(JSON.stringify(results), { status: 200 });
  } catch (error) {
    console.error("Error fetching templates:", error);
    return new Response(
      JSON.stringify({ error: "Error al obtener templates" }),
      { status: 500 },
    );
  }
};
