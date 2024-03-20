import { handleImageClick } from "../utils/utils.js";

import { api } from "../pages/index.js";
import { deletePopup } from "../pages/index.js";

export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this.name = data.name;
    this.link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;

    this.id = data._id;

    this.isLiked = data.isLiked;
  }
  _getTemplate() {
    const template = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return template;
  }
  generateCard() {
    this._cardElement = this._getTemplate();
    this._setEventListeners();
    this._cardElement.querySelector(".card__image").src = this.link;
    this._cardElement.querySelector(
      ".card__image"
    ).alt = `photo of ${this.name}`;
    this._cardElement.querySelector(".card__title").textContent = this.name;

    if (this.isLiked === true) {
      this.buttonLike.classList.add("card__button-like_active");
    }

    return this._cardElement;
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleImageClick(this);
      });
    this.buttonLike = this._cardElement.querySelector(".card__button-like");

    this.buttonLike.addEventListener("click", () => {
      this._handleLikeButton();
    });
    this.buttonTrash = this._cardElement.querySelector(".card__button-delete");
    this.buttonTrash.addEventListener("click", () => {
      //added:
      deletePopup.open();

      deletePopup.catchSelectedCard(this._cardElement, this.id);
      //this._handleTrashButton();
    });
  }
  _handleLikeButton() {
    this.buttonLike.classList.toggle("card__button-like_active");
    if (
      Array.from(this.buttonLike.classList).includes("card__button-like_active")
    ) {
      api.addLike(this.id);
    } else {
      api.deleteLike(this.id);
    }
  }
  _handleTrashButton() {
    this._cardElement.remove();
  }
}
