import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private baseUrl = 'https://www.pinterest-clone.somee.com/api/HomesPins';

  constructor(private http: HttpClient) { }

  home(): Observable<any>{
    return this.http.get(this.baseUrl);
  }
}
