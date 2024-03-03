import Card from "../components/Card.js";

import { cardPopup } from "../pages/index.js";

export function handleImageClick(thisObj) {
  const title = thisObj.name;
  const link = thisObj.link;

  cardPopup.open({ title, link });
}

export function createCard(item) {
  const card = new Card(item, "#card-template", handleImageClick);
  return card.generateCard();
}
