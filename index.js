const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const smiles = require('./smiles.js');

class Captcha {
  constructor(argument) {
    this.captchas = {};
    this.smileys = smiles;
    // this.rowCount = 2;
    // this.columnCount = 3;
    this.variations = argument.variations != undefined ? argument.variations : 3;
    this.captchaFile = path.join(__dirname, './captchas.json');
    this.loadCaptchasFromFile();

    if(typeof this.variations != "number") throw Error("The variation field must be a number");
    if(this.variations < 3) throw Error("There can be no less than 3 variations");
    if(this.variations > 9) throw Error("There can be no more than 9 variations");
  }

  generate() {
    const captchaSmiley = this.getRandomSmiley();
    const captchaOptions = this.generateRandomOptions(captchaSmiley);
    const captchaId = this.generateRandomId();

    this.captchas[captchaId] = captchaSmiley;
    this.saveCaptchasToFile();

    return {
      id: captchaId,
      answer: captchaSmiley,
      variations: captchaOptions
    };
  }

  verify(id, userInput) {
    const captchaSmiley = this.captchas[id];

    if (!captchaSmiley) {
      return {
          response: true
        };
    }

    if (userInput === captchaSmiley) {
      delete this.captchas[id];
      this.saveCaptchasToFile();
      return {
        response: true
      };
    }

    return {
        response: false
      };
  }

  getRandomSmiley() {
    const randomIndex = Math.floor(Math.random() * this.smileys.length);
    return this.smileys[randomIndex];
  }

  generateRandomOptions(correctAnswer) {
    const options = [correctAnswer];
    const usedIndexes = [this.smileys.indexOf(correctAnswer)];

    while (options.length < this.variations) {
      const randomIndex = Math.floor(Math.random() * this.smileys.length);

      if (!usedIndexes.includes(randomIndex)) {
        options.push(this.smileys[randomIndex]);
        usedIndexes.push(randomIndex);
      }
    }

    return this.shuffleArray(options);
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  generateRandomId() {
    return crypto.randomBytes(16).toString('hex');
  }

  saveCaptchasToFile() {
    fs.writeFileSync(this.captchaFile, JSON.stringify(this.captchas, null, 2));
  }

  loadCaptchasFromFile() {
    try {
      const data = fs.readFileSync(this.captchaFile, 'utf8');
      this.captchas = JSON.parse(data);
    } catch (error) {
      console.error('Error loading captchas from file:', error);
    }
  }
}

module.exports = Captcha;