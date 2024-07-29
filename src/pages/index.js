import "./index.css";
import {
  cardList,
  modalProfileEdit,
  modalPropic,
  modalCards,
  modalCard,
  modalDelete,
  formProfile,
  formPropic,
  formCards,
  formDelete,
  buttonEditProfile,
  buttonEditPropic,
  buttonAddCard,
  config,
  profileTitle,
  profileSubtitle,
  propic,
  cardModalImage,
  cardModalTitle,
} from "../utils/constants.js";
import {
  createCard,
  fillProfileForm,
  renderLoading,
  checkResponse,
} from "../utils/utils.js";
import { UserInfo } from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";

import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";

import { Api } from "../components/Api.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
//

export const api = new Api(
  {
    baseUrl: "https://around-api.en.tripleten-services.com/v1",
    headers: {
      authorization: "f01264e8-2101-4ab7-b120-b09b55e63681",
      "Content-Type": "application/json",
    },
  },
  checkResponse
);
const profileInfo = new UserInfo(profileTitle, profileSubtitle, propic);

const newCardsSection = new Section(
  {
    renderer: (item) => {
      const cardElement = createCard(item);
      newCardsSection.addItem(cardElement);
    },
  },
  cardList
);
api
  .returnUserInfoAndCards()
  .then((res) => {
    profileInfo.setUserInfo(res[0]);
    newCardsSection.setItems(res[1].toReversed());
    newCardsSection.renderItems();
  })
  .catch((err) => console.error(err));

//
const profileFormValidator = new FormValidator(config, formProfile);
profileFormValidator.enableValidation();
const propicFormValidator = new FormValidator(config, formPropic);
propicFormValidator.enableValidation();
const cardsFormValidator = new FormValidator(config, formCards);
cardsFormValidator.enableValidation();

const profilePopup = new PopupWithForm(modalProfileEdit, {
  handleFormSubmit: (obj) => {
    api
      .editProfile(obj)
      .then((r) => {
        profilePopup.close();
        profileInfo.setUserInfo(r);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoading(false, formProfile, "Save");
      });
  },
  handleClearError: () => {
    profileFormValidator.resetForm();
  },
  renderLoading: () => {
    renderLoading(true, formProfile);
  },
});
profilePopup.setEventListeners();

const avatarPopup = new PopupWithForm(
  modalPropic,
  {
    handleFormSubmit: (obj) => {
      api
        .updateProPic(obj.link)
        .then((r) => {
          avatarPopup.close();
          profileInfo.setUserInfo(r);
        })
        .catch((err) => console.error(err))
        .finally(() => {
          renderLoading(false, formPropic, "Save");
        });
    },
    handleClearError: () => {
      propicFormValidator.resetForm();
    },
    renderLoading: () => {
      renderLoading(true, formPropic);
    },
  },
  propicFormValidator
);
avatarPopup.setEventListeners();

const cardsPopup = new PopupWithForm(
  modalCards,
  {
    handleFormSubmit: (obj) => {
      api
        .addNewCard(obj)
        .then((r) => {
          cardsPopup.close();

          newCardsSection.setItems([r]);
          newCardsSection.renderItems();
        })
        .catch((err) => console.error(err))
        .finally(() => {
          renderLoading(false, formCards, "Create");
        });
    },
    handleClearError: () => {
      cardsFormValidator.resetForm();
    },
    renderLoading: () => {
      renderLoading(true, formCards);
    },
  },
  cardsFormValidator
);
cardsPopup.setEventListeners();

buttonEditProfile.addEventListener("click", () => {
  fillProfileForm(profileInfo.getUserInfo());
  profilePopup.open();
});
buttonEditPropic.addEventListener("click", () => {
  avatarPopup.open();
});
buttonAddCard.addEventListener("click", () => {
  cardsPopup.open();
});

export const previewPopup = new PopupWithImage(
  modalCard,
  cardModalImage,
  cardModalTitle
);
previewPopup.setEventListeners();

export const deletePopup = new PopupWithConfirmation(modalDelete, {
  handleFormSubmit: (cardElement, objId) => {
    api
      .deleteCard(objId)
      .then((r) => {
        cardElement.remove();
        deletePopup.close();
      })
      .catch((err) => console.error(err))
      .finally(() => {
        renderLoading(false, formDelete, "Yes");
      });
  },
  renderLoading: () => {
    renderLoading(true, formDelete);
  },
});
deletePopup.setEventListener();
