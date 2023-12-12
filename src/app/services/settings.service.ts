import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CreatePinModel } from '../models/createPin.model';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  //private baseUrl = 'https://www.pinterest-clone.somee.com/api/';
  private baseUrl = 'https://localhost:7130/api/';

  constructor(private http: HttpClient) { }

  editProfile(
    userId: any,
    profilePhoto: File,
    Name: string,
    Lastname: string,
    Information: string,
    WebSite: string,
    Username: string
  ) {
    const formData = new FormData();
    formData.append('ProfilePhoto', profilePhoto);
    formData.append('Name', Name);
    formData.append('Lastname', Lastname);
    formData.append('Information', Information);
    formData.append('WebSite', WebSite);
    formData.append('Username', Username);    
  
    return this.http.put(`${this.baseUrl}EditProfiles/${userId}`, formData);
  }

  getUser(userId: any){
    return this.http.get(`${this.baseUrl}Users/${userId}`);
  }

  accountManagement(userId: any, Email: any, Pass: any, Birthday: any){
    const formData = new FormData();
    formData.append('Email', Email);
    formData.append('Pass', Pass);
    formData.append('Birthday', Birthday);
    console.log(Email);
    console.log(Pass);
    console.log(Birthday);

    return this.http.put(`${this.baseUrl}AccountManagements/${userId}`,formData)
  }

  deleteAccount(userId: any){
    return this.http.delete(`${this.baseUrl}Users/${userId}`);
  }
}
