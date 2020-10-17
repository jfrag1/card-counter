// import { randomNum, buildCard } from './randomness_util';
import ModalManager from './modal_manager';
import Card from './card';
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
    
    this.levelTextAnimation = this.levelTextAnimation.bind(this);
  }

  playLevel() {
    setTimeout(() => this.levelTextAnimation(), 1000);
    setTimeout(this.renderAllCards.bind(this), 4000);
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

  renderAllCards() {
    this.levels[this.currentLevel - 1].forEach(cardEffects => {
      this.cardId += 1;
      const card = new Card(cardEffects, this);
      this.count += card.hiLoIndexValue;
      card.setRenderTimer();
    })
  }

  endLevel() {
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

  playSpecificLevel(level) {
    this.currentLevel = level;
    this.playLevel();
  }

}

export default Game;