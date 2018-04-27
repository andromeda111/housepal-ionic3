import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { UserService } from './user.service';
import { Subject } from 'rxjs/Subject';
import { ErrorService } from './error.service';
import { ImageService } from './image.service';

@Injectable()
export class HouseService {

    menuDataSubject = new Subject<any>();

    _house: any = {};
    _roommates: any[] = [];
    // Note to self: do I actually / Should I / even store these?
    get house() {
        return this._house;
    }

    get roommates() {
        return this._roommates;
    }

    constructor(private http: HttpClient, private userService: UserService, private errorService: ErrorService, private imageService: ImageService) { }

    createHouse(houseName, houseCode) {
        const newHouse = { houseName, houseCode };
        return this.http.post('https://housepal-server.herokuapp.com/houses/create', newHouse)
            .catch(err => {
                this.errorService.handleError(err);
                return Observable.of();
            })
            .do((res: any) => {
                this.userService.userHouseID = res.houseID;
            });
    }

    joinHouse(houseName, houseCode) {
        const house = { houseName, houseCode };
        return this.http.post('https://housepal-server.herokuapp.com/houses/join', house)
            .catch(err => {
                err.type = 'notice';
                this.errorService.handleError(err);
                return Observable.of();
            })
            .do((res: any) => {
                this.userService.userHouseID = res.houseID;
            });
    }

    getHouse() {
        return this.http.get(`https://housepal-server.herokuapp.com/houses/id/${this.userService.userHouseID}`)
            .catch(err => {
                if (!err.error.message) {
                    err.error = { message: 'There was an error retrieving the house data. Please sign out and try reloading the app.' };
                }
                this.errorService.handleError(err);
                return Observable.of();
            })
            .do((res: any[]) => this._house = res);
    }

    getRoommates() {
        return this.http.get(`https://housepal-server.herokuapp.com/users/roommates/${this.userService.userHouseID}`)
            .catch(err => {
                if (!err.error.message) {
                    err.error = { message: 'There was an error retrieving the list of roommates. Please sign out and try reloading the app.' };
                }
                this.errorService.handleError(err);
                return Observable.of();
            })
            .map((res: any[]) => {
                this._roommates = this.setRoommateProfileImageUrls(res);
                return this._roommates;
            });
    }

    removeRoommate(roommate) {
        return this.http.post('https://housepal-server.herokuapp.com/users/remove-roommate', roommate)
            .catch(err => {
                err.type = 'notice';
                this.errorService.handleError(err);
                return Observable.of();
            })
            .map((res: any[]) => {
                this._roommates = this.setRoommateProfileImageUrls(res);              
                return this._roommates;
            });
    }

    leaveHouse() {
        return this.http.post('https://housepal-server.herokuapp.com/users/leave', { houseID: this.userService.activeUser.houseID })
            .catch(err => {
                this.errorService.handleError(err);
                return Observable.of();
            })
            .switchMap(() => this.userService.retrieveCurrentUserData())
            .do(() => console.log('updated active usr', this.userService.activeUser));
    }

    updateMenuData() {
        if (!this.userService.userHouseID) {
            console.error('No House ID')
            return;
        }

        Observable.forkJoin([
            this.getHouse(),
            this.getRoommates(),
            this.userService.retrieveCurrentUserData()
        ])
            .do(result => this.menuDataSubject.next(result))
            .subscribe();
    }


    /*==============
        Utility
    ================*/
    setRoommateProfileImageUrls(roommates: any[]) {
        return roommates.map((roommate: any) => {
            this.imageService.getProfileImageUrl(roommate.uid).then(url => {
                roommate.profileImageUrl = url;
            });
            
            return roommate;
        })
    }
}
