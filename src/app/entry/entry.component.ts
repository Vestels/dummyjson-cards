import { Component } from '@angular/core';
import { LoginModel } from '../models/login-model';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrl: './entry.component.scss',
})
export class EntryComponent {
  validation: boolean = true;
  userLogin: LoginModel = new LoginModel();
  constructor(private route: Router, private authService: AuthService) {
  let isThereAny = localStorage.getItem('loggedInUser')
    if (isThereAny !== null) {
      localStorage.removeItem('loggedInUser')
    }
  }

  onLogin() {
    const localUsers = localStorage.getItem('registeredUsers');
    if (localUsers !== null) {
      const users = JSON.parse(localUsers);
      const ifUserExist = users.find(
        (x: LoginModel) =>
          x.username === this.userLogin.username &&
          x.password === this.userLogin.password
      );
      if (ifUserExist !== undefined) {
        localStorage.setItem('loggedInUser', JSON.stringify(ifUserExist));
        this.route.navigate(['cards']);
      } else {
        this.validation = false;
        this.userLogin.inputReset();
      }
    } else {
      this.validation = false;
      this.userLogin.inputReset();
    }
    this.authService.keepLoggedIn();
  }
  buttonDisabled() {
    return (
      this.userLogin.username.length < 4 || this.userLogin.password.length < 4
    );
  }
  keepLoginStatus() {
    let currentStatus = localStorage.getItem('keepLoggedIn');
    if (currentStatus === 'true') {
      localStorage.setItem('keepLoggedIn', 'false');
    } else {
      localStorage.setItem('keepLoggedIn', 'true');
    }
  }
}
