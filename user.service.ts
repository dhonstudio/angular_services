import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient: HttpClient,
    private globalService: GlobalService,
  ) { }

  async checkUser(db: string, table: string, auth: {username: string, password: string}, user: string, user_field_name: string): Promise<User[]> {
    let get = `${user_field_name}=${user}`
    return (await firstValueFrom(this.httpClient.get<any>(`${this.globalService.apiUrl}/${db}/${table}?${get}`, this.globalService.setHttpOptions({username:auth.username, password: auth.password})))).data;
  }

  async checkPassword(db: string, table: string, auth: {username: string, password: string}, user: string, user_field_name: string, password: string, password_field_name: string): Promise<User[]> {
    let get = `${user_field_name}=${user}&${password_field_name}=${password}`
    return (await firstValueFrom(this.httpClient.get<any>(`${this.globalService.apiUrl}/${db}/${table}/password_verify?${get}`, this.globalService.setHttpOptions({username:auth.username, password: auth.password})))).data;
  }

}
