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

/***/ "./src/click_manager.js":
/*!******************************!*\
  !*** ./src/click_manager.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _html_grabber__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./html_grabber */ "./src/html_grabber.js");


class ClickManager {
  constructor(game) {
    this.startLevel = game.playSpecificLevel.bind(game);
    this.submitGuess = game.submitGuess.bind(game);
    this.getRelevantHtml();
  }

  getRelevantHtml() {
    this.tutorialButton = this.getHtmlById("tutorial-button");
    this.tutorialScreen = this.getHtmlById("tutorial");
    this.closeTutorialButton = this.getHtmlById("exit-tutorial");
    this.levelButtons = this.getHtmlById("level-index").element.children;
    this.gameMenu = this.getHtmlById("menu-content");
    this.countGuess = this.getHtmlById("modal-guess");
    this.plusButton = this.getHtmlById("plus");
    this.minusButton = this.getHtmlById("minus");
    this.submitButton = this.getHtmlById("submit");
  }

  getHtmlById(id) {
    return new _html_grabber__WEBPACK_IMPORTED_MODULE_0__["default"](id);
  }

  installAllClickListeners() {
    this.tutorialButton.addClickListener(
      this.renderTutorialScreen.bind(this) );

    this.closeTutorialButton.addClickListener(
      this.hideTutorialScreen.bind(this) );

    this.installLevelButtonListeners();
    this.installModalListeners();
  }

  renderTutorialScreen() {
    this.tutorialButton.setDisplay("none");
    this.tutorialScreen.addClass("active");
  }

  hideTutorialScreen() {
    this.tutorialScreen.removeClass("active");
    this.tutorialButton.setDisplay("block");
  }

  installLevelButtonListeners() {
    for (let i = 0; i < this.levelButtons.length; i++)
      this.installSingleLevelButtonListener(i + 1);
  }

  installSingleLevelButtonListener(level) {
    this.levelButtons[level - 1].addEventListener("click",
      this.hideMenuAndStartLevel.bind(this, level)
    );
  }

  hideMenuAndStartLevel(level) {
    this.startLevel(level);
    this.hideMenu();
  }

  hideMenu() {
    this.gameMenu.removeClass("active");
  }

  installModalListeners() {
    this.plusButton.addClickListener(this.incrementGuess.bind(this));
    this.minusButton.addClickListener(this.decrementGuess.bind(this));
    this.submitButton.addClickListener(this.submitGuess.bind(this));
  }

  incrementGuess() {
    this.countGuess.increment();
  }

  decrementGuess() {
    this.countGuess.decrement();
  }
}

/* harmony default export */ __webpack_exports__["default"] = (ClickManager);

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _randomness_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./randomness_util */ "./src/randomness_util.js");
/* harmony import */ var _modal_manager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modal_manager */ "./src/modal_manager.js");


/*
  other duties
    * know current level
    * store levels
  game flow 
    1. choose level - handled by click manager
    2. trigger level text animation - make details into its own class
    3. set timeout to render each card of the level 
      -change this => use level to make card objects all at once - know the count immediately,
        then set timeouts for each card object
    4. keep track of the count for each card that is rendered - pass game instance down to card class
    5. keep track of how many cards have been rendered - know when level ends
    6. trigger modal rendering - check correctness of guess
    7. trigger post-guess modal rendering - defer details to modal manager class
*/

class Game {
  constructor(levels) {
    this.count = 0;
    this.cardId = 0;
    this.currentLevel = 1;
    this.levels = levels;
    this.modalManager = new _modal_manager__WEBPACK_IMPORTED_MODULE_1__["default"](this);
    
    // declutter constructor
    this.renderCard = this.renderCard.bind(this);
    this.renderModal = this.renderModal.bind(this);
    this.submitGuess = this.submitGuess.bind(this);
    this.playLevel = this.playLevel.bind(this);
    this.tryLevelAgain = this.tryLevelAgain.bind(this);
    this.nextLevel = this.nextLevel.bind(this);
    this.levelTextAnimation = this.levelTextAnimation.bind(this);
  }

