import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pinterest-front';

  constructor(private authService: AuthService, private router: Router){}

  ngOnInit() {
    this.checkSession();
  }

  checkSession() {
    if (this.authService.isAuthenticated()) {
      // Redirige al usuario a la página de inicio de sesión si no está autenticado      
      this.router.navigate(['/home']);
    }
  }
}
