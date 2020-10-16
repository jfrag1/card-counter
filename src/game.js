import { randomNum, buildCard } from './randomness_util';

class Game {
  constructor(levels) {
    this.count = 0;
    this.cardId = 0;
    this.currentLevel = 1;
    this.levels = levels;
    
    // declutter constructor
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

  // move to board class
  inBounds(xPos, yPos) {
    return xPos >= -150 && xPos <= 1000 && yPos >= -200 && yPos <= 550;
  }

  renderModal() {
    const modal = document.getElementById("modal-screen");
    modal.classList.add("active");

    // violates single responsibility principle renderModal is also resetting cardId
    this.cardId = 0;

  }

  // long
  handleSubmit() {
    const guessEl = document.getElementById("modal-guess");

    // need better name
    const content = document.getElementById("post-guess-modal");
    
    if (this.count === parseInt(guessEl.innerText)) {
      if (this.currentLevel === this.levels.length) {
        content.innerHTML = `<p>Correct! You win!</p><button id="back-to-menu">Back to menu</button>`
      } else {
        content.innerHTML = `<p>Correct!</p><button id="next-level">Next level</button><button id="back-to-menu">Back to menu</button>`

        // rename
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
    const content = document.getElementById("post-guess-modal");
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

export default Game;