  // options takes keys top, left, xVel, yVel, startTime, optionally angularVel, scaleTime
  renderCard(options) {
    setTimeout(() => {
      // cardId keeps track of how many cards have been rendered - move to class having to do with rendering cards
      this.cardId += 1;
      // belongs to lower level class
      const num = Object(_randomness_util__WEBPACK_IMPORTED_MODULE_0__["randomNum"])();

      // make into method (this.changeCount(card))
      this.count += this.hilo_val(num);

      // constructor of card class
      const card = Object(_randomness_util__WEBPACK_IMPORTED_MODULE_0__["buildCard"])(num, this.cardId);
  
      card.style.top = `${options.top}px`;
      card.style.left = `${options.left}px`;

      if (options.scaleTime) card.style.display = "none";

      // maybe make board class
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
          const scaleTo = options.growTo ? options.growTo : 1;
          if (options.scaleTime < elapsed) {
            factor = (2 - elapsed / options.scaleTime) * scaleTo;
          } else {
            factor = (elapsed / options.scaleTime) * scaleTo;
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

  // move to board/card class
  inBounds(xPos, yPos) {
    return xPos >= -150 && xPos <= 1000 && yPos >= -200 && yPos <= 550;
  }

  renderModal() {
    this.modalManager.renderGuessModal();
  }

  submitGuess() {
    if (this.guessIsCorrect()) {
      this.renderVictoryModal();
    } else {
      this.modalManager.renderLevelLoss(this.count);
    }
    this.resetGameState();
  }

  guessIsCorrect() {
    const countGuess = document.getElementById("modal-guess");
    return (this.count === parseInt(countGuess.innerText));
  }

  renderVictoryModal() {
    if (this.isFinalLevel()) {
      this.modalManager.renderFinalLevelWin();
    } else {
      this.modalManager.renderLevelWin();
    }
  }

  isFinalLevel() {
    return (this.currentLevel === this.levels.length);
  }

  resetGameState() {
    const countGuess = document.getElementById("modal-guess");
    countGuess.innerText = 0;
    this.count = 0;
    this.cardId = 0;
  }

  tryLevelAgain() {
    this.modalManager.hideModal();
    this.playLevel();
  }

  nextLevel() {
    this.currentLevel += 1;
    this.modalManager.hideModal();
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

/***/ "./src/html_grabber.js":
/*!*****************************!*\
  !*** ./src/html_grabber.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class HtmlGrabber {
  constructor(id) {
    this.element = document.getElementById(id);
  }

  addClickListener(callback) {
    this.element.addEventListener("click", callback);
  }

  addClass(className) {
    this.element.classList.add(className);
  }

  removeClass(className) {
    this.element.classList.remove(className);
  }

  setDisplay(displayType) {
    this.element.style.display = displayType;
  }

  increment() {
    this.element.innerText = parseInt(this.element.innerText) + 1;
  }

  decrement() {
    this.element.innerText = parseInt(this.element.innerText) - 1;
  }

  setTextToZero() {
    this.element.innerText = 0;
  }

  setInnerHtml(elements) {
    this.element.innerHTML = elements;
  }
}

/* harmony default export */ __webpack_exports__["default"] = (HtmlGrabber);

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
/* harmony import */ var _click_manager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./click_manager */ "./src/click_manager.js");




document.addEventListener("DOMContentLoaded", () => {
  const game = new _game__WEBPACK_IMPORTED_MODULE_0__["default"](_levels_all_levels__WEBPACK_IMPORTED_MODULE_1__["default"]);
  new _click_manager__WEBPACK_IMPORTED_MODULE_2__["default"](game).installAllClickListeners();
});

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
/* harmony import */ var _level6__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./level6 */ "./src/levels/level6.js");







/* harmony default export */ __webpack_exports__["default"] = ([_level1__WEBPACK_IMPORTED_MODULE_0__["default"], _level2__WEBPACK_IMPORTED_MODULE_1__["default"], _level3__WEBPACK_IMPORTED_MODULE_2__["default"], _level4__WEBPACK_IMPORTED_MODULE_3__["default"], _level5__WEBPACK_IMPORTED_MODULE_4__["default"], _level6__WEBPACK_IMPORTED_MODULE_5__["default"]]);

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
    top: -150,
    left: 250,
    xVel: 0.17,
    yVel: 0.30,
    startTime: 1000
  },
  {
    top: 500,
    left: 250,
    xVel: 0.17,
    yVel: -0.30,
    startTime: 2500
  },
  {
    top: 500,
    left: 550,
    xVel: -0.17,
    yVel: -0.30,
    startTime: 4000
  },
  {
    top: -150,
    left: 550,
    xVel: -0.17,
    yVel: 0.30,
    startTime: 5500 
  },
  {
    top: -150,
    left: 250,
    xVel: 0.17,
    yVel: 0.30,
    startTime: 6800
  },
  {
    top: 500,
    left: 250,
    xVel: 0.17,
    yVel: -0.30,
    startTime: 8100
  },
  {
    top: 500,
    left: 550,
    xVel: -0.17,
    yVel: -0.30,
    startTime: 9400
  },
  {
    top: -150,
    left: 550,
    xVel: -0.17,
    yVel: 0.30,
    startTime: 10700 
  },
  {
    top: 200,
    left: 150,
    xVel: 0,
    yVel: 0,
    startTime: 12000,
    angularVel: 0.15,
    scaleTime: 3000,
    growTo: 1.3 
  },
  {
    top: 200,
    left: 400,
    xVel: 0,
    yVel: 0,
    startTime: 12000,
    angularVel: 0.15,
    scaleTime: 3000,
    growTo: 1.3
  },
  {
    top: 200,
    left: 650,
    xVel: 0,
    yVel: 0,
    startTime: 12000,
    angularVel: 0.15,
    scaleTime: 3000,
    growTo: 1.3 
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
    startTime: 13700
  },
  {
    top: 500,
    left: 900,
    xVel: -0.40,
    yVel: -0.25,
    startTime: 13700
  },
  {
    top: 100,
    left: 120,
    xVel: 0,
    yVel: 0,
    startTime: 15500,
    angularVel: -0.18,
    scaleTime: 2500,
    growTo: 1.3 
  },
  {
    top: 100,
    left: 680,
    xVel: 0,
    yVel: 0,
    startTime: 15500,
    angularVel: 0.18,
    scaleTime: 2500,
    growTo: 1.15 
  },
  {
    top: 300,
    left: 120,
    xVel: 0,
    yVel: 0,
    startTime: 15500,
    angularVel: 0.18,
    scaleTime: 2500,
    growTo: 1.15 
  },
  {
    top: 300,
    left: 680,
    xVel: 0,
    yVel: 0,
    startTime: 15500,
    angularVel: -0.18,
    scaleTime: 2500,
    growTo: 1.15
  },
  {
    top: 200,
    left: 400,
    xVel: 0,
    yVel: 0,
    startTime: 15500,
    scaleTime: 2500,
  },
]);

/***/ }),

