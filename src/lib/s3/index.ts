import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  region: process.env.AWS_REGION || "auto",
  endpoint: process.env.S3_ENDPOINT,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
  forcePathStyle: true, // Required for R2 compatibility
});

const BUCKET_NAME = process.env.S3_BUCKET_NAME || "";
const PUBLIC_URL = process.env.S3_PUBLIC_URL || "";

/**
 * Get the public URL for a file.
 * Uses custom domain (media.libbagroup.com) if configured.
 */
export function getPublicUrl(key: string): string {
  if (PUBLIC_URL) {
    return `${PUBLIC_URL}/${key}`;
  }
  return `${process.env.S3_ENDPOINT}/${BUCKET_NAME}/${key}`;
}

/**
 * Upload a file directly to R2/S3.
 */
export async function uploadFile(
  key: string,
  body: Buffer | Uint8Array,
  contentType: string,
) {
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    Body: body,
    ContentType: contentType,
  });

  await s3Client.send(command);
  return getPublicUrl(key);
}

/**
 * Get a presigned URL for client-side uploads.
 * The frontend uploads directly to R2 without going through our server.
 */
export async function getSignedUploadUrl(
  key: string,
  contentType: string,
  expiresIn = 3600,
) {
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    ContentType: contentType,
  });

  return getSignedUrl(s3Client, command, { expiresIn });
}

/**
 * Get a presigned URL for private file downloads.
 */
export async function getSignedDownloadUrl(key: string, expiresIn = 3600) {
  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  });

  return getSignedUrl(s3Client, command, { expiresIn });
}

/**
 * Delete a file from R2/S3.
 */
export async function deleteFile(key: string) {
  const command = new DeleteObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  });

  await s3Client.send(command);
}

export { s3Client, BUCKET_NAME };
