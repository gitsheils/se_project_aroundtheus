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

  if (modal == cardsModal) {
    const modalSubmitButton = modal.querySelector(".form__button");
    modalSubmitButton.classList.add("button_inactive");
    modalSubmitButton.setAttribute("disabled", true);
  }

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
profileButtonClose.addEventListener("click", () => {
  closeModal(profileEditModal);
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
}
profileEditForm.addEventListener("submit", updateProfile);

const cardModal = document.querySelector("#card-modal");
const cardButtonClose = cardModal.querySelector(".modal__button-close");

initialCards.forEach((data) => {
  const card = new Card(data, "#card-template", handleImageClick);
  const cardElement = card.generateCard();

  cardList.append(cardElement);
});

const cardsModal = document.querySelector("#cards-modal");
const cardsButtonAdd = document.querySelector(".profile__add-button");
const cardsButtonClose = cardsModal.querySelector(".modal__button-close");

cardsButtonAdd.addEventListener("click", () => {
  openModal(cardsModal);
});
cardsButtonClose.addEventListener("click", () => {
  closeModal(cardsModal);
});

const cardsInputTitle = cardsModal.querySelector(".form__input-title");
const cardsInputLink = cardsModal.querySelector(".form__input-link");

const cardsEditForm = document.querySelector("#cards-form");
cardsEditForm.addEventListener("submit", updateCards);

const modalCard = document.querySelector("#card-modal");

function handleImageClick() {
  const cardModalImage = modalCard.querySelector(".modal__image");
  const cardModalTitle = modalCard.querySelector(".modal__card-title");

  cardModalImage.src = this._link;
  cardModalImage.alt = `photo of ${this._name}`;
  cardModalTitle.textContent = this._name;

  openModal(modalCard);
}

function updateCards(evt) {
  evt.preventDefault();
  const name = cardsInputTitle.value;
  const link = cardsInputLink.value;
  const card = new Card({ name, link }, "#card-template", handleImageClick);
  const cardElement = card.generateCard();
  cardList.prepend(cardElement);

  closeModal(cardsModal);
  cardsEditForm.reset();
}

cardButtonClose.addEventListener("click", () => {
  closeModal(cardModal);
});

const modals = document.querySelectorAll(".modal");
modals.forEach((modal) => {
  modal.addEventListener("mousedown", () => {
    closeModal(modal);
  });
  const container = modal.querySelector(".modal__container");
  container.addEventListener("mousedown", (evt) => evt.stopPropagation());
});

const config = {
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "button_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};
const proForm = document.querySelector("#profile-form");
const profileForm = new FormValidator(config, proForm);
const profileFormValidate = profileForm.enableValidation(profileForm);

const cForm = document.querySelector("#cards-form");
const cardsForm = new FormValidator(config, cForm);
const cardsFormValidate = cardsForm.enableValidation(cardsForm);
