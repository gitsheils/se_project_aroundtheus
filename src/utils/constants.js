export const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },

  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

export const cardList = document.querySelector(".cards__list");

export const modalCard = document.querySelector("#card-modal");
export const cardModalImage = modalCard.querySelector(".modal__image");
export const cardModalTitle = modalCard.querySelector(".modal__card-title");

export const profileButtonEdit = document.querySelector(
  ".profile__edit-button"
);
export const profileEditModal = document.querySelector("#profile-modal");
export const cardsButtonAdd = document.querySelector(".profile__add-button");
export const cardsModal = document.querySelector("#cards-modal");

export const profileTitle = document.querySelector(".profile__title");
export const profileSubtitle = document.querySelector(".profile__subtitle");

export const inputName = profileEditModal.querySelector(".form__input-name");
export const inputDescription = profileEditModal.querySelector(
  ".form__input-description"
);

export const cardsInputTitle = cardsModal.querySelector(".form__input-title");
export const cardsInputLink = cardsModal.querySelector(".form__input-link");

export const config = {
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "button_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

export const profileEditForm = profileEditModal.querySelector(".form");
export const cardsEditForm = cardsModal.querySelector("#cards-form");
