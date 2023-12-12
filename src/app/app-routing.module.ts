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
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { SettingsComponent } from './settings/settings.component';

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
  {path: "account-settings", component: AccountSettingsComponent},
  {path: "edit-profile", component: EditProfileComponent},
  {path: "settings", component: SettingsComponent},
  {path: "**", component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
