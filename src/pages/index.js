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
  deleteForm,
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
export const previewPopup = new PopupWithImage(
  modalCard,
  cardModalImage,
  cardModalTitle
);
previewPopup.setEventListeners();

const profileInfo = new UserInfo(profileTitle, profileSubtitle, propic);

const profileFormValidator = new FormValidator(config, profileEditForm);
profileFormValidator.enableValidation();

const cardsFormValidator = new FormValidator(config, cardsEditForm);
cardsFormValidator.enableValidation();

const propicFormValidator = new FormValidator(config, propicForm);
propicFormValidator.enableValidation();

const profilePopup = new PopupWithForm(profileEditModal, {
  handleFormSubmit: (obj) => {
    api
      .editProfile(obj)
      .then((r) => {
        profilePopup.close();
        profileInfo.setUserInfo(r);
      })
      .finally(() => {
        renderLoading(false, profileEditForm, "Save");
      });
  },
  handleClearError: () => {
    profileFormValidator.clearError();
  },
  renderLoading: () => {
    renderLoading(true, profileEditForm);
  },
});
profilePopup.setEventListeners();
profileButtonEdit.addEventListener("click", () => {
  fillProfileForm(profileInfo.getUserInfo());
  profilePopup.open();
});

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

/*check:
const newCardsSection = new Section(
  {
    data: "",
    renderer: (item) => {
      const cardElement = createCard(item);
      cardList.append(cardElement);
    },
  },
  cardList
);
*/
api
  .returnUserInfoAndCards()
  .then((res) => {
    profileInfo.setUserInfo(res[0]);

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

const avatarPopup = new PopupWithForm(
  propicModal,
  {
    handleFormSubmit: (obj) => {
      api
        .updateProPic(obj.link)
        .then((r) => {
          avatarPopup.close();
          propic.src = obj.link;
        })
        .finally(() => {
          renderLoading(false, propicForm, "Save");
        });
    },
    handleClearError: () => {
      propicFormValidator.clearError();
    },
    renderLoading: () => {
      renderLoading(true, propicForm);
    },
  },
  propicFormValidator
);
avatarPopup.setEventListeners();

propicButtonEdit.addEventListener("click", () => {
  avatarPopup.open();
});

export const deletePopup = new PopupWithConfirmation(deleteModal, {
  handleFormSubmit: (cardElement, objId) => {
    api
      .deleteCard(objId)
      .then((r) => {
        cardElement.remove();
        deletePopup.close();
      })
      .finally(() => {
        renderLoading(false, deleteForm, "Yes");
      });
  },
  renderLoading: () => {
    renderLoading(true, deleteForm);
  },
});
deletePopup.setEventListener();

const cardsPopup = new PopupWithForm(
  cardsModal,
  {
    handleFormSubmit: (obj) => {
      api
        .addNewCard(obj)
        .then((r) => {
          cardsPopup.close();
          /*
      const cardElement = createCard(r);
      cardList.prepend(cardElement);
      */
          const addedCS = new Section(
            {
              data: [r],
              renderer: (item) => {
                const cardElement = createCard(item);

                cardList.prepend(cardElement);
              },
            },
            cardList
          );
          addedCS.renderItems();
        })
        .finally(() => {
          renderLoading(false, cardsEditForm, "Create");
        });
    },
    handleClearError: () => {
      cardsFormValidator.clearError();
    },
    renderLoading: () => {
      renderLoading(true, cardsEditForm);
    },
  },
  cardsFormValidator
);
cardsPopup.setEventListeners();
cardsButtonAdd.addEventListener("click", () => {
  cardsPopup.open();
});
