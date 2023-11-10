import { Component, ElementRef, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Route } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  ngOnInit() {
    const toggleButton = this.elementRef.nativeElement.querySelector('#toggleMenu');
    const menuContainer = this.elementRef.nativeElement.querySelector('#menuContainer');
    
    this.renderer.listen(toggleButton, 'click', () => {
      this.renderer.addClass(menuContainer, 'hidden');
    });
  }
  

}
