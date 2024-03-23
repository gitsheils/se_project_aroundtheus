export default class Section {
  constructor({ renderer }, container) {
    this._renderer = renderer;
    this._container = container;
  }
  addItem(cardElement) {
    this._container.prepend(cardElement);
  }
  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }
  setItems(items) {
    this._items = items;
  }
}

/*export default class Section {
  constructor({ data, renderer }, container) {
    this._items = data;
    this._renderer = renderer;
    this._container = container;
  }
  addItem(cardElement) {
    this._container.prepend(cardElement);
  }
  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }
}
*/
