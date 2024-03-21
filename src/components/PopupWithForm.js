import Popup from "../components/Popup.js";

export class PopupWithForm extends Popup {
  constructor(popup, { handleFormSubmit, handleClearError, renderLoading }) {
    super(popup);
    this.handleFormSubmit = handleFormSubmit;
    this.form = this.popup.querySelector(".form");

    this.handleClearError = handleClearError;
    this._renderLoading = renderLoading;
  }
  close() {
    super.close();
    this.form.reset();

    this.handleClearError();
  }
  _getInputValues() {
    const inputList = this.form.querySelectorAll(".form__input");

    const inputValues = {};
    for (const input of inputList) {
      inputValues[input.name] = input.value;
    }
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this.form.addEventListener("submit", (evt) => {
      //
      //renderLoading(true, this.form);
      this._renderLoading();

      evt.preventDefault();

      this.handleFormSubmit(this._getInputValues());
      //this.close();
    });
  }
}
