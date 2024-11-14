import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CardfeedsService } from '../services/cardfeeds.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  constructor(public authService: AuthService, public cardService: CardfeedsService) {}
}