/***/ "./src/levels/level6.js":
/*!******************************!*\
  !*** ./src/levels/level6.js ***!
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
    top: -150,
    left: 300,
    xVel: 0,
    yVel: 0.32,
    startTime: 2500
  },
  {
    top: -150,
    left: 500,
    xVel: 0,
    yVel: 0.32,
    startTime: 2500
  },
  {
    top: 65,
    left: 900,
    xVel: -0.35,
    yVel: 0,
    startTime: 3500
  },
  {
    top: 285,
    left: 900,
    xVel: -0.35,
    yVel: 0,
    startTime: 3500
  },
  {
    top: 500,
    left: 300,
    xVel: 0,
    yVel: -0.32,
    startTime: 5000
  },
  {
    top: 500,
    left: 500,
    xVel: 0,
    yVel: -0.32,
    startTime: 5000
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
    top: -150,
    left: 200,
    xVel: 0,
    yVel: 0.36,
    startTime: 12000
  },
  {
    top: 150,
    left: -100,
    xVel: 0.42,
    yVel: 0,
    startTime: 12700
  },
  {
    top: 500,
    left: 600,
    xVel: 0,
    yVel: -0.36,
    startTime: 13500
  },
  {
    top: 270,
    left: 900,
    xVel: -0.42,
    yVel: 0,
    startTime: 14200
  },
  {
    top: -150,
    left: 200,
    xVel: 0,
    yVel: 0.36,
    startTime: 15000
  },
  {
    top: 150,
    left: -100,
    xVel: 0.42,
    yVel: 0,
    startTime: 15800
  },
  {
    top: 500,
    left: 600,
    xVel: 0,
    yVel: -0.36,
    startTime: 16600
  },
  {
    top: 270,
    left: 900,
    xVel: -0.42,
    yVel: 0,
    startTime: 17400
  },
  {
    top: -150,
    left: 200,
    xVel: 0,
    yVel: 0.36,
    startTime: 18200
  },
  {
    top: 150,
    left: -100,
    xVel: 0.42,
    yVel: 0,
    startTime: 19000
  },
  {
    top: 500,
    left: 600,
    xVel: 0,
    yVel: -0.36,
    startTime: 19800
  },
  {
    top: 270,
    left: 900,
    xVel: -0.42,
    yVel: 0,
    startTime: 20600
  },
]);

/***/ }),

