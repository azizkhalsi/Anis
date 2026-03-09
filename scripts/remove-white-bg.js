/**
 * Removes white/near-white background from PNG images by making those pixels transparent.
 * Usage: node scripts/remove-white-bg.js
 */
import sharp from 'sharp';
import { readdirSync, existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const EXEMPLES_DIR = path.join(__dirname, '..', 'public', 'images', 'exemples');

// Consider pixel "white" if all RGB components are above this (0-255)
const WHITE_THRESHOLD = 248;

async function removeWhiteBackground(imagePath) {
  const image = sharp(imagePath);
  const { data, info } = await image.raw().ensureAlpha().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const pixels = new Uint8Array(data);

  for (let i = 0; i < pixels.length; i += channels) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    if (r >= WHITE_THRESHOLD && g >= WHITE_THRESHOLD && b >= WHITE_THRESHOLD) {
      pixels[i + 3] = 0;
    }
  }

  await sharp(Buffer.from(pixels), { raw: { width, height, channels } })
    .png()
    .toFile(imagePath);
  console.log('Processed:', path.basename(imagePath));
}

async function main() {
  if (!existsSync(EXEMPLES_DIR)) {
    console.error('Exemples dir not found:', EXEMPLES_DIR);
    process.exit(1);
  }
  const files = readdirSync(EXEMPLES_DIR).filter((f) => /^exemples-\d+\.png$/.test(f));
  for (const file of files) {
    await removeWhiteBackground(path.join(EXEMPLES_DIR, file));
  }
  console.log('Done. Processed', files.length, 'images.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
