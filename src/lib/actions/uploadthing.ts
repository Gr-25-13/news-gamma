"use server";

import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

// UploadThing file URLs end in /f/<key> — the key is what deleteFiles needs.
function extractKeyFromUrl(url: string): string | null {
  try {
    const { pathname } = new URL(url);
    const segments = pathname.split("/").filter(Boolean);
    return segments[segments.length - 1] || null;
  } catch {
    return null;
  }
}

// Best-effort cleanup: never throw, so a failed delete never blocks the
// article save/delete flow that triggered it.
export async function deleteUploadedImage(url: string | null | undefined) {
  if (!url) return;
  const key = extractKeyFromUrl(url);
  if (!key) return;

  try {
    await utapi.deleteFiles(key);
  } catch (err) {
    console.error("[UploadThing] Failed to delete file:", err);
  }
}
