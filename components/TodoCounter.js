export class TodoCounter {
  constructor(todos, textSelector) {
    this._el = document.querySelector(textSelector);
    this._completed = todos.filter((t) => t.completed).length;
    this._total = todos.length;
    this._updateText();
  }

  updateCompleted(increment) {
    this._completed += increment ? 1 : -1;
    this._updateText();
  }

  updateTotal(increment) {
    this._total += increment ? 1 : -1;
    this._updateText();
  }

  _updateText() {
    this._el.textContent = `Showing ${this._completed} out of ${this._total} completed`;
  }
}

export default TodoCounter;
