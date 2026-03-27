import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { templates } from "./schema";
import { ALL_TEMPLATES } from "../templates";

async function seed() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error("DATABASE_URL not set");
    process.exit(1);
  }

  const client = postgres(connectionString);
  const db = drizzle(client);

  console.log("Seeding templates...");

  for (const template of ALL_TEMPLATES) {
    try {
      await db
        .insert(templates)
        .values({
          name: template.name,
          slug: template.slug,
          eventType: template.eventType,
          category: template.category,
          previewImage: template.previewImage,
          defaultConfig: template.defaultConfig,
          sectionsSchema: template.sectionsOrder.map((sectionType, index) => ({
            sectionType,
            order: index,
            isActive: true,
          })),
          isActive: true,
        })
        .onConflictDoUpdate({
          target: templates.slug,
          set: {
            name: template.name,
            category: template.category,
            defaultConfig: {
              ...template.defaultConfig,
              variant: template.variant,
            },
            sectionsSchema: template.sectionsOrder.map(
              (sectionType, index) => ({
                sectionType,
                order: index,
                isActive: true,
              }),
            ),
          },
        });
      console.log(`  ✓ ${template.name} (${template.slug})`);
    } catch (error) {
      console.error(`  ✗ ${template.name}:`, error);
    }
  }

  console.log("Done!");
  await client.end();
}

seed().catch(console.error);
