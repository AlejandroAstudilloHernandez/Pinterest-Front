import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CreatePinModel } from '../models/createPin.model';

@Injectable({
  providedIn: 'root'
})
export class PinService {

  private baseUrl = 'https://www.pinterest-clone.somee.com/api/';

  constructor(private http: HttpClient) { }

  getPin(pinId: any){
    return this.http.get(this.baseUrl+"SinglePins/"+pinId);
  }

  getComments(pinId: any){
    return this.http.get(this.baseUrl+"Comments/"+pinId);
  }

  postComment(userId: any, comment: string, pinId: any){
    const body ={
      userId,
      comment,
      pinId
    }

    return this.http.post(this.baseUrl+"Comments/comment",body);

  }

  getLikes(pinId: any){    
    return this.http.get(this.baseUrl+"Reactions/"+pinId);
  }

  putLike(pinId: any){
    const reactionType = 1;
    const body = {
      pinId,
      reactionType
    }  
    return this.http.put(this.baseUrl+"Reactions/add",body);
  }

  deleteLike(pinId: any){
    const reactionType = 1;
    const body = {
      pinId,
      reactionType
    }
    return this.http.put(this.baseUrl+"Reactions/remove", body);
  }
}
