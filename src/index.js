import Game from './game';
import levels from './levels/all_levels';
import ClickManager from './click_manager';

document.addEventListener("DOMContentLoaded", () => {
  const game = new Game(levels);
  new ClickManager(game).installAllClickListeners();
});