import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    // call parent constructor first to get access to `this._popup`
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    // find the <form> element inside this popup
    this._form = this._popup.querySelector(".popup__form");
    // collect all input fields
    this._inputList = this._form.querySelectorAll(".popup__input");
  }

  // Collect input values into an object
  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  // Override parent method to add form submit behavior
  setEventListeners() {
    // first call parent's listener logic (for overlay + close button)
    super.setEventListeners();

    // then add form-specific listener
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();

      // get all inputs as an object
      const inputData = this._getInputValues();

      // call the callback you provided in index.js
      this._handleFormSubmit(inputData);

      // optional: reset form after submission
      this._form.reset();
    });
  }

  // also override close() to reset form each time popup closes
  close() {
    super.close();
    this._form.reset();
  }
}

export default PopupWithForm;
