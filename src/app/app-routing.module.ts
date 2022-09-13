import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardsComponent } from './cards/cards.component';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [{ path: "", component: HomePageComponent}, { path: "dates-bac", component: CardsComponent} ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
