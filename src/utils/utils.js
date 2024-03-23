import Card from "../components/Card.js";

import { deletePopup, previewPopup, api } from "../pages/index.js";

import { inputName, inputDescription } from "./constants.js";

export function fillProfileForm({ name, about }) {
  inputName.value = name;
  inputDescription.value = about;
}

export function handleImageClick(thisObj) {
  const title = thisObj.name;
  const link = thisObj.link;

  previewPopup.open({ title, link });
}
/*
export function createCard(item) {
  const card = new Card(item, "#card-template", handleImageClick);
  return card.generateCard();
}
*/
export function createCard(item) {
  const card = new Card(item, "#card-template", handleImageClick, {
    handleDelete: (cardElement, id) => {
      deletePopup.open();
      deletePopup.catchSelectedCard(cardElement, id);
    },
    handleLike: (id) => {
      api
        .addLike(id)
        .then((r) => {
          card.handleLikeButton();
        })
        .catch((err) => console.log(err));
    },
    handleUnlike: (id) => {
      api
        .deleteLike(id)
        .then((r) => {
          card.handleLikeButton();
        })
        .catch((err) => console.log(err));
    },
  });
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

export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error ${res.status}`);
}
