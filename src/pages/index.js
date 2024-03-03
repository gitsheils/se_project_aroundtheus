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
} from "../utils/constants.js";
import { createCard, updateCards } from "../utils/utils.js";
import { UserInfo } from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";

import { PopupWithForm } from "../components/PopupWithForm.js";

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

const profilePopup = new PopupWithForm(profileEditModal, {
  renderer: (obj) => {
    const profileEditted = new UserInfo(obj);
    profileEditted.setUserInfo();
  },
});
profilePopup.setEventListeners();
profileButtonEdit.addEventListener("click", () => {
  profilePopup.open();
});

const cardsPopup = new PopupWithForm(cardsModal, {
  renderer: (obj) => {
    updateCards(obj);
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
