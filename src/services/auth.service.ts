import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import firebase from 'firebase';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
    // TODO: Create interfaces

    public currentUser: any = {};

    private userToken: string;
    private authenticated: boolean = false;

    public get getUserToken() {
        return this.userToken;
    }
    public get isAuthenticated() {
        return this.authenticated;
    }

    constructor(public http: HttpClient, private userService: UserService) { }

    /****************************
        Signup, Signin, Logout
    *****************************/
    public signup(name: string, email: string, password: string) {
        const newUser = { name, email, password };

        return this.http.post('https://housepal-server.herokuapp.com/users/signup', newUser)
            .catch(err => {
                console.error('Error creating new user: ', err);
                return Observable.throw(err);
            }).switchMap(newUserData => this.firebaseSignin(email, password, newUserData.user));
    }

    public signin(email: string, password: string) {
        return this.http.post('https://housepal-server.herokuapp.com/users/signin', { email, password })
            .catch(err => {
                console.error('Signin to Database Failed: ', err);
                return Observable.throw(err);
            }).switchMap(userData => this.firebaseSignin(email, password, userData));
    }

    public firebaseSignin(email, password, userData) {
        return Observable.from(firebase.auth().signInWithEmailAndPassword(email, password))
            .catch(err => {
                console.error('Error signing in to Firebase Auth: ', err);
                return Observable.throw(err)
            }).do(result => {
                // Authentication succcessful: Set this.currentUser, this.userToken, and this.authenticated.
                const firebaseUser = result.toJSON();
                this.currentUser = userData; // TODO: Can remove this? User Service works here!
                this.userService.setActiveUser(userData);
                this.userToken = firebaseUser.stsTokenManager.accessToken;
                this.authenticated = true;
            });
    }

    public getCurrentUserData() {
        return this.http.get('https://housepal-server.herokuapp.com/users/current')
            .filter(res => res !== undefined)
            .do(res => {
                console.log('current: ', res[0]);
                this.currentUser = res[0];
                this.userService.setActiveUser(res[0]);
            })
    }

    public verifyLoginAndUserState(user) {
        this.authenticated = true;

        if (!this.userToken) {
            this.userToken = user.toJSON().stsTokenManager.accessToken;
            this.refreshAuthToken();
        }

        if (Object.keys(this.currentUser).length === 0) {
            return this.getCurrentUserData();
        } else {
            return Observable.of(undefined);
        }
    }

    public logout() {
        firebase.auth().signOut();
        this.clearUserState();
    }

    public clearUserState() {
        this.currentUser = {};
        this.userToken = '';
        this.authenticated = false;
    }


    private refreshAuthToken() {
        firebase.auth().currentUser.getIdToken()
            .then(token => {
                this.userToken = token;
            });
    }


    /*****************************************
        Development Methods: DELETE LATER
    ******************************************/
    // Dev - can delete later
    verifyAuthorization() {
        return this.http.post('https://housepal-server.herokuapp.com/users/verify', { token: this.userToken }).subscribe(res => {
            console.log(res);
        });
    }
}
