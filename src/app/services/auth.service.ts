import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'https://localhost:7130/api/Logins/login';
  private isLoggedIn = false;

  constructor(private jwtHelper: JwtHelperService, private http: HttpClient) {}
  

  login(email: string, pass: string): Observable<any> {
    const body = {
      email,
      pass
    }
    return this.http.post(this.baseUrl, body).pipe(
      tap(() => {
        // Actualiza el estado isLoggedIn a true después de una autenticación exitosa
        this.isLoggedIn = true;
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.isLoggedIn = false;
    // Redirige al usuario a la página de inicio de sesión o a la página principal
    window.location.href = '/login';    
  }

  isAuthenticated(): boolean {    
    return this.isLoggedIn;
  }

  getLoggedInUserId(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken ? decodedToken.userId : null;
    }
    return null;
  }  
}
