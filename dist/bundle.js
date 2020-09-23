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
  constructor(levels) {
    this.count = 0;
    this.cardId = 0;
    this.currentLevel = 1;
    this.levels = levels;
    
    this.renderCard = this.renderCard.bind(this);
    this.renderModal = this.renderModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.playLevel = this.playLevel.bind(this);
    this.tryLevelAgain = this.tryLevelAgain.bind(this);
    this.nextLevel = this.nextLevel.bind(this);
    this.backToMenu = this.backToMenu.bind(this);
    this.levelTextAnimation = this.levelTextAnimation.bind(this);
  }

  // options takes keys top, left, xVel, yVel, startTime, optionally angularVel, scaleTime
  renderCard(options) {
    setTimeout(() => {
      this.cardId += 1;
      const num = Object(_randomness_util__WEBPACK_IMPORTED_MODULE_0__["randomNum"])();
      this.count += this.hilo_val(num);
      const card = Object(_randomness_util__WEBPACK_IMPORTED_MODULE_0__["buildCard"])(num, this.cardId);
  
      card.style.top = `${options.top}px`;
      card.style.left = `${options.left}px`;

      if (options.scaleTime) card.style.display = "none";
      document.getElementById("game-board").appendChild(card);
      
      let start;
      const that = this;
      
      function step(timestamp) {
        if (start === undefined)
        start = timestamp;
        const elapsed = timestamp - start;
        const xTrans = options.xVel * elapsed;
        const yTrans = options.yVel * elapsed;
        
        let transString = 'translateX(' + (xTrans) + 'px) translateY(' + (yTrans) + 'px)';
        if (options.angularVel) {
          transString +=' rotate(' + (options.angularVel * elapsed) + 'deg)';
        }

        if (options.scaleTime) {
          let factor
          if (options.scaleTime < elapsed) {
            factor = 2 - elapsed / options.scaleTime
          } else {
            factor = elapsed / options.scaleTime
          }
          transString += "scale(" + factor + ", " + factor + ")";
          
          if (elapsed > 100) {
            card.style.display = "block";
          }

          if (elapsed > 2 * options.scaleTime) {
            if (parseInt(card.id) === that.levels[that.currentLevel - 1].length) {
              setTimeout(that.renderModal, 800);
            }
            card.remove();
            return;
          }
        }
    
        card.style.transform = transString;
    
        if (that.inBounds(options.left + xTrans, options.top + yTrans)) {
          window.requestAnimationFrame(step);
        } else {
          if (parseInt(card.id) === that.levels[that.currentLevel - 1].length) {
            setTimeout(that.renderModal, 800);
          }
          card.remove();
        }
      }
    
      card.onload = () => window.requestAnimationFrame(step);
    }, options.startTime);
  }

  inBounds(xPos, yPos) {
    return xPos >= -150 && xPos <= 1000 && yPos >= -200 && yPos <= 550;
  }

  renderModal() {
    const modal = document.getElementById("modal-screen");
    modal.classList.add("active");

    this.cardId = 0;

    const guessEl = document.getElementById("modal-guess");
    const minus = document.getElementById("minus");
    const plus = document.getElementById("plus");
    const btn = document.getElementById("submit");


    minus.addEventListener("click", this.decrementGuessVal);

    plus.addEventListener("click", this.incrementGuessVal);

    btn.addEventListener("click", this.handleSubmit);
  }

  incrementGuessVal() {
    const guessEl = document.getElementById("modal-guess");
    guessEl.innerText = parseInt(guessEl.innerHTML) + 1;
  }

  decrementGuessVal() {
    const guessEl = document.getElementById("modal-guess");
    guessEl.innerText = parseInt(guessEl.innerHTML) - 1;
  }


  handleSubmit() {
    const guessEl = document.getElementById("modal-guess");
    const minus = document.getElementById("minus");
    const plus = document.getElementById("plus");
    const btn = document.getElementById("submit");

    
    minus.removeEventListener("click", this.decrementGuessVal);
    plus.removeEventListener("click", this.incrementGuessVal);
    btn.removeEventListener("click", this.handleSubmit);

    const content = document.getElementById("modal-content-alt");
    if (this.count === parseInt(guessEl.innerText)) {
      if (this.currentLevel === this.levels.length) {
        content.innerHTML = `<p>Correct! You win!</p><button id="back-to-menu">Back to menu</button>`
      } else {
        content.innerHTML = `<p>Correct!</p><button id="next-level">Next level</button><button id="back-to-menu">Back to menu</button>`
        const nLevel = document.getElementById("next-level");
        nLevel.addEventListener("click", this.nextLevel);
      }
    } else {
      content.innerHTML = `<p>Incorrect. The count was ${this.count}.</p><button id="try-again">Try again</button><button id="back-to-menu">Back to menu</button>`;
      const tryAgain = document.getElementById("try-again");
      tryAgain.addEventListener("click", this.tryLevelAgain);
    }
    const menuButton = document.getElementById("back-to-menu");
    menuButton.addEventListener("click", this.backToMenu);

    guessEl.innerText = 0;
    this.count = 0;
    content.classList.add("active");
  }

  hideModal() {
    const tryAgain = document.getElementById("try-again");
    if (tryAgain) {
      tryAgain.removeEventListener("click", this.hideModal);
    }

    const modal = document.getElementById("modal-screen");
    const content = document.getElementById("modal-content-alt");
    content.classList.remove("active");
    modal.classList.remove("active");
  }

  backToMenu() {
    this.currentLevel = 1;
    this.hideModal();
    const menu = document.getElementById("menu-content");
    menu.classList.add("active");
  }

  tryLevelAgain() {
    this.hideModal();
    this.playLevel();
  }

  nextLevel() {
    this.currentLevel += 1;
    this.hideModal();
    this.playLevel();
  }

  playLevel() {
    setTimeout(() => this.levelTextAnimation(), 1000);
    setTimeout(() => this.levels[this.currentLevel - 1].forEach(card => {
      this.renderCard(card);
    }), 4000);
  }

  playSpecificLevel(level) {
    this.currentLevel = level;
    this.playLevel();
  }

  levelTextAnimation() {
    const levelText = document.createElement("div");
    levelText.setAttribute("class", "level-text");
    levelText.innerText = `Level ${this.currentLevel}`;
    document.getElementById("game-board").appendChild(levelText);

    let start;

    function step(timestamp) {
      if (start === undefined)
        start = timestamp;
      const elapsed = timestamp - start;
      const secsElapsed = elapsed / 1000;

      const pos = -21 + 1106 * secsElapsed - 674.3 * secsElapsed ** 2 + 146.66 * secsElapsed ** 3;
      const slant = (1106 - 1349 * secsElapsed + 440 * secsElapsed ** 2) / 20;

      levelText.style.transform = 'translateX(' + pos + 'px) skewX(' + slant + 'deg)';

      if (elapsed < 3300) {
        window.requestAnimationFrame(step);
      } else {
        levelText.remove();
      }
    }

    window.requestAnimationFrame(step);
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
/* harmony import */ var _levels_all_levels__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./levels/all_levels */ "./src/levels/all_levels.js");



