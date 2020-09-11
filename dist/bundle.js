/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _randomness_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./randomness_util */ "./src/randomness_util.js");


class Game {
  constructor() {
    this.count = 0;
    this.cardId = 0;
    this.modalVal = 0;
    this.cardsPlayed = 0;
    
    this.renderModal = this.renderModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // options takes keys top, left, xVel, yVel, lifespan, startTime
  renderCard(options) {
    setTimeout(() => {
      const num = Object(_randomness_util__WEBPACK_IMPORTED_MODULE_0__["randomNum"])();
      this.count += this.hilo_val(num);
      const card = Object(_randomness_util__WEBPACK_IMPORTED_MODULE_0__["buildCard"])(num);
  
      card.style.top = `${options.top}px`;
      card.style.left = `${options.left}px`;
  
      document.getElementById("game-board").appendChild(card);
      let start;
  
      function step(timestamp) {
        if (start === undefined)
          start = timestamp;
        const elapsed = timestamp - start;
    
        card.style.transform =
          'translateX(' + (options.xVel * elapsed) + 'px) translateY(' + (options.yVel * elapsed) + 'px)'
  
    
        if (elapsed < options.lifespan) {
          window.requestAnimationFrame(step);
        } else {
          card.remove();
        }
      }
    
      card.onload = () => window.requestAnimationFrame(step);
    }, options.startTime);
  }

  renderModal() {
    const modal = document.getElementById("modal-screen");
    modal.classList.add("active");

    const guessEl = document.getElementById("modal-guess");
    const minus = document.getElementById("minus");
    const plus = document.getElementById("plus");
    const btn = document.getElementById("submit");


    minus.addEventListener("click", this.changeGuessVal(-1, guessEl));

    plus.addEventListener("click", this.changeGuessVal(1, guessEl));

    btn.addEventListener("click", this.handleSubmit);
  }

  changeGuessVal(delta, guessEl) {
    return () => {
      guessEl.innerText = parseInt(guessEl.innerHTML) + delta;
    }
  }

  handleSubmit(guess) {
    const guessEl = document.getElementById("modal-guess");
    const minus = document.getElementById("minus");
    const plus = document.getElementById("plus");
    const btn = document.getElementById("submit");

    
    minus.removeEventListener("click", this.changeGuessVal(-1, guessEl));
    plus.removeEventListener("click", this.changeGuessVal(1, guessEl));
    btn.removeEventListener("click", this.handleSubmit);

    const content = document.getElementById("modal-content-alt");
    if (this.count === parseInt(guessEl.innerText)) {
      content.innerHTML = "<p>Correct! The count resets after each level.</p>";
    } else {
      content.innerHTML = `<p>Incorrect. The count was ${this.count}.</p><button id="try-again">Try again</button>`;
      const tryAgain = document.getElementById("try-again");
      tryAgain.addEventListener("click", this.hideModal);
    }
    guessEl.innerText = 0;
    content.classList.add("active");
  }

  hideModal() {
    const tryAgain = document.getElementById("try-again");
    if (tryAgain) tryAgain.removeEventListener("click", this.hideModal);
    
    const modal = document.getElementById("modal-screen");
    const content = document.getElementById("modal-content-alt");
    content.classList.remove("active");
    modal.classList.remove("active");
  }

  hilo_val(num) {
    if (num >= 2 && num <= 6) {
      return 1;
    } else if (num >= 7 && num <= 9) {
      return 0;
    } else {
      return -1;
    }
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Game);

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ "./src/game.js");
// import { buildCard } from './randomness_util';


document.addEventListener("DOMContentLoaded", () => {
  const game = new _game__WEBPACK_IMPORTED_MODULE_0__["default"]();
  game.renderCard({
    top: 100,
    left: -100,
    xVel: 0.2,
    yVel: 0,
    lifespan: 5000,
    startTime: 1000
  });
  game.renderCard({
    top: 200,
    left: 900,
    xVel: -0.2,
    yVel: 0,
    lifespan: 5000,
    startTime: 2000
  });
  game.renderCard({
    top: 500,
    left: -100,
    xVel: 0.2,
    yVel: -0.12,
    lifespan: 5000,
    startTime: 3000
  });
  setTimeout(() => game.renderModal(), 9000);

});

/***/ }),

/***/ "./src/randomness_util.js":
/*!********************************!*\
  !*** ./src/randomness_util.js ***!
  \********************************/
/*! exports provided: randomNum, buildCard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "randomNum", function() { return randomNum; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildCard", function() { return buildCard; });
const randomNum = () => {
  return Math.floor((Math.random() * 13) + 1);
}

const randomSuit = () => {
  const idx = Math.floor(Math.random() * 4);
  return ["HEART-", "DIAMOND-", "CLUB-", "SPADE-"][idx];
}

const buildCard = (num) => {
  const card = document.createElement("img");
  card.setAttribute("src", `./dist/card_imgs/${randomSuit()}${num}.svg`);
  card.setAttribute("class", "card");
  return card;
}

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map