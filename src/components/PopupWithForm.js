import Popup from "../components/Popup.js";
export class PopupWithForm extends Popup {
  constructor(popup, { handleFormSubmit }) {
    super(popup);
    this.handleFormSubmit = handleFormSubmit;
    this.form = this.popup.querySelector(".form");
  }
  close() {
    super.close();
    this.form.reset();
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
      evt.preventDefault();

      this.handleFormSubmit(this._getInputValues());
      this.close();
    });
  }
}
