class Popup {
  constructor(popupSelector) {
    // Select the popup element using the CSS selector that gets passed
    this._popup = document.querySelector(popupSelector);
  }

  // open the popup
  open() {
    this._popup.classList.add("popup_opened");
    // Listen for Escape key to close
    document.addEventListener("keydown", this._handleEscapeClose);
  }

  // close the popup
  close() {
    this._popup.classList.remove("popup_opened");
    // Stop listening for Escape key once closed
    document.removeEventListener("keydown", this._handleEscapeClose);
  }

  // Private method: handle closing with Escape key
  _handleEscapeClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  // Public method: set up close button + overlay listeners
  setEventListeners() {
    this._popup.addEventListener("mousedown", (evt) => {
      // If the user clicks on the overlay or the close icon
      if (
        evt.target.classList.contains("popup_opened") ||
        evt.target.classList.contains("popup__close")
      ) {
        this.close();
      }
    });
  }
}

export default Popup;
