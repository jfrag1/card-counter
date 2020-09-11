import { randomNum, buildCard } from './randomness_util';

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
      const num = randomNum();
      this.count += this.hilo_val(num);
      const card = buildCard(num);
  
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

export default Game;