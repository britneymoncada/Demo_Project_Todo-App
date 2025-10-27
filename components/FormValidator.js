export class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings; // save validation rules (selectors, CSS classes, etc.)
    this._formElement = formElement; // the specific form we’re validating

    // query and store all inputs + the submit button
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._settings.inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._settings.submitButtonSelector
    );
  }
}
