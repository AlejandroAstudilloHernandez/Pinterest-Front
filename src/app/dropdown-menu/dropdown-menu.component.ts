import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Route } from '@angular/router';

@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss']
})
export class DropdownMenuComponent {
  isOpen: boolean = false;

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }
}
