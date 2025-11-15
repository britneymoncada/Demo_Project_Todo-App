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

  getForm() {
    return this._form;
  }

  // Override parent method to add form submit behavior
  setEventListeners() {
    // first call parent's listener logic (for overlay + close button)
    super.setEventListeners();

    // add form-specific listener
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();

      // get all inputs as an object
      const inputData = this._getInputValues();

      // call the callback from index.js
      this._handleFormSubmit(inputData);

      // reset form after submission
      this._form.reset();
    });
  }

  close() {
    super.close();
  }
}

export default PopupWithForm;
