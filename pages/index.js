import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import { Todo } from "../components/Todo.js";
import { FormValidator } from "../components/FormValidator.js";

// ==================================================
// 🔹 3. DOM ELEMENT REFERENCES
// ==================================================
// All key elements used in this file for interaction.
// grab your Add Todo form

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopup.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

const addTodoValidator = new FormValidator(validationConfig, addTodoForm);
addTodoValidator.enableValidation();

// ==================================================
// 🔹 4. MODAL (POPUP) OPEN/CLOSE FUNCTIONS
// ==================================================
// Simple helper functions to show/hide popup modals.

const openModal = (modal) => {
  modal.classList.add("popup_visible");
};

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
};

// ==================================================
// 🔹 6. EVENT LISTENERS
// ==================================================
// Attach interactivity to buttons and form submission.

// Open popup when "+ Add Todo" button is clicked
function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_visible");
    if (openedPopup) {
      closeModal(openedPopup);
      document.removeEventListener("keydown", handleEscClose);
    }
  }
}

addTodoButton.addEventListener("click", () => {
  openModal(addTodoPopup);
  document.addEventListener("keydown", handleEscClose);
});

// Close popup when close button is clicked

addTodoCloseBtn.addEventListener("click", () => {
  closeModal(addTodoPopup);
  document.removeEventListener("keydown", handleEscClose);
});

// Handle form submission (adding new todo)

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  // "Enter" submission: stop if form is invalid
  if (!addTodoForm.checkValidity()) {
    // Optional: show errors immediately using your validator
    addTodoValidator._inputList.forEach((input) => {
      addTodoValidator._checkInputValidity(input);
    });
    return;
  }

  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;

  let date = null;
  if (dateInput) {
    date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
  }

  // to create the unique id's
  const values = { id: uuidv4(), name, date, completed: false };

  // Generate todo element from template and append to list
  const todo = new Todo(values, "#todo-template");
  const todoElement = todo.getView();
  todosList.append(todoElement);

  // reset validation and form state
  addTodoValidator.resetValidation();

  closeModal(addTodoPopup);
});

// ==================================================
// 🔹 7. INITIAL RENDERING OF PRESET TODOS
// ==================================================
// Loop through initialTodos array and display each one on load.
initialTodos.forEach((item) => {
  const todo = new Todo(item, "#todo-template");
  const todoElement = todo.getView();
  todosList.append(todoElement);
});
