export class LoginModel {
  username: string = '';
  password: string = '';

  constructor() {}

  inputReset() {
    this.username = '';
    this.password = '';
  }
}
