import "./index.css";
import {
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
  propicForm,
  propicModal,
  propicButtonEdit,
  propic,
  deleteModal,
} from "../utils/constants.js";
import { createCard, fillProfileForm } from "../utils/utils.js";
import { UserInfo } from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";

import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";

import { Api } from "../components/Api.js";
//
export const cardPopup = new PopupWithImage(modalCard);
cardPopup.setEventListeners();

const profileEdited = new UserInfo(profileTitle, profileSubtitle);

const profilePopup = new PopupWithForm(profileEditModal, {
  handleFormSubmit: (obj) => {
    //added:
    api.editProfile(obj);

    profileEdited.setUserInfo(obj);
  },
});
profilePopup.setEventListeners();
profileButtonEdit.addEventListener("click", () => {
  fillProfileForm(profileEdited.getUserInfo());
  profilePopup.open();
});

const cardsPopup = new PopupWithForm(cardsModal, {
  handleFormSubmit: (obj) => {
    //added:
    api.addNewCard(obj).then((r) => {
      const cardElement = createCard(r);
      cardList.prepend(cardElement);
    });
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

//

export const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "f01264e8-2101-4ab7-b120-b09b55e63681",
    "Content-Type": "application/json",
  },
});

api
  .returnUserInfoAndCards()
  .then((res) => {
    profileEdited.setUserInfo(res[0]);

    propic.src = res[0].avatar;

    const newCardsSection = new Section(
      {
        data: res[1],
        renderer: (item) => {
          const cardElement = createCard(item);
          cardList.append(cardElement);
        },
      },
      cardList
    );
    newCardsSection.renderItems();
  })
  .catch((err) => console.error(err));

const propicPopup = new PopupWithForm(propicModal, {
  handleFormSubmit: (obj) => {
    api.updateProPic(obj.link);
    propic.src = obj.link;
  },
});
propicPopup.setEventListeners();

propicButtonEdit.addEventListener("click", () => {
  propicPopup.open();
});

export const deletePopup = new PopupWithForm(deleteModal, {
  handleFormSubmit: (cardElement, objId) => {
    api.deleteCard(objId);
    cardElement.remove();
  },
});
deletePopup.setDeleteListener();

const propicFormValidator = new FormValidator(config, propicForm);
propicFormValidator.enableValidation();
