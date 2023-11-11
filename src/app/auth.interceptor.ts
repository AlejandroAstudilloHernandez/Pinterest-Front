import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.authService.isAuthenticated()) {
      const token = localStorage.getItem('token');
      const authReq = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });      
    }
    
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {

        if (err.status === 401) {
          this.router.navigateByUrl('/login');
        }

        return throwError( err );

      })
    );
      
    

    return next.handle(request);
  }
}
