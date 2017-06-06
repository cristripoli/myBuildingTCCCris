import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import { User } from '../model/user';
import { UserService } from '../services/userService';
import { SettingsEnum } from '../enum/settingsEnum';
import { UtilService } from '../services/utilService';

/*
  Generated class for the CategoryProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserProvider{

  private apiUserUrl:string;
  private user: User;

  constructor(private userService: UserService, public http: Http) {
        this.apiUserUrl = UtilService.getEnumString(SettingsEnum, SettingsEnum.USER_URL);
        console.log('Hello UserProvider Provider');
  }

  public getUserById(id: number){
         console.log("Get user by Id");
         this.user = new User(null,"","",null,null);
            let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
            let options = new RequestOptions({ headers: headers });
            return this.http.get(this.apiUserUrl + "/" + id ).map(res => res.json());       
 }

public fillUser(data: any){
    console.log("data: " + data);
    this.user =  this.userService.convertDataToUser(data);
    console.log("user: " +  this.user);        
} 

getUser() : User{
    return this.user;
}
setUser(user: User){
    this.user= user;
}
}
