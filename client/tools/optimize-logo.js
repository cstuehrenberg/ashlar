const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const src = path.resolve(__dirname, '../public/assets/logo.png');
const outPng = path.resolve(__dirname, '../public/assets/logo-256.png');
const outWebp = path.resolve(__dirname, '../public/assets/logo-256.webp');

if (!fs.existsSync(src)) {
  console.error('Source logo not found:', src);
  process.exit(2);
}

(async () => {
  try {
    await sharp(src).resize({ width: 256 }).png({ quality: 90 }).toFile(outPng);
    console.log('Wrote', outPng);
    await sharp(src).resize({ width: 256 }).webp({ quality: 80 }).toFile(outWebp);
    console.log('Wrote', outWebp);
    process.exit(0);
  } catch (err) {
    console.error('Optimization failed:', err);
    process.exit(1);
  }
})();
