// ==================================================
// 🔹 5. TODO CREATION FUNCTION
// ==================================================
// This function currently handles DOM creation, event binding,
// and rendering for each to-do. Will be refactored into Todo class.

export class Todo {
  constructor(data, selector) {
    this._name = data.name;
    this._completed = Boolean(data.completed);
    this._date = data.date ? new Date(data.date) : null;
    this._id = data.id;
    this._selector = selector;

    // instance refs (filled in getView)
    this._element = null;
    this._nameEl = null;
    this._checkbox = null;
    this._label = null;
    this._dateEl = null;
    this._deleteBtn = null;
  }

  _setEventListeners() {
    this._deleteBtn.addEventListener("click", () => {
      this._element.remove();
    });

    this._checkbox.addEventListener("change", () => {
      this._completed = this._checkbox.checked;
    });
  }

  getView() {
    // clone from template
    const template = document.querySelector(this._selector);
    const element = template.content.querySelector(".todo").cloneNode(true);

    const nameEl = element.querySelector(".todo__name");
    const checkbox = element.querySelector(".todo__completed");
    const label = element.querySelector(".todo__label");
    const dateEl = element.querySelector(".todo__date");
    const deleteBtn = element.querySelector(".todo__delete-btn");

    // Fill the cloned todo with its actual data
    nameEl.textContent = this._name;
    checkbox.checked = this._completed;

    // If we have an id, connect the label and checkbox together

    if (this._id) {
      const idString = `todo-${this._id}`;
      checkbox.id = idString;
      label.setAttribute("for", idString);
    }

    // If a date exists and is valid, show it as "Due: Oct 27, 2025"
    if (this._date && !isNaN(this._date)) {
      dateEl.textContent = `Due: ${this._date.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    } else {
      // Otherwise leave blank
      dateEl.textContent = "";
    }

    // save refs
    this._element = element;
    this._nameEl = nameEl;
    this._checkbox = checkbox;
    this._label = label;
    this._dateEl = dateEl;
    this._deleteBtn = deleteBtn;

    // listeners (delete & checkbox toggle)
    this._setEventListeners();

    // Finally, return the complete <li> element

    return this._element;
  }
}
