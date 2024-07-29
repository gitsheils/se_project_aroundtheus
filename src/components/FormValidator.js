export default class FormValidator {
  constructor(configObj, formElement) {
    this._inputClass = configObj.inputClass;
    this._submitButtonClass = configObj.submitButtonClass;
    this._inactiveButtonClass = configObj.inactiveButtonClass;
    this._inputErrorClass = configObj.inputErrorClass;
    this._errorClass = configObj.errorClass;

    this._form = formElement;

    this._inputs = this._form.querySelectorAll(".form__input");
    this._errorMessages = this._form.querySelectorAll(".form__input-error");
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
    this.inputList = Array.from(this._form.querySelectorAll(this._inputClass));
    this.buttonElement = this._form.querySelector(this._submitButtonClass);

    this.toggleButtonState();

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
    this.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
  }

  resetForm() {
    this.buttonElement.classList.add(this._inactiveButtonClass);
    this.buttonElement.setAttribute("disabled", true);

    this._errorMessages.forEach((errorMessage) => {
      errorMessage.classList.remove("form__input-error_active");
    });
    this._inputs.forEach((input) => {
      input.classList.remove("form__input_type_error");
    });
  }
}
