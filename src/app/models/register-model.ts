export class RegisterModel {
  firstname: string = '';
  lastname: string = '';
  email: string = '';
  username: string = '';
  password: string = '';
  confirmpassword: string = '';

  constructor() {}

  inputReset() {
    this.firstname = '';
    this.lastname = '';
    this.email = '';
    this.username = '';
    this.password = '';
    this.confirmpassword = '';
  }
}