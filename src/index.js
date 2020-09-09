import { buildCard } from './randomness_util.js';
// const buildCard = require("./randomness_util").buildCard;

document.addEventListener("DOMContentLoaded", () => {
  console.log("Dom loaded");
  const card = document.createElement("img");
  card.setAttribute("src", `./dist/card_imgs/${buildCard(4, 'HEARTS-')}`);
  card.setAttribute("class", "card");
  document.getElementById("game-board").appendChild(card);
});