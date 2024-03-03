import Popup from "../components/Popup.js";
import {
  modalCard,
  cardModalImage,
  cardModalTitle,
} from "../utils/constants.js";
export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(data) {
    cardModalTitle.textContent = data.title;
    cardModalImage.src = data.link;
    cardModalImage.alt = `photo of ${data.title}`;
    super.open();
  }
}
