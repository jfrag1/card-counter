// points at which cards are not visible
const FAR_LEFT = -110;
const FAR_TOP = -150;
const FAR_RIGHT = 910;
const FAR_BOTTOM = 510;

class LevelBuilder {
  constructor(msDuration, msBetweenCards) {
    this.renderNextCardAt = 1000;
    this.msDuration = msDuration;
    this.msBetweenCards = msBetweenCards;
    this.level = [];
    this.fullWidth = FAR_RIGHT - FAR_LEFT;
    this.fullHeight = FAR_BOTTOM - FAR_TOP;
    this.arctan = Math.atan(this.fullHeight / this.fullWidth);
  }

  makeLevel() {
    let speed = 0.2;
    while (this.renderNextCardAt < this.msDuration) {
      this.makeSlidingCard(speed);
      speed += 0.02;
    }
  }

  makeSlidingCard(speed) {
    const theta = this.getRandomAngle();
    const startingPos = this.getOffScreenPosition(theta);
    const direction = theta + Math.PI;
    const xVel = speed * Math.cos(direction);
    const yVel = -speed * Math.sin(direction);
    this.level.push({
      top: startingPos[1],
      left: startingPos[0],
      xVel,
      yVel,
      msUntilRender: this.renderNextCardAt
    });
    this.renderNextCardAt += this.msBetweenCards;
  }
  
  getRandomAngle() {
    return Math.random() * 2 * Math.PI;
  }

  getOffScreenPosition(theta) {
    let x, y;
    if (this.comesFromTop(theta)) {
      y = this.fullHeight / 2;
      x = (this.fullHeight / 2) * Math.sqrt((1 / (Math.sin(theta) ** 2)) - 1);
      if (theta > Math.PI / 2) x = -x;
    } else if (this.comesFromLeft(theta)) {
      x = -this.fullWidth / 2;
      y = (this.fullWidth / 2) * Math.sqrt((1 / (Math.cos(theta) ** 2)) - 1);
      if (theta > Math.PI) y = -y;
    } else if (this.comesFromBottom(theta)) {
      y = -this.fullHeight / 2;
      x = (this.fullHeight / 2) * Math.sqrt((1 / (Math.sin(theta) ** 2)) - 1);
      if (theta < 3 * Math.PI / 2) x = -x;
    } else {
      x = this.fullWidth / 2;
      y = (this.fullWidth / 2) * Math.sqrt((1 / (Math.cos(theta) ** 2)) - 1);
      if (theta > Math.PI) y = -y;
    }
    return this.cartToCssCoords([x, y]);
  }


  comesFromTop(theta) {
    return (theta > this.arctan && theta < Math.PI - this.arctan);
  }

  comesFromLeft(theta) {
    return (theta > Math.PI - this.arctan && theta < Math.PI + this.arctan);
  }

  comesFromBottom(theta) {
    return (theta > Math.PI + this.arctan && theta < (2 * Math.PI) - this.arctan);
  }

  cartToCssCoords(pos) {
    return [pos[0] + 400, -pos[1] + 180];
  }

}

export default LevelBuilder;