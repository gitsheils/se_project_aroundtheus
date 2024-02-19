import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const initialCards = [
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

const profileButtonEdit = document.querySelector(".profile__edit-button");
const profileEditModal = document.querySelector("#profile-modal");
const profileButtonClose = profileEditModal.querySelector(
  ".modal__button-close"
);
const inputName = profileEditModal.querySelector(".form__input-name");
const inputDescription = profileEditModal.querySelector(
  ".form__input-description"
);
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");

function fillProfileForm() {
  inputName.value = profileTitle.textContent;
  inputDescription.value = profileSubtitle.textContent;
}

function closeByEsc(evt) {
  if (evt.key === "Escape") {
    const modal = document.querySelector(".modal_opened");
    closeModal(modal);
  }
}

function openModal(modal) {
  modal.classList.add("modal_opened");

  document.addEventListener("keydown", closeByEsc);
}
function closeModal(modal) {
  modal.classList.remove("modal_opened");

  document.removeEventListener("keydown", closeByEsc);
}

profileButtonEdit.addEventListener("click", () => {
  fillProfileForm();
  openModal(profileEditModal);
});

const buttonSave = profileEditModal.querySelector(".form__button");
const profileEditForm = profileEditModal.querySelector(".form");
const cardTemplate = document.querySelector("#card-template").content;
const cardList = document.querySelector(".cards__list");

function updateProfile(evt) {
  evt.preventDefault();

  profileTitle.textContent = inputName.value;
  profileSubtitle.textContent = inputDescription.value;

  closeModal(profileEditModal);
  profileEditForm.reset();
}
profileEditForm.addEventListener("submit", updateProfile);

const cardModal = document.querySelector("#card-modal");
const cardButtonClose = cardModal.querySelector(".modal__button-close");

function createCard(item) {
  const card = new Card(item, "#card-template", handleImageClick);
  return card.generateCard();
}

initialCards.forEach((data) => {
  const cardElement = createCard(data);
  cardList.append(cardElement);
});

const cardsModal = document.querySelector("#cards-modal");
const cardsButtonAdd = document.querySelector(".profile__add-button");
const cardsButtonClose = cardsModal.querySelector(".modal__button-close");

cardsButtonAdd.addEventListener("click", () => {
  openModal(cardsModal);
});

const cardsInputTitle = cardsModal.querySelector(".form__input-title");
const cardsInputLink = cardsModal.querySelector(".form__input-link");

const cardsEditForm = document.querySelector("#cards-form");
cardsEditForm.addEventListener("submit", updateCards);

const modalCard = document.querySelector("#card-modal");

function handleImageClick(thisObj) {
  const cardModalImage = modalCard.querySelector(".modal__image");
  const cardModalTitle = modalCard.querySelector(".modal__card-title");

  cardModalImage.src = thisObj.link;
  cardModalImage.alt = `photo of ${thisObj.name}`;
  cardModalTitle.textContent = thisObj.name;

  openModal(modalCard);
}

function updateCards(evt) {
  evt.preventDefault();
  const name = cardsInputTitle.value;
  const link = cardsInputLink.value;

  const cardElement = createCard({ name, link });
  cardList.prepend(cardElement);

  closeModal(cardsModal);
  cardsEditForm.reset();
}

const modals = document.querySelectorAll(".modal");
modals.forEach((modal) => {
  modal.addEventListener("mousedown", () => {
    closeModal(modal);
  });

  const closeButton = modal.querySelector(".modal__button-close");
  closeButton.addEventListener("click", () => {
    closeModal(modal);
  });

  const container = modal.querySelector(".modal__container");
  container.addEventListener("mousedown", (evt) => evt.stopPropagation());
});

//

const config = {
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "button_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};
const profileFormValidator = new FormValidator(config, profileEditForm);
profileFormValidator.enableValidation();

const cardsFormValidator = new FormValidator(config, cardsEditForm);
cardsFormValidator.enableValidation();
