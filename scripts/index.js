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

  return cardElement;
}
initialCards.forEach((data) => {
  const cardElement = getCardElement(data);
  cardList.append(cardElement);
});
