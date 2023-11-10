import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Route } from '@angular/router';
import { RegisterService } from '../register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  
  email = '';    
  pass = '';
  birthday: Date | null = null;
  confirmPass = '';
  error = '';

  validarContrasena(contrasena: string): boolean {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    return regex.test(contrasena);
  }
  validarContrasenas(): boolean {
    return this.pass === this.confirmPass;
  }  
  validarEmail(email: string): boolean {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }

  constructor(private registerService: RegisterService) {}

  OnSubmit() {
    if (!this.email || !this.birthday || !this.pass || !this.confirmPass) {
      this.error = 'Por favor llenar todos los campos';
      return;
    }
    if (!this.validarContrasena(this.pass)) {
      this.error = 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial';
      return;
    }
    if (!this.validarContrasenas()) {
      this.error = 'Las contraseñas no coinciden';
      return;
    }
    if (!this.validarEmail(this.email)) {
      this.error = 'Por favor ingrese un correo electrónico válido';
      return;
    }

    this.registerService.registerUser(this.email, this.birthday, this.pass).subscribe(
      (response) => {
        console.log('Registro exitoso:', response);        
      },
      (error) => {
        console.error('Error al registrar usuario:', error);      
      }
    );
  }

}
 