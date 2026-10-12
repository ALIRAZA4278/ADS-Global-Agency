/**
 * Turns the raw portfolio exports in assets/portfolio-source/ into
 * web-ready images and the manifest the gallery reads.
 *
 *   node scripts/optimize-portfolio.mjs
 *
 * Each source becomes one WebP in public/portfolio/<category>/, capped at
 * MAX_EDGE px on its long side (next/image resizes further per device), plus
 * a tiny blurred preview inlined into src/lib/portfolio-gallery.json so tiles
 * show a colour wash instead of an empty box while they load.
 *
 * To add work: drop the file into the matching source folder (or a new one
 * listed in CATEGORIES), optionally give it a title below, and re-run.
 */
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SOURCE_DIR = "assets/portfolio-source";
const OUTPUT_DIR = "public/portfolio";
const MANIFEST = "src/lib/portfolio-gallery.json";
const MAX_EDGE = 1600;
const QUALITY = 78;

// Source folder → category shown in the gallery tabs.
const CATEGORIES = [
  { folder: "LOGO", slug: "logos", label: "Logo Design" },
  { folder: "Social media", slug: "social", label: "Social Media" },
  { folder: "Business card", slug: "cards", label: "Business Cards" },
];

// Client names, where the work makes them unambiguous. Used for alt text and
// the lightbox caption; untitled pieces fall back to the category label.
const TITLES = {
  "06779eb1-2238-4f88-b04e-02ea5d901d1e.jpeg": "Witko Tile",
  "5fd8f129-ce80-48cb-b202-047ae8987e1f.jpeg": "For The Chosen",
  "73F08F7D-C92E-4C95-87F9-C3A614469FF0.jpeg": "01 Studio",
  "9c33c73b-4509-4711-a7e4-34a5237534af.jpeg": "Dipstick",
  "Fowler logo.jpeg": "Fowler Plumbing & Gas",
  "IMG_4288.jpeg": "Minica",
  "IMG_4304.jpeg": "Mummy Noodle",
  "IMG_4319.jpeg": "The Scar Bookings",
  "IMG_4332.jpeg": "Animal Foster Carers Registry",
  "IMG_4731.png": "Herbleen",
  "a7aa547d-da64-4b5e-b179-e0ab2f6b828f.jpeg": "Chunkology",
  "b9365e7c-fa4c-4d31-9242-82acb6f2c9ec.jpeg": "Wexanite",
  "c7e97abe-46b8-4b63-8cd8-800f5d8a4835.jpeg": "The Nanoplasty Specialist",
  "ef6e5776-fa9b-489e-b906-bb6f96679308.jpeg": "Nuvarah",
  "478b5048-2352-4c4c-9339-76084351e083.jpeg": "My Good Celebrant",
  "94ab7258-2a79-4ddb-975f-b5358da7f1fb.jpeg": "Cemar",
  "IMG_4636.jpeg": "Webified Labs",
  "IMG_5031.jpeg": "Timezone",
  "IMG_5034.jpeg": "Technotics",
  "IMG_5037.jpeg": "Timezone",
  "IMG_5039.jpeg": "Curbside Repairs",
  "IMG_5040.jpeg": "AL Accountants",
  "d1b9debc-c647-4337-8f67-a083c713d599.jpeg": "Cemar",
};

const IMAGE = /\.(jpe?g|png|webp)$/i;

async function main() {
  await fs.rm(OUTPUT_DIR, { recursive: true, force: true });

  const byCategory = [];
  let inBytes = 0;
  let outBytes = 0;

  for (const category of CATEGORIES) {
    const dir = path.join(SOURCE_DIR, category.folder);
    const files = (await fs.readdir(dir)).filter((f) => IMAGE.test(f)).sort();
    await fs.mkdir(path.join(OUTPUT_DIR, category.slug), { recursive: true });

    const items = [];
    for (const [index, file] of files.entries()) {
      const source = path.join(dir, file);
      const name = `${category.slug}-${String(index + 1).padStart(2, "0")}.webp`;
      const target = path.join(OUTPUT_DIR, category.slug, name);

      // .rotate() applies any EXIF orientation before the metadata is dropped.
      const { width, height, size } = await sharp(source)
        .rotate()
        .resize(MAX_EDGE, MAX_EDGE, { fit: "inside", withoutEnlargement: true })
        .webp({ quality: QUALITY, effort: 6 })
        .toFile(target);

      const blur = await sharp(source)
        .rotate()
        .resize(12, 12, { fit: "inside" })
        .webp({ quality: 40 })
        .toBuffer();

      // The edge colour fills the frame around pieces shorter than it, so a
      // logo on white sits on white rather than in a dark letterbox. Sampled
      // from a 1px border strip, not the whole image, so the artwork itself
      // doesn't tint it.
      const { data } = await sharp(source)
        .rotate()
        .resize(32, 32, { fit: "fill" })
        .removeAlpha()
        .raw()
        .toBuffer({ resolveWithObject: true });
      const edge = [0, 0, 0];
      let samples = 0;
      for (let y = 0; y < 32; y++) {
        for (let x = 0; x < 32; x++) {
          if (x !== 0 && y !== 0 && x !== 31 && y !== 31) continue;
          const offset = (y * 32 + x) * 3;
          for (let c = 0; c < 3; c++) edge[c] += data[offset + c];
          samples++;
        }
      }
      const background = `#${edge
        .map((sum) => Math.round(sum / samples).toString(16).padStart(2, "0"))
        .join("")}`;

      inBytes += (await fs.stat(source)).size;
      outBytes += size;

      items.push({
        src: `/portfolio/${category.slug}/${name}`,
        width,
        height,
        category: category.slug,
        title: TITLES[file] ?? null,
        background,
        blurDataURL: `data:image/webp;base64,${blur.toString("base64")}`,
      });
    }
    byCategory.push(items);
  }

  // Interleave the categories so the "All" view opens on a mix of work
  // rather than a wall of logos.
  const ordered = [];
  for (let i = 0; byCategory.some((list) => i < list.length); i++) {
    for (const list of byCategory) if (list[i]) ordered.push(list[i]);
  }

  const manifest = {
    categories: CATEGORIES.map(({ slug, label }) => ({ slug, label })),
    items: ordered,
  };
  await fs.writeFile(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`);

  const mb = (bytes) => (bytes / 1024 / 1024).toFixed(1);
  console.log(
    `${ordered.length} images: ${mb(inBytes)}MB → ${mb(outBytes)}MB (manifest: ${MANIFEST})`
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
