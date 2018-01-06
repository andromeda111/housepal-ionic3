import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import firebase from "firebase";

@Injectable()
export class AuthService {

    private userToken;

    constructor(public http: HttpClient) {}
    
    signup(name: string, email: string, password: string) {
        return this.http.post('http://localhost:9000/users/create', {name, email, password}).subscribe(res => console.log(res))
    }

    signin(email: string, password: string) {
        return this.http.post('http://localhost:9000/users/signin', {email, password}).subscribe(res => {
            this.userToken = res;
        })        
    }

    logout() {
        firebase.auth().signOut();
    }

    getActiveUser() {
        return firebase.auth().currentUser;
    }

    verify() {
        console.log(this.userToken);
        return this.http.post('http://localhost:9000/users/verify', {token: this.userToken.token}).subscribe(res => {
            console.log(res);        
        })
    }
}