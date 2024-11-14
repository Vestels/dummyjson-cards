import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntryComponent } from './entry/entry.component';
import { CardsComponent } from './cards/cards.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './services/auth.service';
import { CardeditComponent } from './cardedit/cardedit.component';

const routes: Routes = [
  { path: '', redirectTo: 'cards', pathMatch: 'full' },
  { path: 'entry', component: EntryComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'cards', component: CardsComponent, canActivate: [AuthService] },
  { path: 'editCards', component: CardeditComponent, canActivate: [AuthService] },
  { path: '**', redirectTo: 'cards', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
