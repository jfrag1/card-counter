import Game from './game';
import levels from './levels/all_levels';
import ClickManager from './click_manager';

/*
When the page loads, the level menu appears.
Clicking on a card starts that level.
When the level starts, the menu disappears.
Next, level text is animated across the screen.
Then cards begin to appear moving across the screen
*/

document.addEventListener("DOMContentLoaded", () => {
  const game = new Game(levels);
  game.renderLevelMenu();

  new ClickManager(game).installAllClickListeners();
});