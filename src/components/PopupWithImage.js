import Popup from "../components/Popup.js";
export class PopupWithImage extends Popup {
  constructor(popupSelector, modalImage, modalTitle) {
    super(popupSelector);
    this._modalImage = modalImage;
    this._modalTitle = modalTitle;
  }

  open(data) {
    this._modalTitle.textContent = data.title;
    this._modalImage.src = data.link;
    this._modalImage.alt = `photo of ${data.title}`;
    super.open();
    /*
    cardModalTitle.textContent = data.title;
    cardModalImage.src = data.link;
    cardModalImage.alt = `photo of ${data.title}`;
    super.open();
    */
  }
}
