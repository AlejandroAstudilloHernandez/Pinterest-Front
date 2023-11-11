import { Component, ElementRef, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Route } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private renderer: Renderer2, private elementRef: ElementRef, public authService: AuthService) {}

  ngOnInit() {

    if(this.authService.isAuthenticated()){
      const toggleButton = this.elementRef.nativeElement.querySelector('#toggleMenu');
      const menuContainer = this.elementRef.nativeElement.querySelector('#menuContainer');
    
      this.renderer.listen(toggleButton, 'click', () => {
      this.renderer.addClass(menuContainer, 'hidden');
      });
    }
    
  }
  

}
