import { randomNum, buildCard } from './randomness_util';
import ModalManager from './modal_manager';
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
    this.modalManager = new ModalManager(this);
    
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
      const num = randomNum();

      // make into method (this.changeCount(card))
      this.count += this.hilo_val(num);

      // constructor of card class
      const card = buildCard(num, this.cardId);
  
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

export default Game;