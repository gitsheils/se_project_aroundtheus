export default class FormValidator {
  constructor(configObj, formElement) {
    this._inputSelector = configObj.inputSelector;
    this._submitButtonSelector = configObj.submitButtonSelector;
    this._inactiveButtonClass = configObj.inactiveButtonClass;
    this._inputErrorClass = configObj.inputErrorClass;
    this._errorClass = configObj.errorClass;

    this._form = formElement;
  }

  showInputError(inputElement, errorMessage) {
    inputElement.classList.add(this._inputErrorClass);

    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }
  hideInputError(inputElement) {
    inputElement.classList.remove(this._inputErrorClass);

    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.remove(this._errorClass);
  }

  checkInputValidity(obj, inputElement) {
    if (!inputElement.validity.valid) {
      const errorMessage = inputElement.validationMessage;
      obj.showInputError(inputElement, errorMessage);
    } else obj.hideInputError(inputElement);
  }

  hasInvalidInput() {
    return this.inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  toggleButtonState(obj) {
    if (obj.hasInvalidInput()) {
      this.buttonElement.classList.add(this._inactiveButtonClass);
      this.buttonElement.setAttribute("disabled", true);
    } else {
      this.buttonElement.classList.remove(this._inactiveButtonClass);

      this.buttonElement.removeAttribute("disabled");
    }
  }

  setEventListeners(obj) {
    this.inputList = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
    this.buttonElement = this._form.querySelector(this._submitButtonSelector);
    this.inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
        obj.checkInputValidity(obj, inputElement);
        obj.hasInvalidInput();
        obj.toggleButtonState(obj);
      });
    });
  }
  enableValidation(obj) {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this.setEventListeners(obj);
  }
}

const config = {
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "button_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};
