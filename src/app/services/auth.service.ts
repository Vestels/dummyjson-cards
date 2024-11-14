import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  myTimeout: any;
  status = localStorage.setItem('keepLoggedIn', 'true');
  constructor(public route: Router) {}

  canActivate(): boolean {
    if (!this.isLoggedIn()) {
      this.route.navigate(['entry']);
      return false;
    } else {
      return true;
    }
  }
  isLoggedIn() {
    let entryStatus = localStorage.getItem('loggedInUser');
    return entryStatus !== null;
  }
  logOut() {
    localStorage.removeItem('loggedInUser');
    this.route.navigate(['entry']);
    localStorage.setItem('keepLoggedIn', 'true');
  }
  keepLoggedIn() {
    clearTimeout(this.myTimeout);
    let currentStatus = localStorage.getItem('keepLoggedIn');
    if (currentStatus === 'false') {
      this.myTimeout = setTimeout(() => {
        localStorage.removeItem('loggedInUser');
        this.route.navigate(['entry']);
      }, 600000);
    }
  }
}