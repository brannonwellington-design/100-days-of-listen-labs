import fs from "node:fs/promises";
import path from "node:path";
import { CATEGORIES } from "./categories";

export type ImageManifest = Record<string, string[]>; // categoryKey -> list of /images/... paths

export async function getImageManifest(): Promise<ImageManifest> {
  const imagesDir = path.join(process.cwd(), "public", "images");
  const manifest: ImageManifest = {};

  for (const cat of CATEGORIES) {
    if (!cat.folder) continue;
    const dir = path.join(imagesDir, cat.folder);
    try {
      const files = await fs.readdir(dir);
      const imgs = files
        .filter((f) => /\.(png|jpg|jpeg|webp)$/i.test(f))
        .sort()
        .map((f) => `/images/${cat.folder}/${encodeURIComponent(f)}`);
      manifest[cat.key] = imgs;
    } catch {
      manifest[cat.key] = [];
    }
  }

  // "all" is a flat combination
  manifest["all"] = Object.values(manifest).flat();
  return manifest;
}
