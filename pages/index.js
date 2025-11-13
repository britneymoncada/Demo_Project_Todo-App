import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

// ==================================================
// DOM SELECTORS
// ==================================================
const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupSelector = "#add-todo-popup";
const todosListSelector = ".todos__list";

// ==================================================
// VALIDATION SETUP
// ==================================================
const addTodoForm = document.querySelector(
  `${addTodoPopupSelector} .popup__form`
);

const addTodoValidator = new FormValidator(validationConfig, addTodoForm);
addTodoValidator.enableValidation();

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

// ==================================================
// SECTION (handles render and adding)
// ==================================================
const todoSection = new Section({
  items: initialTodos,
  containerSelector: todosListSelector,
  renderer: (item) => {
    const todo = new Todo(item, "#todo-template", {
      onToggle: (isNowCompleted, wasCompleted) => {
        if (isNowCompleted && !wasCompleted) todoCounter.updateCompleted(true);
        else if (!isNowCompleted && wasCompleted)
          todoCounter.updateCompleted(false);
      },
      onDelete: (wasCompleted) => {
        todoCounter.updateTotal(false);
        if (wasCompleted) todoCounter.updateCompleted(false);
      },
    });
    const todoElement = todo.getView();
    todoSection.addItem(todoElement);
  },
});
todoSection.renderItems();

const popupAddTodo = new PopupWithForm(addTodoPopupSelector, (formData) => {
  const values = {
    id: uuidv4(),
    name: formData.name,
    date: formData.date ? new Date(formData.date) : null,
    completed: false,
  };
  const todo = new Todo(values, "#todo-template", {
    onToggle: (isNowCompleted, wasCompleted) => {
      if (isNowCompleted && !wasCompleted) {
        todoCounter.updateCompleted(true);
      } else if (!isNowCompleted && wasCompleted) {
        todoCounter.updateCompleted(false);
      }
    },
    onDelete: (wasCompleted) => {
      todoCounter.updateTotal(false);
      if (wasCompleted) {
        todoCounter.updateCompleted(false);
      }
    },
  });

  const todoElement = todo.getView();
  todoSection.addItem(todoElement);

  addTodoValidator.resetValidation();
  todoCounter.updateTotal(true);

  popupAddTodo.close();
});

popupAddTodo.setEventListeners();

// ==================================================
// EVENT LISTENERS
// ==================================================
addTodoButton.addEventListener("click", () => popupAddTodo.open());
