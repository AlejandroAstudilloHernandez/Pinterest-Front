import { Component, ElementRef, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private router: Router,private sanitizer: DomSanitizer, private renderer: Renderer2, private elementRef: ElementRef, public authService: AuthService) {}
  imgUrl: SafeUrl = '';
  convertirImagenesURL(): void {  
    const base64Image = localStorage.getItem('profilePhoto');
    const imageUrl = 'data:image/webp;base64,' + base64Image;
    this.imgUrl = this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  isOnHome(): boolean {
    return this.router.url === '/home';
  }

  isOnCreate(): boolean {
    return this.router.url === '/create';
  }

  isOnProfile(){    
    return this.router.url === '/profile';
  }

  buscar: string = '';
  search(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.buscar = target.value;
    localStorage.setItem('buscar', this.buscar);
    setTimeout(() => {
      this.router.navigateByUrl('/search');
    }, 1000);
  }  


  ngOnInit() {

    this.convertirImagenesURL();

    if(this.authService.isAuthenticated()){
      const toggleButton = this.elementRef.nativeElement.querySelector('#toggleMenu');
      const menuContainer = this.elementRef.nativeElement.querySelector('#menuContainer');
    
      this.renderer.listen(toggleButton, 'click', () => {
      this.renderer.addClass(menuContainer, 'hidden');
      });
    }
    
  }
  

}
