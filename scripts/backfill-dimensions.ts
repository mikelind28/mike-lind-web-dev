// scripts/backfill-dimensions.ts
import { imageSize } from "image-size";
import { sql } from "@/lib/db";

function publicImageUrl(objectKey: string) {
  return `${process.env.AWS_ENDPOINT_URL_S3}/${process.env.AWS_BUCKET_NAME}/${objectKey}`;
}

async function backfillDimensions() {
  const rows = await sql`
    SELECT id, object_key
    FROM project_images
    WHERE width IS NULL OR height IS NULL
  `;

  for (const row of rows) {
    try {
      const res = await fetch(publicImageUrl(row.object_key));
      const buffer = Buffer.from(await res.arrayBuffer());
      const { width, height } = imageSize(buffer);

      await sql`
        UPDATE project_images
        SET width = ${width}, height = ${height}
        WHERE id = ${row.id}
      `;

      console.log(`✓ ${row.object_key}: ${width}x${height}`);
    } catch (err) {
      console.error(`✗ failed on ${row.object_key}:`, err);
    }
  }
}

backfillDimensions();
