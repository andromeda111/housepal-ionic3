import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { UserService } from './user.service';

@Injectable()
export class HouseService {

    _house: any = {};
    _roommates: any[] = [];

    get house() {
        return this._house;
    }

    get roommates() {
        return this._roommates;
    }

    constructor(private http: HttpClient, private userService: UserService) { }

    createHouse(houseName, houseCode) {
        console.log(houseName, houseCode);
        const newHouse = { houseName, houseCode };
        return this.http.post('https://housepal-server.herokuapp.com/houses/create', newHouse);
    }

    joinHouse(houseName, houseCode) {
        console.log(houseName, houseCode);
        const house = { houseName, houseCode };
        return this.http.post('https://housepal-server.herokuapp.com/houses/join', house);
    }

    getHouse() {
        console.log('get house');
        return this.http.get(`https://housepal-server.herokuapp.com/users/roommates/${this.userService.userHouseID}`)
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
}
