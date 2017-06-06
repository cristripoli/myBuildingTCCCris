import {Injectable} from '@angular/core';
import { User } from '../model/user';

@Injectable()
export class UserService {

    convertDataToUser(data:any):User {
       let user: User;
       user = new User(data[0].id,data[0].name,data[0].email,data[0].id_credentials,data[0].id_city);
       console.log("Object category get: " + user.getName());

       return user
    }
  }