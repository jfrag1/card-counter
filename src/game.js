import ModalManager from './modal_manager';
import Card from './card';

class Game {
  constructor(levels) {
    this.count = 0;
    this.cardId = 0;
    this.cards = [];
    this.currentLevel = 1;
    this.levels = levels;
    this.modalManager = new ModalManager(this);
    
    this.levelTextAnimation = this.levelTextAnimation.bind(this);
  }

  playLevel() {
    setTimeout(() => this.levelTextAnimation(), 1000);
    setTimeout(this.renderAllCards.bind(this), 4000);
    setTimeout(this.renderResetButton.bind(this), 4000);
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
      this.cards.push(card);
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
    this.cards = [];
    this.removeResetButton();
  }

  removeResetButton() {
    const resetButton = document.getElementById("reset-button");
    resetButton.remove();
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

  renderLevelMenu() {
    const levelIndex = document.getElementById('level-index');
    const suit = this.generateRandomSuit();
    for (let i = 1; i <= this.levels.length; i++) {
      const levelButton = this.buildLevelButton(suit, i);
      levelIndex.appendChild(levelButton);
    }
  }

  generateRandomSuit() {
    const randomIndex = Math.floor(Math.random() * 4);
    return ["HEART", "DIAMOND", "CLUB", "SPADE"][randomIndex];
  }

  buildLevelButton(suit, level) {
    const levelButton = document.createElement('li');
    levelButton.setAttribute('id', `level-${level}`);
    const levelImg = document.createElement('img');
    levelImg.setAttribute('class', 'card');
    levelImg.setAttribute('src', `./dist/card_imgs/${suit}-${level}.svg`);
    levelButton.appendChild(levelImg);
    return levelButton;
  }

  reset() {
    this.cards.forEach(card => {
      card.cancelRenderTimer();
      card.imageElement.remove();
    });
    this.resetGameState();
    this.modalManager.goBackToMenu();
  }

  renderResetButton() {
    const resetButton = document.createElement("button");
    resetButton.setAttribute("id", "reset-button");
    resetButton.innerText = "Reset";
    resetButton.addEventListener("click", this.reset.bind(this));
    document.getElementById("reset-button-holder").appendChild(resetButton);
  }
}

export default Game;