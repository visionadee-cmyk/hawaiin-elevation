const sharp = require('sharp');
const path = require('path');

const inputPath = path.join(__dirname, '../public/logo/logo.jpeg');
const outputDir = path.join(__dirname, '../public/logo');

async function generateIcons() {
  try {
    // Generate 192x192 PNG
    await sharp(inputPath)
      .resize(192, 192, { fit: 'cover' })
      .png()
      .toFile(path.join(outputDir, 'icon-192.png'));
    console.log('Generated icon-192.png');

    // Generate 512x512 PNG
    await sharp(inputPath)
      .resize(512, 512, { fit: 'cover' })
      .png()
      .toFile(path.join(outputDir, 'icon-512.png'));
    console.log('Generated icon-512.png');

    console.log('Icons generated successfully!');
  } catch (error) {
    console.error('Error generating icons:', error);
  }
}

generateIcons();
