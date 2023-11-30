import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CreatePinModel } from '../models/createPin.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private baseUrl = 'https://localhost:7130/api/';

  constructor(private http: HttpClient) { }

  profile(userId: any){
    return this.http.get(this.baseUrl+"Profiles/miniProfile/"+userId);
  }

  getprofile(userId: any){
    return this.http.get(this.baseUrl+"Profiles/"+userId);
  }

  postSavePin(pinId: any, userId: any){
    const body = {      
      userId,
      pinId
    }
    console.log(this.baseUrl+"SavePins/save", body);
    return this.http.post(this.baseUrl+"SavePins/save", body);
  }

  savedPins(userId: any): Observable<any>{
    return this.http.get(this.baseUrl+"SavePins/"+userId);
  }

  createdPins(userId: any): Observable<any>{
    return this.http.get(this.baseUrl+"CreatesPins/"+userId);
  }

}
