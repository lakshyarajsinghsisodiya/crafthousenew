import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const publicDir = path.resolve("public");
const targets = [
  path.join(publicDir, "logo.png"),
  path.join(publicDir, "media", "photos"),
];

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (![".png", ".jpg", ".jpeg"].includes(ext)) return;

  const before = (await fs.stat(filePath)).size;
  const image = sharp(filePath).rotate();

  if (ext === ".png") {
    await image
      .png({ quality: 80, compressionLevel: 9, palette: true })
      .toFile(`${filePath}.opt`);
  } else {
    await image
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(`${filePath}.opt`);
  }

  const after = (await fs.stat(`${filePath}.opt`)).size;
  if (after < before) {
    await fs.rename(`${filePath}.opt`, filePath);
    console.log(
      `${path.relative(publicDir, filePath)}: ${(before / 1024 / 1024).toFixed(2)}MB -> ${(after / 1024 / 1024).toFixed(2)}MB`,
    );
  } else {
    await fs.unlink(`${filePath}.opt`);
    console.log(`${path.relative(publicDir, filePath)}: kept original`);
  }
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(fullPath);
    else await optimizeImage(fullPath);
  }
}

for (const target of targets) {
  const stat = await fs.stat(target);
  if (stat.isDirectory()) await walk(target);
  else await optimizeImage(target);
}

console.log("Media optimization complete.");
