import { Injectable } from '@angular/core';
import {User} from "../models/user.model";
import {AuthenticationService} from "./authentication.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export abstract class RequestBaseService {

  protected currentUser: User = new User(); //JWT token değeri için User nesnesinden ulaşacağız Extend edilen sınıflardan da erişilebilmesi için protected
  constructor(protected authenticationService: AuthenticationService, protected http: HttpClient) {
    this.authenticationService.currentUser.subscribe(data => {
      this.currentUser = data;
    })
  }

  //Http Header oluşturma
  get getHeaders(): HttpHeaders{
    return new HttpHeaders(
      {
        authorization: 'Bearer ' + this.currentUser?.token, //Kullanıcının token değerini göndereceğiz bu JWT belirtecidir.
        "Content-Type": "application/json; charset=UTF-8"
      }
    )
  }

}
