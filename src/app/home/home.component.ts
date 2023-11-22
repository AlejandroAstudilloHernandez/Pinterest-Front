import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from '../services/home.service';
import { HomePin } from '../models/home.model';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../services/auth.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {

  homePins: HomePin[] = []; // Supongamos que tienes una propiedad pins con la lista de pines
  error = '';
  public imageLoadError = false;

  constructor(private authService: AuthService, private router: Router, private homeService: HomeService, private sanitizer: DomSanitizer, private cdr: ChangeDetectorRef){}

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


  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigateByUrl('./login');
    }

    this.homeService.home().subscribe(
      (response: any[]) => {
        this.homePins = response;
        
        // Mezcla el orden de los pines de manera aleatoria
        this.homePins = this.shuffleArray(this.homePins);
        
        console.log(response);
        this.convertirImagenesURL();
      },
      (error) => {
        this.error = 'Error al solicitar Pins';
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
