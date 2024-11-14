import { Component, OnInit } from '@angular/core';
import { CardfeedsService } from '../services/cardfeeds.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cardedit',
  templateUrl: './cardedit.component.html',
  styleUrl: './cardedit.component.scss',
})
export class CardeditComponent implements OnInit {
  constructor(public cardService: CardfeedsService, public route: Router) {
    if (cardService.currentCard !== undefined) {
    } else {
      this.route.navigate(['cards']);
    }
  }
  ngOnInit(): void {
    this.cardService.footerOff = true;
  }
}
