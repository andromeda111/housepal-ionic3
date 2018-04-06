import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { UserService } from './user.service';
import { Events } from 'ionic-angular';

@Injectable()
export class HouseService {

    _house: any = {};
    _roommates: any[] = [];
    // Note to self: do I actually / Should I / even store these?
    get house() {
        return this._house;
    }

    get roommates() {
        return this._roommates;
    }

    constructor(private http: HttpClient, private userService: UserService, private events: Events) { }

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
        console.log('get house');
        return this.http.get(`https://housepal-server.herokuapp.com/houses/id/${this.userService.userHouseID}`)
            .catch(err => {
                console.error('Error getting house info: ', err);
                return Observable.throw(err);
            })
            .do((res: any[]) => {
                console.log('house (App): ', res);
                this._house = res;
            });
    }

    getRoommates() {
        console.log('get roommates');
        return this.http.get(`https://housepal-server.herokuapp.com/users/roommates/${this.userService.userHouseID}`)
            .catch(err => {
                console.error('Error getting roommates: ', err);
                return Observable.throw(err);
            })
            .do((res: any[]) => {
                console.log('roommates (App): ', res);
                this._roommates = res;
            });
    }

    removeRoommate(roommate) {
        console.log('in service to remove', roommate);
        return this.http.post('https://housepal-server.herokuapp.com/users/remove-roommate', roommate)
            .catch(err => {
                console.error('Error removing roommates: ', err);
                return Observable.throw(err);
            })
            .do((res: any) => {
                console.log('completed, in do: ', res);
            })
    }

    updateMenuData() {
        if (!this.userService.userHouseID) {
            return Observable.of(undefined);
        }

        return Observable.forkJoin([
            this.getHouse(),
            this.getRoommates()
        ]);
    }
}
