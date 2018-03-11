import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HouseService {
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
}
