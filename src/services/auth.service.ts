import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import firebase from "firebase";

@Injectable()
export class AuthService {

    // TODO: Create User interfaces
    private userId: string;
    private userToken: string;

    public get getUserToken() {
        return this.userToken;
    }

    constructor(public http: HttpClient) {}

     /****************************
        Signup, Signin, Logout
    *****************************/
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
                    // this.initiateAuthAndUserState()    
                    return;
                } else {
                    this.userId = userData[0];
                    this.userToken = userData[1]; 
                    // this.initiateAuthAndUserState()                              
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
        this.clearUserState();
    }

    public clearUserState() {
        this.userId =  '';
        this.userToken = '';
    }

    /**********************************************
        Initiate User ID and Auth Token
    ***********************************************/
    // We know we have an active user that has logged in.
    // Now we need to make sure their ID and Token have been set.

    public async initiateCurrentUser() {
        await this.checkUserTokenIsSet();

        return;       
    }

    public async checkUserTokenIsSet() {
        if (!this.userToken) {
            await this.firebaseGetCurrentUser(); 
        }

        return;
    }

    private firebaseGetCurrentUser() {
        let user = firebase.auth().currentUser;
        
        // Set this.userId and this.userToken
        this.userId = user.uid;
        user.getIdToken().then(token => this.userToken = token);

        return;
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
