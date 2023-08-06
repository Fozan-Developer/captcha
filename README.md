<h1 align="center">🛂 Captcha</h1>

<div align="center">

[![npm package](https://img.shields.io/npm/v/@mr_fozan/utils.js?logo=npm&style=flat-square)](https://www.npmjs.org/package/@mr_fozan/utils.js)

**Captcha is a [Node.js](https://npmjs.com) module that will allow you to create a captcha session**

</div>

## 📦 Install

**NPM**
```sh
npm instal @mr_fozan/captcha
```
**YARN**

```sh
$ yarn add @mr_fozan/captcha
```

## 🚀 Usage

```js
const captcha = require('@mr_fozan/captcha');
```

## 📖  Documentation

## Creating a captcha

```js
const captcha = require('@mr_fozan/captcha');
const cpt = new captcha({ variations: 3 });

const generate = cpt.generate();
console.log(generate);
```

**The request will return the following data**
* id - captcha id
* answer - correct captcha answer
* variations - list of answer options (one of them is correct)

## Checking captcha input

```js
const captcha = require('@mr_fozan/captcha');
const cpt = new captcha({ variations: 3 });

var captchaId = 001;
var userInput = "🍫";

const verify = cpt.verify(captchaId, userInput);
console.log(verify);
```

**The data that is needed in the argument**
* id - captcha id
* answer - user response

**The request will return the following data**
* response - Boolean (If the captcha is correct, then true, if not, then false)

## 👥 Contributors

<p align="center">
  <a href="https://github.com/Fozan-Developer/utils.js/graphs/contributors">
    <img src="https://contrib.rocks/image?repo=Fozan-Developer/utils.js" />
  </a>
</p>

## License

**The MIT License (MIT)**
