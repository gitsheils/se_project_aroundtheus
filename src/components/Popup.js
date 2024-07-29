export default class Popup {
  constructor(popup) {
    this.popup = popup;
  }
  open() {
    this.popup.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }
  close() {
    this.popup.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };
  setEventListeners() {
    this.buttonClose = this.popup.querySelector(".modal__button-close");
    this.buttonClose.addEventListener("click", () => {
      this.close();
    });

    this.popup.addEventListener("mousedown", (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close();
      }
    });
  }
}
