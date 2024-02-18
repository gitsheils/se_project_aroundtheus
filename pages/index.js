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
const profileEditForm = profileEditModal.querySelector(".form");
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
profileButtonEdit.addEventListener("click", () => {
  fillProfileForm();
  openModal("#profile-modal");
});

function updateProfile(evt) {
  evt.preventDefault();

  profileTitle.textContent = inputName.value;
  profileSubtitle.textContent = inputDescription.value;

  closeModal("#profile-modal");
}
profileEditForm.addEventListener("submit", updateProfile);

const cardList = document.querySelector(".cards__list");
const modalCard = document.querySelector("#card-modal");

const buttonAdd = document.querySelector(".profile__add-button");
const cardsEditForm = document.querySelector("#cards-form");
const cardsInputTitle = cardsEditForm.querySelector(".form__input-title");
const cardsInputLink = cardsEditForm.querySelector(".form__input-link");

const modals = document.querySelectorAll(".modal");
modals.forEach((modal) => {
  const buttonClose = modal.querySelector(".modal__button-close");
  buttonClose.addEventListener("click", () => {
    closeModal(`#${modal.id}`);
  });

  modal.addEventListener("mousedown", () => {
    closeModal(`#${modal.id}`);
  });
  const container = modal.querySelector(".modal__container");
  container.addEventListener("mousedown", (evt) => evt.stopPropagation());

  document.addEventListener("keydown", closeByEsc);
});

buttonAdd.addEventListener("click", () => {
  openModal("#cards-modal");
});

function closeByEsc(evt) {
  if (evt.key === "Escape") {
    const currentModal = document.querySelector(".modal_opened");
    closeModal(`#${currentModal.id}`);
  }
}

function openModal(modalID) {
  const modal = document.querySelector(modalID);

  if (modalID == "#cards-modal") {
    const modalSubmitButton = modal.querySelector(".form__button");
    modalSubmitButton.classList.add("button_inactive");
    modalSubmitButton.setAttribute("disabled", true);
  }

  modal.classList.add("modal_opened");
}
function closeModal(modalID) {
  const modal = document.querySelector(modalID);
  modal.classList.remove("modal_opened");
}
function handleImageClick() {
  const cardModalImage = modalCard.querySelector(".modal__image");
  const cardModalTitle = modalCard.querySelector(".modal__card-title");

  cardModalImage.src = this._link;
  cardModalImage.alt = `photo of ${this._name}`;
  cardModalTitle.textContent = this._name;

  openModal("#card-modal");
}

initialCards.forEach((item) => {
  const card = new Card(item, "#card-template", handleImageClick);

  const cardElement = card.generateCard();
  cardList.append(cardElement);
});
function updateCards(evt) {
  evt.preventDefault();

  const name = cardsInputTitle.value;
  const link = cardsInputLink.value;
  const card = new Card({ name, link }, "#card-template", handleImageClick);
  const cardElement = card.generateCard();
  cardList.prepend(cardElement);

  closeModal("#cards-modal");
  cardsEditForm.reset();
}
cardsEditForm.addEventListener("submit", updateCards);

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
