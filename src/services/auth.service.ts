import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import firebase from "firebase";

@Injectable()
export class AuthService {

    // TODO: Create User interfaces
    private userId: string;
    private userToken: string;
    private _isFirstSignin: boolean = false;

    public get getUserToken() {
        return this.userToken;
    }

    public get isFirstSignin() {
        return this._isFirstSignin;
    }

    public set isFirstSignin(val: boolean) {
        this._isFirstSignin = val;
    }

    constructor(public http: HttpClient) {}

     /****************************
        Signup, Signin, Logout
    *****************************/
    signup(name: string, email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(user => {
                const userData = user.toJSON();
                // First Signin: Set User ID and Auth Token.
                this.isFirstSignin = true;
                this.userId = userData.uid;
                this.userToken = userData.stsTokenManager.accessToken;  
                
                // Post New User to Database.
                const newUser = { uid: this.userId, name, email, h_pw: password };
                this.http.post('https://housepal-server.herokuapp.com/users/signup', newUser).subscribe(res => {
                    console.log(res);   

                    // ToDo: What if this fails?
                })

                return ;
            })
            .catch(error => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(error);
            })
            
    }

    signin(email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(user => {
                const userData = user.toJSON();
                // Existing User: Set User ID and Auth Token
                this.isFirstSignin = false;
                this.userId = userData.uid;
                this.userToken = userData.stsTokenManager.accessToken;
                return;              
            })
           .catch(error => {
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
        this.isFirstSignin = false;
    }

    /**********************************************
        Initiate User ID and Auth Token
    ***********************************************/
    // We know we have an active user that has logged in.
    // Now we need to make sure their ID and Token have been set.

     public checkUserTokenIsSet() {
        if (this.userToken) {
            return;
        }

        const user = firebase.auth().currentUser;
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
