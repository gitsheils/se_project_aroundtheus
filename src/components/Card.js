import { handleImageClick } from "../utils/utils.js";
export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this.name = data.name;
    this.link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
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
    return this._cardElement;
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleImageClick(this);
      });
    const buttonLike = this._cardElement.querySelector(".card__button-like");

    buttonLike.addEventListener("click", () => {
      this._handleLikeButton();
    });
    const buttonTrash = this._cardElement.querySelector(".card__button-delete");
    buttonTrash.addEventListener("click", () => {
      this._handleTrashButton();
    });
  }
  _handleLikeButton() {
    const buttonLike = this._cardElement.querySelector(".card__button-like");
    buttonLike.classList.toggle("card__button-like_active");
  }
  _handleTrashButton() {
    this._cardElement.remove();
  }
}