document.addEventListener("DOMContentLoaded", () => {
  const game = new _game__WEBPACK_IMPORTED_MODULE_0__["default"](_levels_all_levels__WEBPACK_IMPORTED_MODULE_1__["default"]);
  installEventListeners(game);

  const menu = document.getElementById("menu-content");
  menu.classList.add("active");

});

function installEventListeners(game) {
  const showTutorial = document.getElementById("tutorial-button");

  showTutorial.addEventListener("click", () => {
    showTutorial.style.display = "none";

    const tutorial = document.getElementById("tutorial");
    tutorial.classList.add("active");
  });

  const redX = document.getElementById("exit-tutorial");
  
  redX.addEventListener("click", () => {
    const tutorial = document.getElementById("tutorial");
    tutorial.classList.remove("active");

    const tutorialButton = document.getElementById("tutorial-button");
    tutorialButton.style.display = "block";
  });

  const levelIndex = document.getElementById("level-index");
  for (let i = 0; i < levelIndex.children.length; i++) {
    levelIndex.children[i].addEventListener("click", () => {
      game.playSpecificLevel(i + 1);
      const menu = document.getElementById("menu-content");
      menu.classList.remove("active");
    });
  }
}

/***/ }),

/***/ "./src/levels/all_levels.js":
/*!**********************************!*\
  !*** ./src/levels/all_levels.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _level1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./level1 */ "./src/levels/level1.js");
/* harmony import */ var _level2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./level2 */ "./src/levels/level2.js");
/* harmony import */ var _level3__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./level3 */ "./src/levels/level3.js");
/* harmony import */ var _level4__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./level4 */ "./src/levels/level4.js");
/* harmony import */ var _level5__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./level5 */ "./src/levels/level5.js");






/* harmony default export */ __webpack_exports__["default"] = ([_level1__WEBPACK_IMPORTED_MODULE_0__["default"], _level2__WEBPACK_IMPORTED_MODULE_1__["default"], _level3__WEBPACK_IMPORTED_MODULE_2__["default"], _level4__WEBPACK_IMPORTED_MODULE_3__["default"], _level5__WEBPACK_IMPORTED_MODULE_4__["default"]]);

/***/ }),

/***/ "./src/levels/level1.js":
/*!******************************!*\
  !*** ./src/levels/level1.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ([
  {
    top: 170,
    left: -120,
    xVel: 0.2,
    yVel: 0,
    startTime: 1000
  },
  {
    top: 170,
    left: -120,
    xVel: 0.2,
    yVel: 0,
    startTime: 6000
  },
  {
    top: 170,
    left: -120,
    xVel: 0.2,
    yVel: 0,
    startTime: 11000
  }
]);

/***/ }),

/***/ "./src/levels/level2.js":
/*!******************************!*\
  !*** ./src/levels/level2.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ([
  {
    top: 170,
    left: -120,
    xVel: 0.3,
    yVel: 0,
    startTime: 1000
  },
  {
    top: -150,
    left: 400,
    xVel: 0,
    yVel: 0.2,
    startTime: 4000
  },
  {
    top: 170,
    left: 900,
    xVel: -0.3,
    yVel: 0,
    startTime: 6800
  },
  {
    top: 500,
    left: 400,
    xVel: 0,
    yVel: -0.2,
    startTime: 9800
  }
]);

/***/ }),

