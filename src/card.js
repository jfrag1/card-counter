class Card {
  constructor(animationEffects, game) {
    this.id = game.cardId;
    this.isFinalCard = (this.id === game.levels[game.currentLevel - 1].length);
    this.endLevel = game.endLevel.bind(game);
    this.setRandomSuitAndValue();
    this.buildCardHtmlElement();
    this.setHiLoIndexValue();
    this.setStartingPos(animationEffects.left, animationEffects.top);
    this.saveAnimationEffects(animationEffects);
  }

  setRandomSuitAndValue() {
    this.cardValue = this.generateRandomCardValue();
    this.suit = this.generateRandomSuit();
  }

  // cards are valued 1-13: Ace: 1, Jack: 11, Queen: 12, King: 13
  generateRandomCardValue() {
    return Math.floor((Math.random() * 13) + 1);
  }

  generateRandomSuit() {
    const randomIndex = Math.floor(Math.random() * 4);
    return ["HEART", "DIAMOND", "CLUB", "SPADE"][randomIndex];
  }

  buildCardHtmlElement() {
    this.imageElement = document.createElement("img");
    this.setElementAttributes();
  }

  setElementAttributes() {
    const imageUrl = `./dist/card_imgs/${this.suit}-${this.cardValue}.svg`;
    this.imageElement.setAttribute("src", imageUrl);
    this.imageElement.setAttribute("class", "card");
    this.imageElement.setAttribute("id", this.id);
  }

  setHiLoIndexValue() {
    if (this.cardValue >= 2 && this.cardValue <= 6) {
      this.hiLoIndexValue = 1;
    } else if (this.cardValue >= 7 && this.cardValue <= 9) {
      this.hiLoIndexValue = 0;
    } else {
      this.hiLoIndexValue = -1;
    }
  }

  setStartingPos(xPos, yPos) {
    xPos = xPos || 0;
    yPos = yPos || 0;
    this.imageElement.style.left = `${xPos}px`;
    this.imageElement.style.top = `${yPos}px`;
    this.startPosition = [xPos, yPos];
  }

  saveAnimationEffects(animationEffects) {
    this.xVel = animationEffects.xVel || 0;
    this.yVel = animationEffects.yVel || 0;
    this.msUntilRender = animationEffects.msUntilRender || 0;
    this.angularVel = animationEffects.angularVel;
    this.msUntilFullGrowth = animationEffects.msUntilFullGrowth;
    this.growTo = animationEffects.growTo || 1;
  }

  setRenderTimer() {
    this.renderTimer = setTimeout(this.render.bind(this), this.msUntilRender);
  }

  render() {
    this.hideIfGrowingCard();
    this.insertCardToDOM();
    this.initializeAnimation();
  }

  // must do this to prevent card from being rendered at full size in first frame
  hideIfGrowingCard() {
    if (this.isGrowingCard())
      this.imageElement.style.display = "none";
  }

  isGrowingCard() {
    return Boolean(this.msUntilFullGrowth);
  }

  insertCardToDOM() {
    document.getElementById("game-board").appendChild(this.imageElement);
  }

  initializeAnimation() {
    let start;
    const that = this;
    function step(timestamp) {
      if (start === undefined)
        start = timestamp;
      else
        that.imageElement.style.display = "block"; // make sure growing cards are visible after first animation frame
      const msElapsed = timestamp - start;
      that.continueOrEndAnimation(msElapsed, step);
    }
    window.requestAnimationFrame(step);
  }

  continueOrEndAnimation(msElapsed, step) {
    if (this.isReadyForRemoval(msElapsed)) {
      this.removeCardFromDOM();
    } else {
      this.setTransformation(msElapsed);
      window.requestAnimationFrame(step);
    }
  }

  isReadyForRemoval(msElapsed) {
    if (this.isGrowingCard()) {
      if (this.isFullyShrunk(msElapsed)) return true;
    }
    return (this.isOutOfBounds(msElapsed));
  }

  isFullyShrunk(msElapsed) {
    return (msElapsed > 2 * this.msUntilFullGrowth);
  }

  isOutOfBounds(msElapsed) {
    const [xPos, yPos] = this.currentPos(msElapsed);
    return !(xPos >= -150 && xPos <= 1000 && yPos >= -200 && yPos <= 550);
  }
  
  currentPos(msElapsed) {
    const xPos = this.startPosition[0] + (msElapsed * this.xVel);
    const yPos = this.startPosition[1] + (msElapsed * this.yVel);
    return [xPos, yPos];
  } 

  removeCardFromDOM() {
    this.imageElement.remove();
    if (this.isFinalCard)
      setTimeout(this.endLevel.bind(this), 800);
  }

  setTransformation(msElapsed) {
    this.imageElement.style.transform = this.calcTransformation(msElapsed);
  }

  calcTransformation(msElapsed) {
    let transformation = this.getTranslations(msElapsed);
    transformation += this.getAllOtherTransformations(msElapsed);
    return transformation;
  }

  getTranslations(msElapsed) {
    const xMove = msElapsed * this.xVel;
    const yMove = msElapsed * this.yVel;
    return `translateX(${xMove}px) translateY(${yMove}px)`;
  }

  getAllOtherTransformations(msElapsed) {
    let otherTransformations = '';
    otherTransformations += this.getRotation(msElapsed);
    otherTransformations += this.getGrowthTransformation(msElapsed);
    return otherTransformations;
  }

  getRotation(msElapsed) {
    if (this.isSpinningCard()) {
      return ` rotate(${this.angularVel * msElapsed}deg)`;
    } else {
      return '';
    }
  }

  isSpinningCard() {
    return Boolean(this.angularVel);
  }

  getGrowthTransformation(msElapsed) {
    if (this.isGrowingCard()) {
      const factor = this.getScaleFactor(msElapsed);
      return ` scale(${factor}, ${factor})`;
    } else {
      return '';
    }
  }

  getScaleFactor(msElapsed) {
    if (this.msUntilFullGrowth < msElapsed) {
      return (2 - msElapsed / this.msUntilFullGrowth) * this.growTo;
    } else {
      return (msElapsed / this.msUntilFullGrowth) * this.growTo;
    }
  }

  cancelRenderTimer() {
    if (this.renderTimer)
      clearTimeout(this.renderTimer);
  }
}

export default Card;