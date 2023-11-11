import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Route } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss']
})
export class DropdownMenuComponent {
  isOpen: boolean = false;

  constructor(public authService: AuthService) {}

  toggleDropdown() {
    this.isOpen = !this.isOpen;    
  }

}
