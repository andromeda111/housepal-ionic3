import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import firebase from "firebase";
import 'rxjs/add/operator/catch';

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
    async signup(name: string, email: string, password: string) {

        const newUser = { name, email, password };

        // Post new user to Database
        await new Promise((resolve, reject) => {
            this.http.post('https://housepal-server.herokuapp.com/users/signup', newUser)
                .subscribe((result: any) => { 
                    // postToDatabaseComplete = true;
                    this.userId = result.user.uid
                    console.log('success from database', result);
                    resolve(result);
                }, 
                error => reject(error));
        }).catch(error => console.log('ERROR, BRUH', error))

        this.signin(email, password);
    }

    async signin(email: string, password: string) {

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(user => {
                const userData = user.toJSON();
                // Existing User: Set User ID and Auth Token
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
