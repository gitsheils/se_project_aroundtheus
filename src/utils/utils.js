import Card from "../components/Card.js";

import { cardPopup } from "../pages/index.js";

import { inputName, inputDescription } from "./constants.js";

export function fillProfileForm({ name, about }) {
  inputName.value = name;
  inputDescription.value = about;
}

export function handleImageClick(thisObj) {
  const title = thisObj.name;
  const link = thisObj.link;

  cardPopup.open({ title, link });
}

export function createCard(item) {
  const card = new Card(item, "#card-template", handleImageClick);
  return card.generateCard();
}

export function renderLoading(isLoading, form, text) {
  const subButton = form.querySelector(".form__button");
  if (isLoading) {
    subButton.textContent = "Saving...";
  } else {
    subButton.textContent = text;
  }
}
