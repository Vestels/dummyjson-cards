import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { CardfeedsService } from './services/cardfeeds.service';
import { fadeAnimation } from './animation';
import { CardeditComponent } from './cardedit/cardedit.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [fadeAnimation],
})
export class AppComponent {
  title = 'angular-modulzaro';
  constructor(
    public authService: AuthService,
    public cardService: CardfeedsService,
    public cardEditComp: CardeditComponent
  ) {}
}
