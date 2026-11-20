/**
 * Generate resized WebP variants of the item images in public/images/items/.
 *
 *   bun run images
 *
 * Runs automatically before `dev` and `build`. Output goes to
 * public/images/generated/<size>/<name>.webp (gitignored) and is only
 * regenerated when the source image is newer. Use `imageVariant()` from
 * src/utils/imageVariant.ts to reference a variant; remote images are left
 * untouched.
 */
import { existsSync, mkdirSync, readdirSync, rmSync, statSync } from "node:fs";
import { join, parse, resolve } from "node:path";
import sharp from "sharp";
import { IMAGE_SIZES } from "../src/utils/imageVariant";

const root = resolve(import.meta.dirname, "..");
const sourceDir = join(root, "public/images/items");
const outDir = join(root, "public/images/generated");
const SOURCE_EXT = /\.(jpe?g|png|webp)$/i;

const sources = readdirSync(sourceDir).filter((f) => SOURCE_EXT.test(f));
const expected = new Set(sources.map((f) => `${parse(f).name}.webp`));
let written = 0;

for (const [size, width] of Object.entries(IMAGE_SIZES)) {
  const dir = join(outDir, size);
  mkdirSync(dir, { recursive: true });

  await Promise.all(
    sources.map(async (file) => {
      const src = join(sourceDir, file);
      const dest = join(dir, `${parse(file).name}.webp`);
      if (existsSync(dest) && statSync(dest).mtimeMs >= statSync(src).mtimeMs) return;
      await sharp(src)
        .rotate()
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 78 })
        .toFile(dest);
      written++;
    }),
  );

  // Drop variants whose source image was removed or renamed
  for (const file of readdirSync(dir)) {
    if (!expected.has(file)) rmSync(join(dir, file));
  }
}

console.log(
  written > 0
    ? `images: wrote ${written} variant(s) to public/images/generated/`
    : "images: variants up to date",
);
