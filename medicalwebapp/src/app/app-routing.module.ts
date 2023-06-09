import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MedicinesComponent } from './medicines/medicines.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [{
  path: "home", component: HomeComponent,
}, {
  path: "", redirectTo: "home", pathMatch: 'full'
}, {
  path: 'medicine', component: MedicinesComponent
},{
  path:"login",component:LoginComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
