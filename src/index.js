// import { buildCard } from './randomness_util';
import Game from './game';
import levels from './levels/all_levels';

document.addEventListener("DOMContentLoaded", () => {

  const game = new Game(levels);
  game.playLevel();

});