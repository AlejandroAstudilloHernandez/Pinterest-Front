import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from '../services/home.service';
import { HomePin } from '../models/home.model';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ProfileService } from '../services/profile.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-saved-pins',
  templateUrl: './saved-pins.component.html',
  styleUrls: ['./saved-pins.component.scss']
})
export class SavedPinsComponent {

  savedPins: HomePin[] = []; // Supongamos que tienes una propiedad pins con la lista de pines
  error = '';
  public imageLoadError = false;
  userId: string | null = localStorage.getItem('userId');

  constructor(private profile: ProfileService,private authService: AuthService, private router: Router, private homeService: HomeService, private sanitizer: DomSanitizer, private cdr: ChangeDetectorRef){}

  convertirImagenesURL(): void {
    if (this.savedPins) {
      this.savedPins.forEach(pin => {
        
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

  guardarPinId(pin: any): void {
    const pinId = pin.pinId;    
    localStorage.setItem('pinIdSeleccionando', pinId);
    
    // Puedes esperar un breve período o utilizar alguna lógica para garantizar que getItem se llame después de que setItem se haya completado.
    setTimeout(() => {
      this.router.navigateByUrl('/pin');
    }, 1000); // Por ejemplo, espera 1 segundo antes de obtener el valor
    
  }

  ngOnInit() {
    this.profile.savedPins(this.userId).subscribe(
      (response: any[]) => {
        this.savedPins = response;                
        
        this.convertirImagenesURL();
      },
      (error) => {
        this.error = 'Error al solicitar Pins';
      }
    );    
  }

}
