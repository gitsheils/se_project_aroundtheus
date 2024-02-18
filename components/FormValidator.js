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

  checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      const errorMessage = inputElement.validationMessage;
      this.showInputError(inputElement, errorMessage);
    } else this.hideInputError(inputElement);
  }

  hasInvalidInput() {
    return this.inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  toggleButtonState() {
    if (this.hasInvalidInput()) {
      this.buttonElement.classList.add(this._inactiveButtonClass);
      this.buttonElement.setAttribute("disabled", true);
    } else {
      this.buttonElement.classList.remove(this._inactiveButtonClass);

      this.buttonElement.removeAttribute("disabled");
    }
  }

  setEventListeners() {
    this.inputList = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
    this.buttonElement = this._form.querySelector(this._submitButtonSelector);

    this.buttonElement.classList.add(this._inactiveButtonClass);
    this.buttonElement.setAttribute("disabled", true);

    this.inputList.forEach((inputElement) => {
      this.inputElement = inputElement;
      this.inputElement.addEventListener("input", () => {
        this.checkInputValidity(inputElement);
        this.hasInvalidInput();
        this.toggleButtonState();
      });
    });
  }
  enableValidation() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.buttonElement.classList.add(this._inactiveButtonClass);
      this.buttonElement.setAttribute("disabled", true);
    });
    this.setEventListeners();
  }
}

const config = {
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "button_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};
