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

function openModal(modal) {
  modal.classList.add("modal_opened");
}
function closeModal(modal) {
  modal.classList.remove("modal_opened");
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

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardImage.setAttribute("src", data.link);
  cardImage.setAttribute("alt", data.name);
  cardTitle.textContent = data.name;

  cardImage.addEventListener("click", () => {
    const cardModalImage = document.querySelector(".modal__image");
    const cardModalTitle = document.querySelector(".modal__card-title");
    cardModalImage.alt = `photo of ${data.name}`;
    cardModalImage.src = data.link;

    cardModalTitle.textContent = data.name;
    openModal(cardModal);
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

function updateCards(evt) {
  evt.preventDefault();
  const name = cardsInputTitle.value;
  const link = cardsInputLink.value;
  const cardElement = getCardElement({ name, link });
  cardList.prepend(cardElement);
  closeModal(cardsModal);
  cardsEditForm.reset();
}
cardButtonClose.addEventListener("click", () => {
  closeModal(cardModal);
});
