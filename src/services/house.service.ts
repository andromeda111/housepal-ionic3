import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { UserService } from './user.service';
import { Subject } from 'rxjs/Subject';
import { LoadingService } from './loading.service';
import { ErrorService } from './error.service';

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

    constructor(private http: HttpClient, private userService: UserService, private loadingService: LoadingService, private errorService: ErrorService) { }

    createHouse(houseName, houseCode) {
        console.log(houseName, houseCode);
        const newHouse = { houseName, houseCode };
        return this.http.post('https://housepal-server.herokuapp.com/houses/create', newHouse)
            .do((res: any) => {
                console.log('new house created: ', res);
                this.userService.userHouseID = res.houseID;
            });
    }

    joinHouse(houseName, houseCode) {
        console.log(houseName, houseCode);
        const house = { houseName, houseCode };
        return this.http.post('https://housepal-server.herokuapp.com/houses/join', house)
            .do((res: any) => {
                console.log('joined house: ', res);
                this.userService.userHouseID = res.houseID;
            });
    }

    getHouse() {
        return this.http.get(`https://housepal-server.herokuapp.com/houses/id/${this.userService.userHouseID}`)
            .catch(err => {
                console.error('Error getting house info: ', err);
                return Observable.of();
            })
            .do((res: any[]) => this._house = res);
    }

    getRoommates() {
        return this.http.get(`https://housepal-server.herokuapp.com/users/roommates/${this.userService.userHouseID}`)
            .catch(err => {
                console.error('Error getting roommates: ', err);
                this.errorService.handleError(err);
                return Observable.of();
            })
            .do((res: any[]) => {
                console.log('roommates (App): ', res);
                this._roommates = res;
            });
    }

    removeRoommate(roommate) {
        return this.http.post('https://housepal-server.herokuapp.com/users/remove-roommate', roommate)
            .catch(err => {
                console.error('Error removing roommates: ', err);
                return Observable.of();
            });
    }

    leaveHouse() {
        return this.http.post('https://housepal-server.herokuapp.com/users/leave', { houseID: this.userService.activeUser.houseID })
            .catch(err => {
                console.error('Error leaving house ', err);
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
            .do(result => {
                console.log('in update do');
                
                this.menuDataSubject.next(result)
            })
            .subscribe();
    }
}
