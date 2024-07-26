# 🛂 Captcha

[![npm package](https://img.shields.io/npm/v/@mr_fozan/captcha?logo=npm&style=flat-square)](https://www.npmjs.org/package/@mr_fozan/captcha)

**Captcha** is a Node.js module that allows you to create and manage captcha sessions efficiently.

## 🚀 Quick Start

Here's a quick example of how to get started with the Captcha library:

![CodeSnap](https://github.com/Fozan-Developer/captcha/blob/main/assets/codeSnap.png)

```js
const Captcha = require('@mr_fozan/captcha');

// Create a new captcha instance with the desired number of variations
const captcha = new Captcha({ variations: 3 });

// Generate a new captcha
captcha.generate().then(result => {
  console.log('Generated Captcha:', result);

  // Example of verifying user input
  const isValid = captcha.verify(result.id, result.answer);
  console.log('Captcha verification result:', isValid);
}).catch(err => {
  console.error('Error generating captcha:', err);
});
```

### 📦 Installation

**Using NPM:**

```sh
npm install @mr_fozan/captcha
```

**Using Yarn:**

```sh
yarn add @mr_fozan/captcha
```

## 📖 Documentation

### Creating a Captcha

```js
const Captcha = require('@mr_fozan/captcha');

// Create a new captcha instance with the desired number of variations
const captcha = new Captcha({ variations: 3 });

// Generate a new captcha
const result = await captcha.generate();
console.log(result);
```

**Response Structure:**

- `id`: Unique identifier for the captcha
- `answer`: The correct answer for the captcha
- `variations`: Array of answer options, including the correct one

### Verifying Captcha Input

```js
const Captcha = require('@mr_fozan/captcha');

// Create a new captcha instance
const captcha = new Captcha({ variations: 3 });

// The captcha ID and user input to verify
const captchaId = '001'; // Use the actual ID from the generated captcha
const userInput = '🍫';  // User's input for verification

// Verify the user's input
const result = captcha.verify(captchaId, userInput);
console.log(result);
```

**Verification Parameters:**

- `id`: Unique identifier for the captcha
- `userInput`: The response provided by the user

**Verification Response:**

- `response`: Boolean indicating whether the captcha is correct (`true` or `false`)

## 👥 Contributors

[![Contributors](https://contrib.rocks/image?repo=Fozan-Developer/captcha)](https://github.com/Fozan-Developer/captcha/graphs/contributors)

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