/***/ "./src/levels/level3.js":
/*!******************************!*\
  !*** ./src/levels/level3.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ([
  {
    top: 250,
    left: -120,
    xVel: 0.25,
    yVel: 0,
    startTime: 1000
  },
  {
    top: 100,
    left: 900,
    xVel: -0.25,
    yVel: 0,
    startTime: 1000
  },
  {
    top: 500,
    left: 500,
    xVel: -0.16,
    yVel: -0.16,
    startTime: 4200
  },
  {
    top: -150,
    left: 250,
    xVel: 0.16,
    yVel: 0.16,
    startTime: 4200
  },
  {
    top: -150,
    left: 250,
    xVel: 0,
    yVel: 0.22,
    startTime: 7500
  },
  {
    top: 500,
    left: 500,
    xVel: 0,
    yVel: -0.22,
    startTime: 7500
  },
  {
    top: 350,
    left: -120,
    xVel: 0.16,
    yVel: -0.16,
    startTime: 10200
  },
  {
    top: 50,
    left: 900,
    xVel: -0.16,
    yVel: 0.16,
    startTime: 10200
  },
]);

/***/ }),

/***/ "./src/levels/level4.js":
/*!******************************!*\
  !*** ./src/levels/level4.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ([
  {
    top: 20,
    left: -120,
    xVel: 0.45,
    yVel: 0.15,
    startTime: 1000
  },
  {
    top: 500,
    left: 600,
    xVel: -0.08,
    yVel: -0.40,
    startTime: 2000
  },
  {
    top: 370,
    left: -120,
    xVel: 0.39,
    yVel: -0.17,
    startTime: 3200
  },
  {
    top: -150,
    left: 700,
    xVel: -0.35,
    yVel: 0.25,
    startTime: 4500
  },
  {
    top: 30,
    left: -120,
    xVel: 0.50,
    yVel: 0,
    startTime: 6000
  },
  {
    top: 170,
    left: 900,
    xVel: -0.50,
    yVel: 0,
    startTime: 6500
  },
  {
    top: 310,
    left: -120,
    xVel: 0.50,
    yVel: 0,
    startTime: 7000
  },
  {
    top: -150,
    left: 150,
    xVel: 0,
    yVel: 0.40,
    startTime: 9500
  },
  {
    top: 500,
    left: 400,
    xVel: 0,
    yVel: -0.40,
    startTime: 10000
  },
  {
    top: -150,
    left: 650,
    xVel: 0,
    yVel: 0.40,
    startTime: 10500
  },
  {
    top: -150,
    left: -100,
    xVel: 0.40,
    yVel: 0.25,
    startTime: 12000
  },
  {
    top: -150,
    left: 900,
    xVel: -0.40,
    yVel: 0.25,
    startTime: 12000
  },
  {
    top: 500,
    left: -100,
    xVel: 0.40,
    yVel: -0.25,
    startTime: 14500
  },
  {
    top: 500,
    left: 900,
    xVel: -0.40,
    yVel: -0.25,
    startTime: 14500
  },
]);

/***/ }),

/***/ "./src/levels/level5.js":
/*!******************************!*\
  !*** ./src/levels/level5.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ([
  {
    top: 65,
    left: -100,
    xVel: 0.35,
    yVel: 0,
    startTime: 1000
  },
  {
    top: 285,
    left: -100,
    xVel: 0.35,
    yVel: 0,
    startTime: 1000
  },
  {
    top: 65,
    left: 900,
    xVel: -0.35,
    yVel: 0,
    startTime: 4000
  },
  {
    top: 285,
    left: 900,
    xVel: -0.35,
    yVel: 0,
    startTime: 4000
  },
  {
    top: -150,
    left: -100,
    xVel: 0.35,
    yVel: 0.20,
    angularVel: 0.2,
    startTime: 7000
  },
  {
    top: -150,
    left: 900,
    xVel: -0.35,
    yVel: 0.20,
    angularVel: -0.2,
    startTime: 8000
  },
  {
    top: 500,
    left: 900,
    xVel: -0.35,
    yVel: -0.20,
    angularVel: -0.2,
    startTime: 9000
  },
  {
    top: 500,
    left: -100,
    xVel: 0.35,
    yVel: -0.20,
    angularVel: 0.2,
    startTime: 10000
  },
  {
    top: 200,
    left: 400,
    xVel: 0,
    yVel: 0,
    angularVel: 0.3,
    startTime: 1000,
    scaleTime: 3000
  },
]);

// t = 0, scale = 0, t = scaleTime, scale = 1

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

const buildCard = (num, id) => {
  const card = document.createElement("img");
  card.setAttribute("src", `./dist/card_imgs/${randomSuit()}${num}.svg`);
  card.setAttribute("class", "card");
  card.setAttribute("id", id);
  return card;
}

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map