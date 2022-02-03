import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  /*
  | -------------------------------------------------------------------
  |  Create API_URL in environment.ts
  */
  apiUrl = environment.API_URL;

  constructor() { }

  randomUniq(lenght: number) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < lenght; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }

  setHttpOptions(auth: {username: string, password: string}) {
    return {headers: new HttpHeaders({
      'Content-Type':  'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(`${auth.username}:${auth.password}`)
    })}
  }
}
