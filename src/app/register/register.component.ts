import { Component } from '@angular/core';
import { RegisterModel } from '../models/register-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  userObject: RegisterModel = new RegisterModel();
  hungarianLetters = /[^A-ZÁÉÚŐÓÜÖÍa-záéúőóüöí]/;
  emailCharacters = /[ `!#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/;
  userNameCharacters = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/;
  accentedLetters = /[ÁÉÚŐÓÜÖÍáéúőóüöí]/;
  alreadyRegistered: boolean = false;
  constructor(public route: Router, private regModel: RegisterModel ) { }

  onRegister() {
    // debugger;
    const localUser = localStorage.getItem('registeredUsers');    
    if (localUser != null) {
      const users = JSON.parse(localUser);
      let contain = users.some((x: any) => x.email === this.userObject.email);
      console.log(contain);
        if (contain) {
          this.alreadyRegistered = true
          this.userObject = new RegisterModel
        } else {
          this.route.navigate(['/entry']);
          users.push(this.userObject);
          localStorage.setItem('registeredUsers', JSON.stringify(users));
        }
    } else {
      const users = [];
      users.push(this.userObject);
      localStorage.setItem('registeredUsers', JSON.stringify(users));
      this.route.navigate(['/entry']);
    }
  }
  nameValidation() {
    return (
      this.hungarianLetters.test(this.userObject.lastname) ||
      this.hungarianLetters.test(this.userObject.firstname) ||
      this.userObject.lastname.length < 4 ||
      this.userObject.firstname.length < 4
    );
  }
  emailValidation() {
    return (
      this.accentedLetters.test(this.userObject.email) ||
      this.emailCharacters.test(this.userObject.email)
    );
  }
  emailIncludes() {
    const condition1 = '@';
    const condition2 = '.hu';
    const condition3 = '.com';
    return (
      (this.userObject.email.includes(condition1) &&
        this.userObject.email.includes(condition2)) ||
      this.userObject.email.includes(condition3)
    );
  }
  usernameValidation() {
    return (
      this.userObject.username.length < 5 ||
      this.userNameCharacters.test(this.userObject.username) ||
      this.accentedLetters.test(this.userObject.username)
    );
  }
  passwordValidation() {
    return this.userObject.password !== this.userObject.confirmpassword;
  }
  lenghtPassword() {
    return (
      this.userObject.password.length < 8 ||
      this.userObject.confirmpassword.length < 8
    );
  }
}
