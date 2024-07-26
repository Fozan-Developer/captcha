const { createCanvas, registerFont } = require('canvas');
const fs = require('fs');
const path = require('path');

// Path to the Noto Color Emoji font
const fontPath = path.join(__dirname, 'NotoColorEmoji.ttf');

// Ensure the font is registered
if (fs.existsSync(fontPath)) {
  try {
    registerFont(fontPath, { family: 'Noto Color Emoji' });
  } catch (error) {
    console.error('Error registering font:', error);
  }
} else {
  console.error('Font not found at path:', fontPath);
}

// Path to the images directory
const imagesPath = path.join(__dirname, 'images');

// Create the images directory if it doesn't exist
if (!fs.existsSync(imagesPath)) {
  fs.mkdirSync(imagesPath);
}

/**
 * Generate a captcha image with a given emoji.
 * @param {string} smiley - The emoji to be used in the captcha.
 * @returns {string} - The path to the generated image file.
 */
function generateCaptchaImage(smiley) {
  const canvas = createCanvas(1600, 900);
  const ctx = canvas.getContext('2d');

  // Set the background color to white
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Set font and text properties
  ctx.fillStyle = 'beige'; // Change this to 'black' or another color if needed
  ctx.font = '500px "Noto Color Emoji"'; // Use the registered emoji font
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Draw the emoji in the center of the canvas
  ctx.fillText(smiley, canvas.width / 2, canvas.height / 2);

  // Convert the canvas to a PNG buffer
  const buffer = canvas.toBuffer('image/png');
  const imagePath = path.join(imagesPath, `${Date.now()}.png`);
  
  // Save the image to the file system
  fs.writeFileSync(imagePath, buffer);

  return imagePath;
}

module.exports = {
  generateCaptchaImage
};
