import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html', // La ruta al archivo HTML del componente
  styleUrls: ['login.component.scss'] // La ruta al archivo de estilos del componente
})

export class LoginComponent {

  email = '';    
  pass = '';
  error = '';
  errorInicio = '';

  validarEmail(email: string): boolean {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }

  constructor(private router: Router,private authService: AuthService){}

  OnSubmit() {
    if (!this.email || !this.pass) {
      this.error = 'Por favor llenar todos los campos';
      return;
    }
    if (!this.validarEmail(this.email)) {
      this.error = 'Por favor ingrese un correo electrónico válido';
      return;
    }
    
    //const credentials = { email: this.email, password: this.pass };

    this.authService.login(this.email, this.pass).subscribe(
      (token: string) => {
        localStorage.setItem('token', token);
        // Redirige a la página de inicio (ajusta la ruta según tu configuración)
        this.router.navigate(['/home']);
      },
      (error) => {
        this.errorInicio = 'Usuario o contraseña incorrectos';        
      }
    );
  }
}
