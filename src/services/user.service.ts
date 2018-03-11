import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class UserService {

    private _activeUser: any = {};

    // Active (current) User - Get and Set    
    get activeUser() {
        return this._activeUser;
    }

    set activeUser(userData) { // Add interface
        this._activeUser = userData;
        // TODO: Need to save active user in localstorage? Or check on signin if user data exists during onAuthStateChange check.
    }

    // User House ID - Get and Set
    get userHouseID() {
        return this.activeUser.house_id;
    }

    set userHouseID(id) {
        this._activeUser.house_id = id;
    }

    constructor(private http: HttpClient) { }

    getAndSetCurrentUserData() {
        return this.http.get('https://housepal-server.herokuapp.com/users/current')
            .filter(res => res !== undefined)
            .do(res => {
                console.log('current: ', res[0]);
                this._activeUser = res[0];
            });
    }
}
