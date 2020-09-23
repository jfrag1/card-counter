import Game from './game';
import levels from './levels/all_levels';

document.addEventListener("DOMContentLoaded", () => {
  const game = new Game(levels);
  installEventListeners(game);

  const menu = document.getElementById("menu-content");
  menu.classList.add("active");

});

function installEventListeners(game) {
  const showTutorial = document.getElementById("tutorial-button");

  showTutorial.addEventListener("click", () => {
    showTutorial.style.display = "none";

    const tutorial = document.getElementById("tutorial");
    tutorial.classList.add("active");
  });

  const redX = document.getElementById("exit-tutorial");
  
  redX.addEventListener("click", () => {
    const tutorial = document.getElementById("tutorial");
    tutorial.classList.remove("active");

    const tutorialButton = document.getElementById("tutorial-button");
    tutorialButton.style.display = "block";
  });

  const levelIndex = document.getElementById("level-index");
  for (let i = 0; i < levelIndex.children.length; i++) {
    levelIndex.children[i].addEventListener("click", () => {
      game.playSpecificLevel(i + 1);
      const menu = document.getElementById("menu-content");
      menu.classList.remove("active");
    });
  }
}