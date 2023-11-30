import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ProfileService } from '../services/profile.service';
import { MiniProfile } from '../models/miniProfile.model';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss']
})
export class DropdownMenuComponent {
  isOpen: boolean = false;

  constructor(private router: Router,public authService: AuthService, private profile: ProfileService, private sanitizer: DomSanitizer, private cdr: ChangeDetectorRef) {}

  toggleDropdown() {
    this.isOpen = !this.isOpen;    
  }
  userId: string | null = localStorage.getItem('userId');
  miniProfile: MiniProfile[] = [];
  error = '';
  imgUrl: SafeUrl = '';
  username: string | null = localStorage.getItem('userName');
  email: string | null = localStorage.getItem('email');

  convertirImageneUsuarioURL(): void {  
      const base64Image = localStorage.getItem('profilePhoto');
      const imageUrl = 'data:image/webp;base64,' + base64Image;
      this.imgUrl = this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }
  ngOnInit(){
    this.convertirImageneUsuarioURL();
  }

  OnProfile(){
    this.router.navigateByUrl('./profile');
  }

}
