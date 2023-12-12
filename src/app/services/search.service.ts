import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CreatePinModel } from '../models/createPin.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private baseUrl = 'https://www.pinterest-clone.somee.com/api/';
  //private baseUrl = 'https://localhost:7130/api/';

  constructor(private http: HttpClient) { }

  search(buscar: any){
    return this.http.get(this.baseUrl+"Searchs/search?searchTerm="+buscar);
  }
}
