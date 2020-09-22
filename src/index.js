import Game from './game';
import levels from './levels/all_levels';

document.addEventListener("DOMContentLoaded", () => {
  const game = new Game(levels);

  const levelIndex = document.getElementById("level-index");
  for (let i = 0; i < levelIndex.children.length; i++) {
    levelIndex.children[i].addEventListener("click", () => {
      game.playSpecificLevel(i + 1);
      const menu = document.getElementById("menu-content");
      menu.classList.remove("active");
    });
  }

  const menu = document.getElementById("menu-content");
  menu.classList.add("active");

});