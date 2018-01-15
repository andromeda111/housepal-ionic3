import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import firebase from "firebase";
import { ReturnStatement } from '@angular/compiler/src/output/output_ast';

@Injectable()
export class AuthService {

    // TODO: Create User interfaces
    private userId: string;
    private userToken: string;

    public get getUserToken() {
        return this.userToken;
    }

    constructor(public http: HttpClient) {}
    
    signup(name: string, email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(user => {
                return Promise.all([user.uid, user.getIdToken()]); 
            })
            .then(userData => {
                this.userId = userData[0];
                this.userToken = userData[1];

                let newUser = { uid: this.userId, name, email, h_pw: password };

                this.http.post('https://housepal-server.herokuapp.com/users/signup', newUser).subscribe(res => {
                    console.log(res);        
                })
                return;
            })
            .catch(function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(error);
            });
    }

    signin(email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(user => {
                return Promise.all([user.uid, user.getIdToken()]); 
            })
            .then(userData => {
                // If userId and userToken have already been accurately set, return from promise.
                if (this.userId && this.userId === userData[0] && this.userToken && this.userToken === userData[1]) {      
                    return;
                } else {
                    this.userId = userData[0];
                    this.userToken = userData[1];            
                    return;
                }
            })
           .catch(function(error) {
                let errorCode = error.code;
                let errorMessage = error.message;
                console.log(error);
          });
    }

    logout() {
        firebase.auth().signOut();
        this.userId =  '';
        this.userToken = '';
    }

    public async setUserIdAndToken() {
        if (!this.userToken) {
            await this.firebaseGetCurrentUser();
        }

        return this.userToken;
    }

    // Firebase: Get current user and set this.userId and this.userToken
    private firebaseGetCurrentUser() {
        let user = firebase.auth().currentUser;
        
        this.userId = user.uid;
        user.getIdToken().then(token => this.userToken = token);
    }

    // Dev - can delete later
    verifyAuthorization() {
        return this.http.post('https://housepal-server.herokuapp.com/users/verify', {token: this.userToken}).subscribe(res => {
            console.log(res);        
        })
    }
}