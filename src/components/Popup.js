import { openModal, closeModal, closeByEsc } from "../utils/utils.js";
export default class Popup {
  constructor(popupSelector) {
    this.popup = popupSelector;
  }
  open() {
    openModal(this.popup);
    this._handleEscClose();
  }
  close() {
    closeModal(this.popup);
  }

  _handleEscClose() {
    document.addEventListener("keydown", closeByEsc);
  }
  setEventListeners() {
    this.buttonClose = this.popup.querySelector(".modal__button-close");
    this.buttonClose.addEventListener("click", () => {
      this.close();
    });

    this.popup.addEventListener("mousedown", () => {
      this.close();
    });
    const container = this.popup.querySelector(".modal__container");
    container.addEventListener("mousedown", (evt) => evt.stopPropagation());
  }
}
