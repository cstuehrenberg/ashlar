const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const input = path.resolve(__dirname, '../public/assets/hero-src.jpg');
const outJpg = path.resolve(__dirname, '../public/assets/hero-1600.jpg');
const outWebp = path.resolve(__dirname, '../public/assets/hero-1600.webp');

if (!fs.existsSync(input)) {
  console.error('Input file does not exist:', input);
  process.exit(2);
}

(async () => {
  try {
    await sharp(input).resize({ width: 1600 }).jpeg({ quality: 80 }).toFile(outJpg);
    console.log('Wrote', outJpg);
    await sharp(input).resize({ width: 1600 }).webp({ quality: 80 }).toFile(outWebp);
    console.log('Wrote', outWebp);
    process.exit(0);
  } catch (err) {
    console.error('Image optimization failed:', err);
    process.exit(1);
  }
})();
