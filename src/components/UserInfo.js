import { profileTitle, profileSubtitle } from "../utils/constants.js";

export class UserInfo {
  constructor(obj) {
    this.name = obj.input1;
    this.job = obj.input2;
  }
  getUserInfo() {
    input1 = profileTitle.textContent;
    input2 = profileSubtitle.textContent;
    return { input1, input2 };
  }
  setUserInfo() {
    profileTitle.textContent = this.name;
    profileSubtitle.textContent = this.job;
  }
}
