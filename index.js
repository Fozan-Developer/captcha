const smiles = require('./src/smiles.js');
const { getRandomElement, shuffleArray, generateRandomId } = require('./src/utils.js');
const FileManager = require('./src/fileManager.js');
const { generateCaptchaImage } = require('./src/imageGenerator.js');

/**
 * Captcha class to handle captcha generation and verification.
 */
class Captcha {
  /**
   * @param {Object} options - Configuration options.
   * @param {number} options.variations - Number of variations for the captcha options.
   */
  constructor({ variations = 3 }) {
    this.captchas = {};
    this.smileys = smiles;
    this.variations = variations;
    this.fileManager = new FileManager('./captchas.json');
    this.loadCaptchasFromFile();

    if (typeof this.variations !== "number") {
      throw new Error("The variation field must be a number");
    }
    if (this.variations < 3) {
      throw new Error("There must be at least 3 variations");
    }
    if (this.variations > 9) {
      throw new Error("There can be no more than 9 variations");
    }
  }

  /**
   * Generate a new captcha and save it.
   * @returns {Object} - The generated captcha data including id, answer, variations, and imagePath.
   */
  async generate() {
    const captchaSmiley = getRandomElement(this.smileys);
    const captchaOptions = this.generateRandomOptions(captchaSmiley);
    const captchaId = generateRandomId();

    // Generate the captcha image and get its path
    const imagePath = generateCaptchaImage(captchaSmiley);

    this.captchas[captchaId] = captchaSmiley;
    this.saveCaptchasToFile();

    return {
      id: captchaId,
      answer: captchaSmiley,
      variations: captchaOptions,
      imagePath: imagePath
    };
  }

  /**
   * Verify the user's input against the stored captcha.
   * @param {string} id - The captcha id.
   * @param {string} userInput - The user's input to verify.
   * @returns {Object} - Verification result.
   */
  verify(id, userInput) {
    const captchaSmiley = this.captchas[id];

    if (!captchaSmiley) {
      return { response: true }; // The captcha ID is not found, so we assume it's correct.
    }

    if (userInput === captchaSmiley) {
      delete this.captchas[id];
      this.saveCaptchasToFile();
      return { response: true };
    }

    return { response: false };
  }

  /**
   * Generate random options for the captcha, including the correct answer.
   * @param {string} correctAnswer - The correct captcha answer.
   * @returns {Array<string>} - An array of shuffled options including the correct answer.
   */
  generateRandomOptions(correctAnswer) {
    const options = [correctAnswer];
    const usedIndexes = new Set([this.smileys.indexOf(correctAnswer)]);

    while (options.length < this.variations) {
      const randomIndex = Math.floor(Math.random() * this.smileys.length);

      if (!usedIndexes.has(randomIndex)) {
        options.push(this.smileys[randomIndex]);
        usedIndexes.add(randomIndex);
      }
    }

    return shuffleArray(options);
  }

  /**
   * Save the current captchas to a file.
   */
  saveCaptchasToFile() {
    this.fileManager.writeFile(this.captchas);
  }

  /**
   * Load captchas from a file.
   */
  loadCaptchasFromFile() {
    this.captchas = this.fileManager.readFile();
  }
}

module.exports = Captcha;
