const showInputError = (configObj, formElement, inputElement, errorMessage) => {
  inputElement.classList.add(configObj.inputErrorClass);
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(configObj.errorClass);
};

const hideInputError = (configObj, formElement, inputElement) => {
  inputElement.classList.remove(configObj.inputErrorClass);
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.remove(configObj.errorClass);
};

const checkInputValidity = (configObj, formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(
      configObj,
      formElement,
      inputElement,
      inputElement.validationMessage
    );
  } else {
    hideInputError(configObj, formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (configObj, inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(configObj.inactiveButtonClass);

    buttonElement.setAttribute("disabled", true);
  } else {
    buttonElement.classList.remove(configObj.inactiveButtonClass);

    buttonElement.removeAttribute("disabled");
  }
};

const setEventListeners = (configObj, formElement) => {
  const inputList = Array.from(
    formElement.querySelectorAll(configObj.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    configObj.submitButtonSelector
  );

  toggleButtonState(configObj, inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(configObj, formElement, inputElement);

      toggleButtonState(configObj, inputList, buttonElement);
    });
  });
};

const enableValidation = (configObj) => {
  const formList = Array.from(
    document.querySelectorAll(configObj.formSelector)
  );

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });

    setEventListeners(configObj, formElement);
  });
};
enableValidation({
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",

  inactiveButtonClass: "button_inactive",
  inputErrorClass: "form__input_type_error",

  errorClass: "form__input-error_active",
});
