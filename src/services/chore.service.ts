import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ErrorService } from './error.service';

@Injectable()
export class ChoreService {

    constructor(private http: HttpClient, private errorService: ErrorService) { }

    getAllChores() {
        return this.http.get(`https://housepal-server.herokuapp.com/chores/chores`)
            .catch(err => {
                this.errorService.handleError(err);
                return Observable.of();
            });
    }

}
