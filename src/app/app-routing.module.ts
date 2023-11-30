import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import { DropdownMenuComponent } from './dropdown-menu/dropdown-menu.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CreatePinComponent } from './create-pin/create-pin.component';
import { PinComponent } from './pin/pin.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {path: "register", component: RegisterComponent},
  {path: "header", component: HeaderComponent},
  {path: "dropdown-menu", component: DropdownMenuComponent},
  {path: "login", component: LoginComponent},
  {path: "home", component: HomeComponent},
  {path: "create", component: CreatePinComponent},
  {path: "pin", component: PinComponent},
  {path: "profile", component: ProfileComponent},  
  {path: "search", component: SearchComponent},
  {path: "**", component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
