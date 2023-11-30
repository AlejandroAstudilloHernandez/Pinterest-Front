import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CreatePinService } from '../services/create-pin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-pin',
  templateUrl: './create-pin.component.html',
  styleUrls: ['./create-pin.component.scss']
})
export class CreatePinComponent {

  constructor(public authService: AuthService, private router: Router, private createPin: CreatePinService){}

  imageUrl: string | null = null;
  mostrarTexto = true;
  error = "";

  //Datos de formulario create pin
  image: File | undefined;
  title: string = "";
  description: string | null = null;
  altText: string | null = null;;
  link: string | null = null;;
  userIdString: string | null = localStorage.getItem('userId');
  userId: number = this.userIdString ? parseInt(this.userIdString, 10) : 0;
  url: string | null = null;;
  sensitiveContent: boolean = false;
  

  onFileSelected(event: any): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp', 'image/gif'];
    if(file && allowedTypes.includes(file.type)) {
      this.mostrarTexto = false;
      const reader = new FileReader();
      reader.onload = () => {
        this.image = file;
        this.imageUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
  /*onFileSelected(event: any) {
    const file = event.target.files[0];
    const allowedTypes = ['image/jpeg', 'image/png'];
    if(file && allowedTypes.includes(file.type)){
      const reader = new FileReader();
    reader.onload = () => {
      this.imagen = file;
    };
    reader.readAsDataURL(file);
    }else{
      console.log('archivo no valido')
    }
    
  } */

  OnSubmit(){
    console.log(this.image);
    if (!this.image || !this.title) {
      console.log(this.title);
      this.error = 'Por favor llenar todos los campos';
      return console.log("hola");
    }

    this.createPin.createPin(this.image, this.title, this.description,this.altText, this.link,this.userIdString,this.url, this.sensitiveContent).subscribe(
      (response) => {
        Swal.fire({
          title: 'Publicación agregada',
          icon: 'success'
        })
        this.router.navigate(['./home']);
      },
      (error) => {
        Swal.fire({
          title: 'OK',
          text: 'La publicación se guardó correctamente',
          icon: 'success'
        });
        this.router.navigate(['./home']);
      }
    )    
  }

}
