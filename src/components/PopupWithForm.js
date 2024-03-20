import Popup from "../components/Popup.js";

import { renderLoading } from "../utils/utils.js";

export class PopupWithForm extends Popup {
  constructor(popup, { handleFormSubmit }) {
    super(popup);
    this.handleFormSubmit = handleFormSubmit;
    this.form = this.popup.querySelector(".form");
  }
  close() {
    super.close();
    this.form.reset();
    //

    const errorMessages = this.form.querySelectorAll(".form__input-error");
    errorMessages.forEach((errorMessage) => {
      errorMessage.classList.remove("form__input-error_active");
    });
    const inputs = this.form.querySelectorAll(".form__input");
    inputs.forEach((input) => {
      input.classList.remove("form__input_type_error");
    });
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
      renderLoading(true, this.form);

      evt.preventDefault();

      this.handleFormSubmit(this._getInputValues());
      this.close();
    });
  }

  //
  setDeleteListener() {
    super.setEventListeners();
    this.form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.handleFormSubmit(this.cardElement, this.id);
      this.close();
    });
  }

  catchSelectedCard(cardElement, objId) {
    this.cardElement = cardElement;
    this.id = objId;
  }
}
