import Popup from "../components/Popup.js";
export class PopupWithForm extends Popup {
  constructor(popupSelector, { renderer }) {
    super(popupSelector);
    this.renderer = renderer;
    this.form = this.popup.querySelector(".form");
  }
  close() {
    super.close();
    this.form.reset();
  }
  _getInputValues() {
    this.inputList = this.form.querySelectorAll(".form__input");
    const input1 = this.inputList[0].value;
    const input2 = this.inputList[1].value;
    return { input1, input2 };
  }

  setEventListeners() {
    super.setEventListeners();

    this.form.addEventListener("submit", (evt) => {
      evt.preventDefault();

      this.renderer(this._getInputValues());
      this.form.reset();
      this.close();
    });
  }
}
