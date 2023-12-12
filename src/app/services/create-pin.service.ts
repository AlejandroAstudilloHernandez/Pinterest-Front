import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CreatePinModel } from '../models/createPin.model';

@Injectable({
  providedIn: 'root'
})
export class CreatePinService {

  //private baseUrl = 'https://www.pinterest-clone.somee.com/api/CreatesPins/create';
  private baseUrl = 'https://localhost:7130/api/CreatesPins/create';
  

  constructor(private http: HttpClient) { }
  createPin(image: File, title: string, description: any, altText: any, link: any, userId: any, url: any, sensitiveContent: boolean){    
    var sensitiveContentString = sensitiveContent.toString();
    const formData = new FormData();
    formData.append('Image', image);
    formData.append('Title', title);
    formData.append('Description', description);
    formData.append('AltText', altText);
    formData.append('Link', link);
    formData.append('UserId', userId);
    formData.append('Url', url);
    formData.append('SensitiveContent', sensitiveContentString);    
    console.log(formData.getAll);
    console.log(this.baseUrl,formData);
    return this.http.post(this.baseUrl,formData);
  }

}
