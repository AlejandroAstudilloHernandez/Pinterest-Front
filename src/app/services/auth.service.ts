import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'https://www.pinterest-clone.somee.com/api/Logins/login';
  private isLoggedIn = false;

  constructor(private jwtHelper: JwtHelperService, private http: HttpClient) {
    // Recuperar el estado de isLoggedIn desde localStorage al iniciar la aplicación
    this.isLoggedIn = localStorage.getItem('IsLoggedIn') === 'true';
  }
  

  login(email: string, pass: string): Observable<any> {
    const body = {
      email,
      pass
    }
    return this.http.post(this.baseUrl, body).pipe(
      tap(() => {
        // Actualiza el estado isLoggedIn a true después de una autenticación exitosa
        this.isLoggedIn = true;
        localStorage.setItem('IsLoggedIn', 'true');
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('profilePhoto');
    this.isLoggedIn = false;
    localStorage.setItem('IsLoggedIn', 'false');
    // Redirige al usuario a la página de inicio de sesión o a la página principal
    window.location.href = '/login';    
  }

  isAuthenticated(): boolean {    
    return this.isLoggedIn;
  }
}

