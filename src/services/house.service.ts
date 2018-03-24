import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HouseService {

    _roommates: any[] = [];

    get roommates() {
        return this._roommates;
    }

    constructor(private http: HttpClient) { }

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

    getRoommates() {
        console.log('get roommates');
        return this.http.get('https://housepal-server.herokuapp.com/users/roommates')
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
