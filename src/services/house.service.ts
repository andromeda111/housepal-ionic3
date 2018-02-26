import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/catch';

@Injectable()
export class HouseService {
    createHouse(houseName, houseCode) {
        console.log(houseName, houseCode);
    }
    joinHouse(houseName, houseCode) {
        console.log(houseName, houseCode);
    }
}
