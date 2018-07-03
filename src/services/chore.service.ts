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

    markDone(id: number) {
        return this.http.put(`https://housepal-server.herokuapp.com/chores/done/${id}`, null)
        .catch(err => {
            this.errorService.handleError(err);
            return Observable.of();
        });
    }

    editChore(id: number, choreData: any) {
        return this.http.put(`https://housepal-server.herokuapp.com/chores/edit`, choreData)
        .catch(err => {
            this.errorService.handleError(err);
            return Observable.of();
        });
    }
}
