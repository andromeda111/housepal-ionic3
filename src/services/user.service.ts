import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user.model';

@Injectable()
export class UserService {

    private _activeUser: User = {
        uid: '',
        name: '',
        house_id: null,
        deviceId: ''
    };

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

    retrieveCurrentUserData() {
        return this.http.get('https://housepal-server.herokuapp.com/users/current')
            .catch(err => {
                console.error('User does not exist: ', err);
                return Observable.throw(err);
            })
            .do((res: User) => {
                console.log('current: ', res);
                this._activeUser = res;
                // logout?
            });
    }

    clearActiveUser() {
        this._activeUser = {
            uid: '',
            name: '',
            house_id: null,
            deviceId: ''
        };
    }
}
