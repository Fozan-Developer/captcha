const crypto = require('crypto');

/**
 * Get a random element from an array.
 * @param {Array} array - The array to select an element from.
 * @returns {*} - A random element from the array.
 */
function getRandomElement(array) {
  if (array.length === 0) {
    throw new Error('Array must not be empty.');
  }
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

/**
 * Shuffle an array in place using the Fisher-Yates algorithm.
 * @param {Array} array - The array to shuffle.
 * @returns {Array} - The shuffled array.
 */
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/**
 * Generate a random hexadecimal ID.
 * @returns {string} - A randomly generated ID in hexadecimal format.
 */
function generateRandomId() {
  return crypto.randomBytes(16).toString('hex');
}

module.exports = {
  getRandomElement,
  shuffleArray,
  generateRandomId
};
