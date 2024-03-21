import Popup from "../components/Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor(popup, { handleFormSubmit, renderLoading }) {
    super(popup);
    this.handleFormSubmit = handleFormSubmit;
    this.form = this.popup.querySelector(".form");

    this._renderLoading = renderLoading;
  }
  close() {
    super.close();
  }

  setEventListener() {
    super.setEventListeners();

    this.form.addEventListener("submit", (evt) => {
      evt.preventDefault();

      //renderLoading(true, this.form);
      this._renderLoading();

      this.handleFormSubmit(this.cardElement, this.id);
    });
  }

  catchSelectedCard(cardElement, objId) {
    this.cardElement = cardElement;
    this.id = objId;
  }
}
