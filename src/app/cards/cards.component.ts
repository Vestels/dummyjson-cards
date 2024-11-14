import { Component, OnInit } from '@angular/core';
import { CardfeedsService } from '../services/cardfeeds.service';
import { fadeAnimation } from '../animation';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss',
  animations: [fadeAnimation]
})
export class CardsComponent implements OnInit {
  constructor(public cardService: CardfeedsService) {
  }
  ngOnInit(): void {
    this.cardService.footerOff = false;
  }
}
