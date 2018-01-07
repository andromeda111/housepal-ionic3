import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import firebase from "firebase";

@Injectable()
export class AuthService {

    // TODO: Create User interfaces
    private userId: string;
    private userToken: string;

    constructor(public http: HttpClient) {}
    
    signup(name: string, email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(user => {
                return Promise.all([user.uid, user.getIdToken()]); 
            })
            .then(userData => {
                this.userId = userData[0];
                this.userToken = userData[1];      
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
                this.userId = userData[0];
                this.userToken = userData[1];      
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

    getToken() {
        return this.userToken;
    }

    // Service methods for development. Delete later when not needed.

    getActiveUser() {
        return firebase.auth().currentUser;
    }

    verifyAuthorization() {
        return this.http.post('http://localhost:9000/users/verify', {token: this.userToken}).subscribe(res => {
            console.log(res);        
        })
    }
}