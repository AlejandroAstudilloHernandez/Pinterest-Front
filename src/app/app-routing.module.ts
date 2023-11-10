import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import { DropdownMenuComponent } from './dropdown-menu/dropdown-menu.component';

const routes: Routes = [
  {path: "register", component: RegisterComponent},
  {path: "header", component: HeaderComponent},
  {path: "dropdown-menu", component: DropdownMenuComponent},
  {path: "**", component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
