import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import { DropdownMenuComponent } from './dropdown-menu/dropdown-menu.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: "register", component: RegisterComponent},
  {path: "header", component: HeaderComponent},
  {path: "dropdown-menu", component: DropdownMenuComponent},
  {path: "login", component: LoginComponent},
  {path: "home", component: HomeComponent},
  {path: "**", component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
