import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import firebase from "firebase";
import 'rxjs/add/operator/catch';

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
    async signup(name: string, email: string, password: string) {

        const newUser = { uid: 'asdf', name, email, h_pw: password };

        this.isFirstSignin = true;

        let postNewUserToDatabase = new Promise((resolve, reject) => {
            this.http.post('https://housepal-server.herokuapp.com/users/signupp', newUser)
            .subscribe(res => {
                console.log('success', res);   
                resolve(res)
            }, 
            error => {
                // Error creating User in Database. End Signup process.
                console.log('Error with signup in database:', error);
                reject(error)
            })
        })


         let test = new Promise((resolve, reject) => {
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(user => {
                    const userData = user.toJSON();
                    this.userToken = userData.stsTokenManager.accessToken; 
                    console.log('done setting token');
                    resolve('success fb')
                    return;
                })
                .catch(error => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log('fb catch:', error);
                    reject(error)
                    return error;
                })
         })   

         return postNewUserToDatabase.catch(error => console.log('post err', error)).then(success => {
             this.userId = '';
             console.log('fin with post user');
             return test.then(result => {
                 console.log('final stretch fb');
                 return result
             }).catch(error => {
                console.log('final stretch fb error:', error);
                return error;
            })
         })


        // return postNewUserToDatabase.then(success => {
        //     this.userId = '' // Make into user Id number from database
        //     console.log('finished with post user');

        //     firebase.auth().createUserWithEmailAndPassword(email, password)
        //         .then(user => {
        //             const userData = user.toJSON();
        //             this.userToken = userData.stsTokenManager.accessToken; 
        //             console.log('done setting token');
        //             return;
        //         })
        //         .catch(error => {
        //             const errorCode = error.code;
        //             const errorMessage = error.message;
        //             console.log('fb catch:', error);
        //             return error;
        //         })
        //         console.log('after firebase. what will return?');
        //     return success;
        // }).catch(error => {
        //     console.log(error);
        //     return error;
        // })

        // let createFirebaseUser = new Promise((resolve, reject) => {
        //     let firebae;
        //     firebase.auth().createUserWithEmailAndPassword(email, password)
        //         .then(user => {
        //             firebae = user.toJSON()
        //             resolve(firebae)
        //             return firebae
        //         })
        //         .catch(error => {
        //             const errorCode = error.code;
        //             const errorMessage = error.message;
        //             console.log(error);
        //         })
                
        // })

        // return 
        // firebase.auth().createUserWithEmailAndPassword(email, password)
        //     .then(user => {
        //         const userData = user.toJSON();
        //         // First Signin: Set User ID and Auth Token.
        //         this.isFirstSignin = true;
        //         this.userId = userData.uid;
        //         this.userToken = userData.stsTokenManager.accessToken;  
                
        //         // Post New User to Database.
        //         const newUser = { uid: this.userId, name, email, h_pw: password };
        //         this.http.post('https://housepal-server.herokuapp.com/users/signup', newUser).subscribe(res => {
        //             console.log(res);   

        //             // ToDo: What if this fails?
        //         })

        //         return ;
        //     })
        //     .catch(error => {
        //         var errorCode = error.code;
        //         var errorMessage = error.message;
        //         console.log(error);
        //     })
            
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
