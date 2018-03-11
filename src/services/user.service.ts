import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class UserService {

    activeUser: any = {};

    get getActiveUser() {
        return this.activeUser;
    }

    get userHouseId() {
        return this.activeUser.house_id;
    }

    constructor(private http: HttpClient) { }

    // setCurrentUser() {
    //     let getCurrentUserData = new Promise(resolve => {
    //         this.http.get('https://housepal-server.herokuapp.com/users/signin').subscribe(result => {
    //             const userData = result[0];
    //             resolve(userData);
    //         });
    //     }).catch(err => console.log(err));

    //     return getCurrentUserData.then(userData => {
    //         this.activeUser = userData;
    //     });
    // }

    setActiveUser(userData) {
        this.activeUser = userData;
        // TODO: Need to save active user in localstorage? Or check on signin if user data exists during onAuthStateChange check.
    }

    setHouseID(id) {
        this.activeUser.house_id = id;
    }
}
