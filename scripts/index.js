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

const buttonEdit = document.querySelector(".profile__edit-button");
const profileEditModal = document.querySelector(".modal");
const buttonClose = document.querySelector(".modal__button-close");

const input = profileEditModal.querySelectorAll(".form__input");
const inputName = input[0];
const inputDescription = input[1];
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
function fillProfileForm() {
  inputName.value = profileTitle.textContent;
  inputDescription.value = profileSubtitle.textContent;
}

buttonEdit.addEventListener("click", () => {
  fillProfileForm();
  profileEditModal.classList.add("modal_opened");
});
buttonClose.addEventListener("click", () => {
  profileEditModal.classList.remove("modal_opened");
});

const buttonSave = profileEditModal.querySelector(".form__button");
const profileEditForm = profileEditModal.querySelector(".form");
const cardTemplate = document.querySelector("#card-template").content;
const cardList = document.querySelector(".cards__list");

function updateProfile(evt) {
  evt.preventDefault();

  profileTitle.textContent = inputName.value;
  profileSubtitle.textContent = inputDescription.value;

  profileEditModal.classList.remove("modal_opened");
}
profileEditForm.addEventListener("submit", updateProfile);

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardImage.setAttribute("src", data.link);
  cardImage.setAttribute("alt", data.name);
  cardTitle.textContent = data.name;

  const cardModal = document.querySelector(".card-modal");
  const buttonCloseCard = document.querySelector(".card-modal__button-close");

  cardImage.addEventListener("click", () => {
    const cardModalImage = document.querySelector(".card-modal__image");
    const cardModalTitle = document.querySelector(".card-modal__title");
    cardModalImage.src = data.link;
    cardModalTitle.textContent = data.name;
    cardModal.classList.add("card-modal_opened");
  });

  buttonCloseCard.addEventListener("click", () => {
    cardModal.classList.remove("card-modal_opened");
  });

  const buttonLike = cardElement.querySelector(".card__button-like");
  buttonLike.addEventListener("click", () => {
    buttonLike.classList.toggle("card__button-like_active");
  });

  const buttonTrash = cardElement.querySelector(".card__button-delete");
  buttonTrash.addEventListener("click", () => {
    const card = buttonTrash.closest(".card");
    card.remove();
  });

  return cardElement;
}
initialCards.forEach((data) => {
  const cardElement = getCardElement(data);
  cardList.append(cardElement);
});

const cardsModal = document.querySelector(".cards-modal");
const cardsButtonAdd = document.querySelector(".profile__add-button");
const cardsButtonClose = document.querySelector(".cards-modal__button-close");

cardsButtonAdd.addEventListener("click", () => {
  cardsModal.classList.add("cards-modal_opened");
});
cardsButtonClose.addEventListener("click", () => {
  cardsModal.classList.remove("cards-modal_opened");
});

const cardsInput = document.querySelectorAll(".cards-form__input");
const cardsInputTitle = cardsInput[0];
const cardsInputLink = cardsInput[1];

const cardsEditForm = document.querySelector(".cards-form");
cardsEditForm.addEventListener("submit", updateCards);

function updateCards(evt) {
  evt.preventDefault();
  const name = cardsInputTitle.value;
  const link = cardsInputLink.value;
  const cardElement = getCardElement({ name, link });
  console.log(cardElement);
  cardList.prepend(cardElement);
  cardsModal.classList.remove("cards-modal_opened");
}
