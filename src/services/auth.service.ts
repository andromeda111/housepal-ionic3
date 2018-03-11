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

@Injectable()
export class AuthService {
    // TODO: Create interfaces

    private _userAuthToken: string;
    private authenticated: boolean = false;

    get userAuthToken() {
        return this._userAuthToken;
    }
    get isAuthenticated() {
        return this.authenticated;
    }

    constructor(private http: HttpClient, private userService: UserService) { }

    /****************************
        Signup, Signin, Logout
    *****************************/
    signup(name: string, email: string, password: string) {
        const newUser = { name, email, password };

        return this.http.post('https://housepal-server.herokuapp.com/users/signup', newUser)
            .catch(err => {
                console.error('Error creating new user: ', err);
                return Observable.throw(err);
            }).switchMap(newUserData => this.firebaseSignin(email, password, newUserData.user));
    }

    signin(email: string, password: string) {
        return this.http.post('https://housepal-server.herokuapp.com/users/signin', { email, password })
            .catch(err => {
                console.error('Signin to Database Failed: ', err);
                return Observable.throw(err);
            }).switchMap(userData => this.firebaseSignin(email, password, userData));
    }

    private firebaseSignin(email, password, userData) {
        return Observable.from(firebase.auth().signInWithEmailAndPassword(email, password))
            .catch(err => {
                console.error('Error signing in to firebase Auth: ', err);
                return Observable.throw(err)
            }).do(result => {
                // Authentication succcessful: Set activeUser, this._userAuthToken, and this.auth()enticated.
                const firebaseUser = result.toJSON();
                this.userService.activeUser = userData;
                this._userAuthToken = firebaseUser.stsTokenManager.accessToken;
                this.authenticated = true;
            });
    }

    verifyLoginAndUserState(user) {
        this.authenticated = true;

        if (!this._userAuthToken) {
            this._userAuthToken = user.toJSON().stsTokenManager.accessToken;
        }

        if (Object.keys(this.userService.activeUser).length === 0) {
            return this.userService.retrieveCurrentUserData();
        } else {
            return Observable.of(undefined);
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

    /*****************************************
        Development Methods: DELETE LATER
    ******************************************/
    // Dev - can delete later
    verifyAuthorization() {
        return this.http.post('https://housepal-server.herokuapp.com/users/verify', { token: this._userAuthToken }).subscribe(res => {
            console.log(res);
        });
    }
}
