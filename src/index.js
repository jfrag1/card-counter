// import { buildCard } from './randomness_util';
import Game from './game';

document.addEventListener("DOMContentLoaded", () => {
  const game = new Game();
  game.renderCard({
    top: 100,
    left: -100,
    xVel: 0.2,
    yVel: 0,
    lifespan: 5000,
    startTime: 1000
  });
  game.renderCard({
    top: 200,
    left: 900,
    xVel: -0.2,
    yVel: 0,
    lifespan: 5000,
    startTime: 2000
  });
  game.renderCard({
    top: 500,
    left: -100,
    xVel: 0.2,
    yVel: -0.12,
    lifespan: 5000,
    startTime: 3000
  });
  setTimeout(() => game.renderModal(), 9000);

});