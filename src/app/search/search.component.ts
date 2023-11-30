import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from '../services/home.service';
import { HomePin } from '../models/home.model';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ProfileService } from '../services/profile.service';
import { SearchService } from '../services/search.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  homePins: HomePin[] = []; // Supongamos que tienes una propiedad pins con la lista de pines
  error = '';
  public imageLoadError = false;
  userId: string | null = localStorage.getItem('userId');

  constructor(private search: SearchService,private profile: ProfileService,private authService: AuthService, private router: Router, private homeService: HomeService, private sanitizer: DomSanitizer, private cdr: ChangeDetectorRef){}

  convertirImagenesURL(): void {
    if (this.homePins) {
      this.homePins.forEach(pin => {
        
        const base64Image = pin.image;
        
        // Verifica que base64Image no sea undefined o nulo antes de construir la URL
        if (base64Image !== undefined && base64Image !== null) {
          const imageUrl = 'data:image/webp;base64,' + base64Image;
          pin.imagenURL = this.sanitizer.bypassSecurityTrustUrl(imageUrl);
        }
      });

      // Forzar la detección de cambios manualmente
      this.cdr.detectChanges();
    }
  }

  ngOnChanges(): void {
    // Lógica para manejar cambios en las propiedades de entrada
    this.buscar = localStorage.getItem('buscar');
    this.performSearch();
  }

  public performSearch(): void {
    this.search.search(this.buscar).subscribe(
      (response: any) => {
        this.homePins = response;
        this.homePins = this.shuffleArray(this.homePins);
        this.convertirImagenesURL();
      },
      (error) => {
        this.error = 'Error al solicitar Pins';
      }
    );
  }

  guardarPinId(pin: any): void {
    const pinId = pin.pinId;    
    localStorage.setItem('pinIdSeleccionando', pinId);
    
    // Puedes esperar un breve período o utilizar alguna lógica para garantizar que getItem se llame después de que setItem se haya completado.
    setTimeout(() => {
      this.router.navigateByUrl('/pin');
    }, 1000); // Por ejemplo, espera 1 segundo antes de obtener el valor
    
  }

  savePin(pin: any){
    const pinId = pin.pinId;
    this.profile.postSavePin(pinId, this.userId).subscribe(
      (response) => {
        Swal.fire({
          title: 'Publicación agregada',
          icon: 'success'
        })
      },
      (error) => {
        Swal.fire({
          title: 'Error',
          text: 'Pin ya guardado.',
          icon: 'error'
        });
      }
    )
  }


  buscar: string | null = localStorage.getItem('buscar');
  ngOnInit() {
    this.search.search(this.buscar).subscribe(
      (response: any) => {
        this.homePins = response;
        
        // Mezcla el orden de los pines de manera aleatoria
        this.homePins = this.shuffleArray(this.homePins);
        
        this.convertirImagenesURL();
      },
      (error) => {
        this.error = 'Error al solicitar Pins';
      }
    );

    this.profile.profile(this.userId).subscribe(
      (response: any) => {
        localStorage.setItem('userName', response.userName);
        localStorage.setItem('email', response.email);
        localStorage.setItem('profilePhoto', response.profilePhoto);        
      },
      (error) => {
        this.error = 'Error al cargar foto de perfil';
      }
    );
  }

  // Método para mezclar el orden de los elementos de una array
  private shuffleArray(array: any[]): any[] {
    let currentIndex = array.length;
    let temporaryValue, randomIndex;

    // Mientras haya elementos para mezclar
    while (0 !== currentIndex) {
      // Elige un elemento restante
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // Intercambia con el elemento actual
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

}
