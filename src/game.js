import { randomNum, buildCard } from './randomness_util';

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
  }

  // options takes keys top, left, xVel, yVel, startTime
  renderCard(options) {
    setTimeout(() => {
      this.cardId += 1;
      const num = randomNum();
      this.count += this.hilo_val(num);
      const card = buildCard(num, this.cardId);
  
      card.style.top = `${options.top}px`;
      card.style.left = `${options.left}px`;
  
      document.getElementById("game-board").appendChild(card);
      let start;
      const that = this;
  
      function step(timestamp) {
        if (start === undefined)
          start = timestamp;
        const elapsed = timestamp - start;
        const xTrans = options.xVel * elapsed;
        const yTrans = options.yVel * elapsed;
    
        card.style.transform =
          'translateX(' + (xTrans) + 'px) translateY(' + (yTrans) + 'px)'
  
    
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
      content.innerHTML = "<p>Correct! The count resets after each level.</p>";
      setTimeout(this.hideModal, 1000);
    } else {
      content.innerHTML = `<p>Incorrect. The count was ${this.count}.</p><button id="try-again">Try again</button>`;
      const tryAgain = document.getElementById("try-again");
      tryAgain.addEventListener("click", this.hideModal);
    }
    guessEl.innerText = 0;
    this.count = 0;
    content.classList.add("active");
  }

  hideModal() {
    const tryAgain = document.getElementById("try-again");
    if (tryAgain) tryAgain.removeEventListener("click", this.hideModal);
    this.currentLevel += 1;

    if (this.currentLevel <= this.levels.length) {
      const modal = document.getElementById("modal-screen");
      const content = document.getElementById("modal-content-alt");
      content.classList.remove("active");
      modal.classList.remove("active");
      
      setTimeout(this.playLevel, 1000);
    } else {
      const content = document.getElementById("modal-content-alt");
      content.innerHTML = "<p>You win!</p>";
    }
  }

  playLevel() {
    this.levels[this.currentLevel - 1].forEach(card => {
      this.renderCard(card);
    });
  }

  playSpecificLevel(level) {
    this.currentLevel = level;
    this.playLevel();
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