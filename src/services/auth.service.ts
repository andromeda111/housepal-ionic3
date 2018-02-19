import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import firebase from "firebase";
import 'rxjs/add/operator/catch';

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

    constructor(public http: HttpClient) {}

     /****************************
        Signup, Signin, Logout
    *****************************/
    public signup(name: string, email: string, password: string) {
        const newUser = { name, email, password };
        let userData: any = {};

        // Post new user to Database
        return new Promise((resolve, reject) => {
            this.http.post('https://housepal-server.herokuapp.com/users/signup', newUser)
                .subscribe((result: any) => { 
                    console.log('Successfully created new user: ', result);
                    userData = result;
                    resolve();
                }, 
                error => reject(error))
        }).then(() => {
            this.signin(email, password, userData.user);
        }).catch(error => {
            console.error('Error creating new user: ', error)
        })
    }

    public signin(email: string, password: string, newUserData?: any) { 
        return new Promise((resolve, reject) => {
            // If there is newUserData coming from Signup, resolve to next step.
            newUserData ? resolve(newUserData) : 
            // Otherwise, start Signin through Database to get userData.
            this.http.post('https://housepal-server.herokuapp.com/users/signin', {email, password})
                .subscribe((result: any) => {
                    // Result = Array containing User object
                    result.length ? resolve(result[0]) : reject('Signin to Database Failed');
                }, 
                error => reject(error))
            }).then(userData => {
                // Sign in to Firebase Auth
                return firebase.auth().signInWithEmailAndPassword(email, password)
                    .then(result => {
                        // Authentication succcessful: Set this.currentUser, this.userToken, and this.authenticated.
                        const firebaseUser = result.toJSON();
                        this.currentUser = userData;          
                        this.userToken = firebaseUser.stsTokenManager.accessToken;
                        this.authenticated = true;
                    })
                    .catch(error => {
                        console.error('Error signing in to Firebase Auth', error);
                        return error;
                    });
            })
            .catch(error => {
                console.error('Error with Signin. Please Try Again:', error)
                return error;
            });
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





    /*****************************************
        Development Methods: DELETE LATER
    ******************************************/
    // Dev - can delete later
    verifyAuthorization() {
        return this.http.post('https://housepal-server.herokuapp.com/users/verify', {token: this.userToken}).subscribe(res => {
            console.log(res);        
        })
    }

}
