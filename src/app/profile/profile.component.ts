import { Component, ElementRef, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  constructor(private profileService: ProfileService, private router: Router,private sanitizer: DomSanitizer, private renderer: Renderer2, private elementRef: ElementRef, public authService: AuthService) {}

  imgUrl: SafeUrl = '';
  username: string = '';
  userId: string | null = localStorage.getItem('userId');
  name: string = '';
  lastname: string = '';
  followings = 0;
  information: string = "";
  webSite: string = "";
  convertirImagenesURL(): void {  
    const base64Image = localStorage.getItem('profilePhoto');
    const imageUrl = 'data:image/webp;base64,' + base64Image;
    this.imgUrl = this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  isSelectedCreated = true;  // Por defecto, selecciona "Created"
  isSelectedSaved = false;
  isOnCreated() {
    this.isSelectedCreated = true;
    this.isSelectedSaved = false;
    // Puedes agregar lógica adicional si es necesario
  }

  isOnSaved() {
    this.isSelectedCreated = false;
    this.isSelectedSaved = true;
    // Puedes agregar lógica adicional si es necesario
  }

  ngOnInit() {
    //this.convertirImagenesURL();     
    
     this.profileService.getprofile(this.userId).subscribe(
       (profile: any) => {
         // Asigna los valores del perfil a las variables del componente
         console.log(profile);
         this.imgUrl = `data:image/jpeg;base64,${profile.profilePhoto}`; // Asumiendo que es una imagen en base64
         this.username = profile.userName;
         this.name = profile.name;
         this.lastname = profile.lastname;
         this.information = profile.information;
         this.webSite = profile.webSite;
         // Puedes asignar más propiedades del perfil según sea necesario
       },
       error => {
         console.error("Error obteniendo el perfil", error);
       }
     );
  }

}
