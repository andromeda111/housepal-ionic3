import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user.model';
import { ErrorService } from './error.service';
import { ImageService } from './image.service';

@Injectable()
export class UserService {

    private _activeUser: User = {
        uid: '',
        email: '',
        name: '',
        houseID: null,
        deviceID: ''
    };

    // Active (current) User - Get and Set    
    get activeUser() {
        return this._activeUser;
    }

    set activeUser(userData) { // Add interface
        this._activeUser = userData;
    }

    // User House ID - Get and Set
    get userHouseID() {
        return this.activeUser.houseID;
    }

    set userHouseID(id) {
        this._activeUser.houseID = id;
    }

    constructor(private http: HttpClient, private errorService: ErrorService, private imageService: ImageService) { }

    retrieveCurrentUserData() {
        return this.http.get('https://housepal-server.herokuapp.com/users/current')
            .catch(err => {
                this.errorService.handleError(err);
                return Observable.of();
            })
            .do((res: User) => {
                this._activeUser = res;
                this.imageService.getProfileImageUrl(this._activeUser.uid);
            });
    }

    clearActiveUser() {
        this._activeUser = {
            uid: '',
            name: '',
            email: '',
            houseID: null,
            deviceID: ''
        };
    }
}
