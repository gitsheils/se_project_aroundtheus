import Card from "../components/Card.js";
import { cardList } from "../utils/constants.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { modalCard } from "../utils/constants.js";

export function handleImageClick(thisObj) {
  const title = thisObj.name;
  const link = thisObj.link;

  const cardPopup = new PopupWithImage(modalCard);
  cardPopup.setEventListeners();
  cardPopup.open({ title, link });
}

export function createCard(item) {
  const card = new Card(item, "#card-template", handleImageClick);
  return card.generateCard();
}

export function updateCards({ input1, input2 }) {
  const name = input1;
  const link = input2;
  const cardElement = createCard({ name, link });
  cardList.prepend(cardElement);
}

export function openModal(modal) {
  modal.classList.add("modal_opened");
}
export function closeModal(modal) {
  modal.classList.remove("modal_opened");
}
export function closeByEsc(evt) {
  if (evt.key === "Escape") {
    const currentModal = document.querySelector(".modal_opened");
    closeModal(currentModal);

    document.removeEventListener("keydown", closeByEsc);
  }
}
