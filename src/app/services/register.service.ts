import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private baseUrl = 'https://www.pinterest-clone.somee.com/api/Register';
  //private baseUrl = 'https://localhost:7130/api/Register';

  constructor(private http: HttpClient) { }

  registerUser(email: string, birthday: Date, pass: string): Observable<any> {
    const body = {
      email,      
      pass,
      birthday
    }
    return this.http.post(this.baseUrl, body);
  }
}
