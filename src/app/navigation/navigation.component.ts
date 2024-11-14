import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { RegisterModel } from '../models/register-model';
import { CardfeedsService } from '../services/cardfeeds.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  constructor(
    public authService: AuthService,
    public route: Router,
    private cardService: CardfeedsService
  ) {
    this.currentTheme();
  }
  currentTheme() {
    let currentTheme = localStorage.getItem('currentTheme');
    if (currentTheme !== null && currentTheme === 'dark') {
      document.documentElement.setAttribute('data-bs-theme', currentTheme);
      this.cardService.badgeTheme = false;
    } else {
      localStorage.setItem('currentTheme', 'light');
      this.cardService.badgeTheme = true;
    }
  }
  lightClickEvent() {
    document.documentElement.setAttribute('data-bs-theme', 'light');
    localStorage.setItem('currentTheme', 'light');
    this.cardService.badgeTheme = true;
  }
  darkClickEvent() {
    document.documentElement.setAttribute('data-bs-theme', 'dark');
    localStorage.setItem('currentTheme', 'dark');
    this.cardService.badgeTheme = false;
  }
  welcomeName() {
    let userInfos: RegisterModel = new RegisterModel();
    const localUser = localStorage.getItem('loggedInUser');
    if (localUser !== null) {
      userInfos = JSON.parse(localUser);
    }
    return userInfos.firstname;
  }
}
