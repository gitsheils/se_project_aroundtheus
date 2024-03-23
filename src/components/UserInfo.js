export class UserInfo {
  constructor(name, job, avatar) {
    this.name = name;
    this.job = job;

    this.avatar = avatar;
  }
  getUserInfo() {
    return {
      name: this.name.textContent,
      about: this.job.textContent,
    };
  }
  setUserInfo({ name, about, avatar }) {
    this.name.textContent = name;
    this.job.textContent = about;

    this.avatar.src = avatar;
  }
}
