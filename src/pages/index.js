import "./index.css";
import {
  initialCards,
  cardList,
  profileButtonEdit,
  profileEditModal,
  cardsButtonAdd,
  cardsModal,
  config,
  profileEditForm,
  cardsEditForm,
  profileTitle,
  profileSubtitle,
  modalCard,
} from "../utils/constants.js";
import { createCard, fillProfileForm } from "../utils/utils.js";
import { UserInfo } from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";

import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";

const cardsSection = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      cardsSection.addItem(cardElement);
    },
  },
  cardList
);
cardsSection.renderItems();
//
export const cardPopup = new PopupWithImage(modalCard);
cardPopup.setEventListeners();

const profileEddited = new UserInfo(profileTitle, profileSubtitle);

const profilePopup = new PopupWithForm(profileEditModal, {
  handleFormSubmit: (obj) => {
    profileEddited.setUserInfo(obj);
  },
});
profilePopup.setEventListeners();
profileButtonEdit.addEventListener("click", () => {
  fillProfileForm(profileEddited.getUserInfo());
  profilePopup.open();
});

const cardsPopup = new PopupWithForm(cardsModal, {
  handleFormSubmit: (obj) => {
    const cardElement = createCard(obj);
    cardsSection.addItem(cardElement);
  },
});
cardsPopup.setEventListeners();
cardsButtonAdd.addEventListener("click", () => {
  cardsPopup.open();
});

const profileFormValidator = new FormValidator(config, profileEditForm);
profileFormValidator.enableValidation();

const cardsFormValidator = new FormValidator(config, cardsEditForm);
cardsFormValidator.enableValidation();
