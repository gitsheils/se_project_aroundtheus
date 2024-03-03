export class UserInfo {
  constructor(name, job) {
    this.name = name;
    this.job = job;
  }
  getUserInfo() {
    return {
      name: this.name.textContent,
      about: this.job.textContent,
    };
  }
  setUserInfo({ name, about }) {
    this.name.textContent = name;
    this.job.textContent = about;
  }
}
