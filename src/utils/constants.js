export const cardList = document.querySelector(".cards__list");

export const modalProfileEdit = document.querySelector("#profile-modal");
export const modalPropic = document.querySelector("#propic-modal");
export const modalCards = document.querySelector("#cards-modal");
export const modalCard = document.querySelector("#card-modal");
export const modalDelete = document.querySelector("#delete-modal");

export const inputName = modalProfileEdit.querySelector(".form__input-name");
export const inputDescription = modalProfileEdit.querySelector(
  ".form__input-description"
);

export const formProfile = modalProfileEdit.querySelector(".form");
export const formPropic = document.querySelector("#propic-form");
export const formCards = modalCards.querySelector("#cards-form");
export const formDelete = document.querySelector("#delete-form");

export const buttonEditProfile = document.querySelector(
  ".profile__edit-button"
);
export const buttonEditPropic = document.querySelector(".profile__image-ed");
export const buttonAddCard = document.querySelector(".profile__add-button");

export const cardsInputTitle = modalCards.querySelector(".form__input-title");
export const cardsInputLink = modalCards.querySelector(".form__input-link");

export const cardModalImage = modalCard.querySelector(".modal__image");
export const cardModalTitle = modalCard.querySelector(".modal__card-title");

export const profileTitle = document.querySelector(".profile__title");
export const profileSubtitle = document.querySelector(".profile__subtitle");
export const propic = document.querySelector(".profile__image");

export const config = {
  inputClass: ".form__input",
  submitButtonClass: ".form__button",
  inactiveButtonClass: "button_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};
