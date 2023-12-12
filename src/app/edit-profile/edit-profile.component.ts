import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent {

  constructor(private router: Router,private authService: AuthService, private settings: SettingsService){}  


  imageUrl: string | null = null;
  error = "";

  //Datos de formulario create pin
  image: File | undefined;
  name: string = "";
  lastname: string = "";
  description: string | null = null;
  website: string = "";
  username: string = "";
  userIdString: string | null = localStorage.getItem('userId');
  userId: number = this.userIdString ? parseInt(this.userIdString, 10) : 0;
  

  onFileSelected(event: any): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp', 'image/gif'];
    if(file && allowedTypes.includes(file.type)) {
      const reader = new FileReader();
      console.log('Nombre del archivo:', file.name);
      console.log('Tipo de archivo:', file.type);
      console.log('Tamaño del archivo:', file.size);
      reader.onload = () => {
        this.image = file;
        this.imageUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  OnSubmit() {
    if (!this.image || !this.name || !this.lastname || !this.description || !this.website || !this.username) {
      this.error = 'Por favor llenar todos los campos';
      return;
    }

    this.settings.editProfile(this.userId, this.image,this.name,this.lastname,this.description,this.website,this.username).subscribe(
      (response) =>{
        console.log('Perfil actualizado con exito.', response); 
      },
      (error) => {
        console.error('Problema al actualizar perfil.', error);      
      }
    )
    
  }

}
