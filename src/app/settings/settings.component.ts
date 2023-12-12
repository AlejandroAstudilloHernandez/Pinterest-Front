import { Component, ElementRef, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {


  constructor(private profileService: ProfileService, private router: Router,private sanitizer: DomSanitizer, private renderer: Renderer2, private elementRef: ElementRef, public authService: AuthService) {}

  isSelectedEditProfile = true;  // Por defecto, selecciona "Created"
  isSelectedAccountManagement = false;
  isOnEditProfile() {
    this.isSelectedEditProfile = true;
    this.isSelectedAccountManagement = false;
    // Puedes agregar lógica adicional si es necesario
  }

  isOnAccountManagement() {
    this.isSelectedEditProfile = false;
    this.isSelectedAccountManagement = true;
    // Puedes agregar lógica adicional si es necesario
  }

}
