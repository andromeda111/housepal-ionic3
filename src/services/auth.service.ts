import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';
import { UserService } from './user.service';
import { ErrorService } from './error.service';

@Injectable()
export class AuthService {

    private _userAuthToken: string;
    private authenticated: boolean = false;

    get userAuthToken() {
        return this._userAuthToken;
    }
    get isAuthenticated() {
        return this.authenticated;
    }

    constructor(private http: HttpClient, private userService: UserService, private errorService: ErrorService) { }

    /*============================
        Signup, Signin, Logout
    =============================*/
    signup(name: string, email: string, password: string) {
        const newUser = { name, email, password };

        return this.http.post('https://housepal-server.herokuapp.com/users/signup', newUser)
            .catch(err => {
                console.error('Error creating new user: ', err);
                err.type = 'notice';
                this.errorService.handleError(err);
                return Observable.of();
            }).switchMap((newUserData: any) => this.firebaseSignin(email, password, newUserData.user));
    }

    signin(email: string, password: string) {
        return this.http.post('https://housepal-server.herokuapp.com/users/signin', { email, password })
            .catch(err => {
                console.error('Signin to Database Failed: ', err);
                err.type = 'notice';
                this.errorService.handleError(err);
                return Observable.of();
            }).switchMap(userData => this.firebaseSignin(email, password, userData));
    }

    private firebaseSignin(email, password, userData) {
        return Observable.from(firebase.auth().signInWithEmailAndPassword(email, password))
            .catch(err => {
                console.error('Error signing in to firebase Auth: ', err);
                if (!err.error || !err.error.message) {
                    err.error = { message: 'Email or password did not match an existing user. Please try again or sign up.' };
                }
                this.errorService.handleError(err);
                return Observable.of()
            }).do(result => {
                // Authentication succcessful: Set activeUser, this._userAuthToken, and this.authenticated.
                const firebaseUser = result.toJSON();
                this.userService.activeUser = userData;
                console.log(this.userService.activeUser);
                this._userAuthToken = firebaseUser.stsTokenManager.accessToken;
                this.authenticated = true;
            });
    }

    verifyLoginAndUserState(user) {
        this.authenticated = true;

        if (!this._userAuthToken) {
            this._userAuthToken = user.toJSON().stsTokenManager.accessToken;
        }

        if (this.userService.activeUser.uid) {
            return Observable.of(undefined);
        } else {
            return this.userService.retrieveCurrentUserData();
        }
    }

    logout() {
        if (this.authenticated) {
            firebase.auth().signOut();
        }

        this._userAuthToken = '';
        this.userService.clearActiveUser();
        this.authenticated = false;
    }
}
