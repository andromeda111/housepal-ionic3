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

    public async setCurrentUser() {  

        let getCurrentUserData = new Promise(resolve => {      
            this.http.get('https://housepal-server.herokuapp.com/users/current').subscribe(result => {
                const userData = result[0];
                resolve(userData);
            })
        }).catch(err => console.log(err));

        await getCurrentUserData.then(userData => {
            this.activeUser = userData;
        })

        return;
    }

}
