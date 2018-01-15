import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class UserService {

    public activeUser: any = {};

    public get getActiveUser() {
        return this.activeUser;
    }

    public get userHouseId() {
        return this.activeUser.house_id;
    }

    constructor(public http: HttpClient) {}

    public setCurrentUser() {  
        return new Promise(resolve => {
            this.http.get('https://housepal-server.herokuapp.com/users/current').subscribe(result => {
                this.activeUser = result[0];
                console.log('activeUser set');
       
                resolve();
            });
        });
      }
}