import type { RankItem } from "../types/RankTypes";
import { imageVariant } from "./imageVariant";

/** How many cover thumbnails to warm up: roughly the first screenful of cards */
const PREFETCH_COVERS = 6;

const backgrounds = new WeakMap<RankItem[], string[]>();
const prefetched = new Set<string>();

/**
 * Up to 4 random sample images for a list's header backdrop. Picked once per
 * list per page load, so they can be prefetched before the list is shown and
 * stay the same when switching back to a year.
 */
export function backgroundImagesFor(items: RankItem[]): string[] {
  let picked = backgrounds.get(items);
  if (!picked) {
    const images = items.flatMap((rankItem) => rankItem.sample_images ?? []);
    // Fisher–Yates shuffle
    for (let i = images.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [images[i], images[j]] = [images[j], images[i]];
    }
    picked = images.slice(0, 4).map((src) => imageVariant(src, "md"));
    backgrounds.set(items, picked);
  }
  return picked;
}

/**
 * Start downloading the images a list shows above the fold (header backdrop
 * and the first few covers), so a year switch doesn't snapshot empty images.
 */
export function prefetchListImages(items: RankItem[]) {
  const covers = [...items]
    .sort((a, b) => b.rank - a.rank)
    .slice(0, PREFETCH_COVERS)
    .map((rankItem) => imageVariant(rankItem.cover_image, "sm"));

  for (const src of [...backgroundImagesFor(items), ...covers]) {
    if (prefetched.has(src)) continue;
    prefetched.add(src);
    const img = new Image();
    img.decoding = "async";
    img.src = src;
  }
}
