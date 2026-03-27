import type { APIRoute } from "astro";
import { db } from "../../lib/db";
import { events, eventMedia } from "../../lib/db/schema";
import { uploadFile } from "../../lib/s3";
import { eq, and } from "drizzle-orm";
import sharp from "sharp";

const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_AUDIO_SIZE = 20 * 1024 * 1024; // 20MB

export const POST: APIRoute = async ({ locals, request }) => {
  if (!locals.user) {
    return new Response(JSON.stringify({ error: "No autorizado" }), {
      status: 401,
    });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const eventId = formData.get("eventId") as string | null;
    const type = formData.get("type") as string | null;

    if (!file || !eventId || !type) {
      return new Response(
        JSON.stringify({ error: "Faltan campos: file, eventId, type" }),
        { status: 400 },
      );
    }

    // Verify event ownership
    const [event] = await db
      .select()
      .from(events)
      .where(and(eq(events.id, eventId), eq(events.userId, locals.user.id)));

    if (!event) {
      return new Response(JSON.stringify({ error: "Evento no encontrado" }), {
        status: 404,
      });
    }

    // Validate file type
    const allowedImageTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
    ];
    const allowedAudioTypes = [
      "audio/mpeg",
      "audio/mp3",
      "audio/aac",
      "audio/wav",
      "audio/ogg",
    ];

    if (type === "image" && !allowedImageTypes.includes(file.type)) {
      return new Response(
        JSON.stringify({
          error: "Tipo de imagen no soportado. Usa JPG, PNG, WebP o GIF.",
        }),
        { status: 400 },
      );
    }
    if (type === "audio" && !allowedAudioTypes.includes(file.type)) {
      return new Response(
        JSON.stringify({
          error: "Tipo de audio no soportado. Usa MP3, AAC, WAV u OGG.",
        }),
        { status: 400 },
      );
    }

    // Validate file size
    const maxSize = type === "audio" ? MAX_AUDIO_SIZE : MAX_IMAGE_SIZE;
    if (file.size > maxSize) {
      return new Response(
        JSON.stringify({
          error: `Archivo demasiado grande. Maximo ${maxSize / 1024 / 1024}MB.`,
        }),
        { status: 400 },
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const timestamp = Date.now();
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");

    let uploadBuffer: Buffer;
    let contentType: string;
    let extension: string;
    let metadata: Record<string, unknown> = {
      originalName: file.name,
      originalSize: file.size,
    };

    if (type === "image") {
      // Process image with Sharp: resize + convert to WebP
      const image = sharp(buffer);
      const info = await image.metadata();

      metadata = {
        ...metadata,
        originalWidth: info.width,
        originalHeight: info.height,
        originalFormat: info.format,
      };

      uploadBuffer = await image
        .resize({ width: 1920, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toBuffer();

      contentType = "image/webp";
      extension = "webp";

      // Get processed dimensions
      const processedInfo = await sharp(uploadBuffer).metadata();
      metadata.processedWidth = processedInfo.width;
      metadata.processedHeight = processedInfo.height;
      metadata.processedSize = uploadBuffer.length;
    } else {
      // Audio: pass through
      uploadBuffer = buffer;
      contentType = file.type;
      extension = file.name.split(".").pop() || "mp3";
    }

    const key = `events/${eventId}/${type}/${timestamp}-${sanitizedName.split(".")[0]}.${extension}`;

    // Upload to R2
    const publicUrl = await uploadFile(key, uploadBuffer, contentType);

    // Save to database
    const [mediaRecord] = await db
      .insert(eventMedia)
      .values({
        eventId,
        type: type as "image" | "audio" | "video",
        url: publicUrl,
        altText: sanitizedName,
        metadata,
      })
      .returning();

    return new Response(
      JSON.stringify({
        id: mediaRecord.id,
        url: publicUrl,
        type: mediaRecord.type,
        metadata,
      }),
      { status: 201 },
    );
  } catch (error) {
    console.error("Upload error:", error);
    return new Response(JSON.stringify({ error: "Error al subir archivo" }), {
      status: 500,
    });
  }
};
