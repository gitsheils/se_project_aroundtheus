import { renderLoading } from "../utils/utils.js";

import { api } from "../pages/index.js";
import {
  profileEditForm,
  cardsEditForm,
  propicForm,
} from "../utils/constants.js";

export class Api {
  constructor(options) {
    this._options = options;
  }

  loadUserInfo() {
    return fetch("https://around-api.en.tripleten-services.com/v1/users/me", {
      headers: {
        authorization: "f01264e8-2101-4ab7-b120-b09b55e63681",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject("Error: ${res.status}");
    });
  }

  getInitialCards() {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      headers: {
        authorization: "f01264e8-2101-4ab7-b120-b09b55e63681",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject("Error: ${res.status}");
    });
  }

  editProfile({ name, about }) {
    return fetch("https://around-api.en.tripleten-services.com/v1/users/me", {
      method: "PATCH",
      headers: {
        authorization: "f01264e8-2101-4ab7-b120-b09b55e63681",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject("Error: ${res.status}");
      })
      .finally(() => {
        renderLoading(false, profileEditForm, "Save");
      });
  }

  addNewCard({ name, link }) {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      method: "POST",
      headers: {
        authorization: "f01264e8-2101-4ab7-b120-b09b55e63681",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject("Error: ${res.status}");
      })
      .finally(() => {
        renderLoading(false, cardsEditForm, "Create");
      });
  }

  deleteCard(cardId) {
    return fetch(
      `https://around-api.en.tripleten-services.com/v1/cards/${cardId}`,
      {
        method: "DELETE",
        headers: {
          authorization: "f01264e8-2101-4ab7-b120-b09b55e63681",
        },
      }
    ).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject("Error: ${res.status}");
    });
  }

  addLike(cardId) {
    return fetch(
      `https://around-api.en.tripleten-services.com/v1/cards/${cardId}/likes`,
      {
        method: "PUT",
        headers: {
          authorization: "f01264e8-2101-4ab7-b120-b09b55e63681",
        },
      }
    ).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject("Error: ${res.status}");
    });
  }

  deleteLike(cardId) {
    return fetch(
      `https://around-api.en.tripleten-services.com/v1/cards/${cardId}/likes`,
      {
        method: "DELETE",
        headers: {
          authorization: "f01264e8-2101-4ab7-b120-b09b55e63681",
        },
      }
    ).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject("Error: ${res.status}");
    });
  }

  updateProPic(link) {
    return fetch(
      "https://around-api.en.tripleten-services.com/v1/users/me/avatar",
      {
        method: "PATCH",
        headers: {
          authorization: "f01264e8-2101-4ab7-b120-b09b55e63681",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          avatar: link,
        }),
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject("Error: ${res.status}");
      })
      .finally(() => {
        renderLoading(false, propicForm, "Save");
      });
  }

  returnUserInfoAndCards() {
    const profileInfo = api.loadUserInfo();
    const cardInfo = api.getInitialCards();
    const promises = [profileInfo, cardInfo];
    return Promise.all(promises);
  }
}
