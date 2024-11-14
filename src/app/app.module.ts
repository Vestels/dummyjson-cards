import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EntryComponent } from './entry/entry.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { CardsComponent } from './cards/cards.component';
import { CardeditComponent } from './cardedit/cardedit.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterModel } from './models/register-model';

@NgModule({
  declarations: [
    AppComponent,
    EntryComponent,
    NavigationComponent,
    FooterComponent,
    CardsComponent,
    CardeditComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
  ],
  providers: [HttpClient, RegisterComponent, CardeditComponent, EntryComponent, RegisterModel],
  bootstrap: [AppComponent],
})
export class AppModule {}