/***/ "./src/modal_manager.js":
/*!******************************!*\
  !*** ./src/modal_manager.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _html_grabber__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./html_grabber */ "./src/html_grabber.js");


class ModalManager {
  constructor(game) {
    this.playNextLevel = game.nextLevel.bind(game);
    this.tryLevelAgain = game.tryLevelAgain.bind(game);
    this.getRelevantHtml();
  }

  getRelevantHtml() {
    this.guessModal = this.getHtmlById('modal-screen');
    this.postGuessModal = this.getHtmlById('post-guess-modal');
    this.menu = this.getHtmlById('menu-content');
  }

  getHtmlById(id) {
    return new _html_grabber__WEBPACK_IMPORTED_MODULE_0__["default"](id);
  }

  renderGuessModal() {
    this.guessModal.addClass("active");
  }

  renderFinalLevelWin() {
    this.postGuessModal.setInnerHtml(
      '<p>Correct! You win!</p><button id="back-to-menu">Back to menu</button>'
    );
    this.installMenuButtonListener();
    this.postGuessModal.addClass('active');
  }

  installMenuButtonListener() {
    const menuButton = document.getElementById('back-to-menu');
    menuButton.addEventListener("click", this.goBackToMenu.bind(this));
  }

  goBackToMenu() {
    this.hideModal();
    this.menu.addClass('active');
  }

  hideModal() {
    this.guessModal.removeClass('active');
    this.postGuessModal.removeClass('active');
  }

  renderLevelWin() {
    this.postGuessModal.setInnerHtml(
      '<p>Correct!</p><button id="next-level">Next level</button><button id="back-to-menu">Back to menu</button>'
    );
    this.installMenuButtonListener();
    this.installNextLevelListener();
    this.postGuessModal.addClass('active');
  }

  installNextLevelListener() {
    const nextLevelButton = this.getHtmlById('next-level');
    nextLevelButton.addClickListener(this.playNextLevel.bind(this));
  }

  renderLevelLoss(actualCount) {
    this.postGuessModal.setInnerHtml(
      `<p>Incorrect. The count was ${actualCount}.</p><button id="try-again">Try again</button><button id="back-to-menu">Back to menu</button>`
    );
    this.installMenuButtonListener();
    this.installTryLevelAgainListener();
    this.postGuessModal.addClass('active');
  }

  installTryLevelAgainListener() {
    const tryAgainButton = this.getHtmlById("try-again");
    tryAgainButton.addClickListener(this.tryLevelAgain.bind(this));
  }
}

/* harmony default export */ __webpack_exports__["default"] = (ModalManager);

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