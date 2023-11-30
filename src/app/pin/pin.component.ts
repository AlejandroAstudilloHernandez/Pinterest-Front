import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PinService } from '../services/pin.service';
import { PinModel } from '../models/pin.model';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ProfileService } from '../services/profile.service';
import { CommentModel } from '../models/comment.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.scss']
})

export class PinComponent {

  pinId: string | null = localStorage.getItem('pinIdSeleccionando');
  pin: PinModel | null = null;
  url: string = '';
  profilePhoto: SafeUrl = '';
  base64: Uint8Array | string = '';
  Title: string = "";
  Description: string = "";
  AltText: string = "";
  Link: string = "";
  UserId: string = "";
  ImageUrl: string = "";
  SensitiveContent: boolean = false;
  profilePhotoURL: SafeUrl = '';
  comment: string = "";

  likes = 0;
  isLiked = false;

  toggleLike() {
    this.likes += this.isLiked ? -1 : 1;
    this.isLiked = !this.isLiked;
  }

  onCommentInput(event: Event | null): void {
    if (event && event.target instanceof HTMLInputElement) {
      const value = event.target.value;
      this.comment = value;
      
    }
  }

  recargarPagina(): void {
    // Recargar la página sin volver a la página de inicio
    window.location.reload();
  }
  

  commentsPin: CommentModel[] = [];

  constructor(private profile: ProfileService,private pinService: PinService, private route: ActivatedRoute, private sanitizer: DomSanitizer) {}


  imgUrl: SafeUrl = '';
  convertirImageneUsuario(): void {  
    const base64Image = localStorage.getItem('profilePhoto');
    const imageUrl = 'data:image/webp;base64,' + base64Image;
    this.imgUrl = this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }
  userId: string | null = localStorage.getItem('userId');
  OnSubmit(){
    this.pinService.postComment(this.userId, this.comment, this.pinId).subscribe(
      () =>{
        console.log("Commentario agregado con exito");
        Swal.fire({
          title: 'Comentario agregado',
          icon: 'success'
        })
        this.recargarPagina();
      }
    )
  }

  postLike() {      
    this.pinService.putLike(this.pinId).subscribe(() => {
      this.pinService.getLikes(this.pinId).subscribe(
        (response: any)=>{
          this.likes = response;
        }
      )
      this.isLiked = true;
    });
  }
  
  deleteLike() {
  
    this.pinService.deleteLike(this.pinId).subscribe(() => {
      this.likes -= 1;
      this.isLiked = false;
    });
  }

  ngOnInit() {
    this.convertirImageneUsuario();
    this.pinService.getPin(this.pinId).subscribe(
      (response: any) => {
        // Asignar la respuesta al objeto pin
        this.pin = response;
        this.UserId = response.userId;
        this.getProfile();

        // Llamar a los métodos para convertir la imagen y guardar datos
        this.convertirImagen();
       
        this.guardarDatos();
      },
      (error) => {
        console.error('Error al obtener el pin:', error);
      }
    );    

    this.pinService.getComments(this.pinId)  .subscribe(
      (response: any) => {
        this.commentsPin = response;
        this.convertirFotosPerfilComentarioURL();
      }
    )

    this.pinService.getLikes(this.pinId).subscribe(
      (response: any)=>{
        this.likes = response;
      }
    )
  }

  convertirFotosPerfilComentarioURL(): void {
    if (this.commentsPin != null) {
      this.commentsPin.forEach(comment => {
        const base64Image = comment.profilePhoto; // Supongamos que 'profilePhoto' es un Uint8Array
        
        // Verifica que 'profilePhoto' no sea undefined o nulo antes de construir la URL
        if (base64Image !== undefined && base64Image !== null) {
          const imageUrl = 'data:image/webp;base64,' + base64Image;
          comment.profilePhotoURL = this.sanitizer.bypassSecurityTrustUrl(imageUrl);
        }
      });      
    }
  }

  getProfile(){
    this.profile.profile(this.UserId).subscribe(
      (response: any) => {
        this.base64 = response.profilePhoto;  
        this.base64 = response.profilePhoto;  
        this.convertirImageneUsuarioURL();
      },
      (error) => {
        console.log("usuario no encontrado");
      }
    );
    
  }

  
  convertirImageneUsuarioURL(): void {  
    const base64Image = this.base64;
    const imageUrl = 'data:image/webp;base64,' + base64Image;
    this.profilePhoto = this.sanitizer.bypassSecurityTrustUrl(imageUrl);
    
  }
  convertirImagen() {
    
    if (this.pin && this.pin.image) {
      
      const base64Image = this.pin.image;
      const imageUrl = 'data:image/webp;base64,' + base64Image;
      this.url = imageUrl;
    }
  }

  guardarDatos() {
    if (this.pin) {
      this.Title = this.pin.title || "";
      this.Description = this.pin.description || "";
      this.AltText = this.pin.altText || "";
      this.Link = this.pin.link || "";
      this.ImageUrl = this.pin.imageUrl || "";
      this.SensitiveContent = this.pin.sensitiveContent || false;
    }
  }
}
