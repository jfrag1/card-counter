export const randomNum = () => {
  return Math.floor((Math.random() * 13) + 1);
}

const randomSuit = () => {
  const idx = Math.floor(Math.random() * 4);
  return ["HEART-", "DIAMOND-", "CLUB-", "SPADE-"][idx];
}

export const buildCard = (num) => {
  const card = document.createElement("img");
  card.setAttribute("src", `./dist/card_imgs/${randomSuit()}${num}.svg`);
  card.setAttribute("class", "card");
  return card;
}