import { Component } from '@angular/core';
import { Platform, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';

import { TabsPage } from '../pages/tabs/tabs';
import { SigninPage } from '../pages/user-setup/signin/signin';
import { SignUpPage } from '../pages/user-setup/signup/signup';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage: any = SignUpPage;
    signinPage: any = SigninPage;
    // signUpPage: any = SignUpPage;    
    isAuthenticated: boolean = false;

    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
        // Firebase Authentication Initialization
        firebase.initializeApp({
            apiKey: "AIzaSyDRabPL_UaXgWdIIx-rgTpoP7s1Tay3gGM",
            authDomain: "housepal-v2.firebaseapp.com"
        });
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                console.log('logged in');
              this.isAuthenticated = true;
              this.rootPage = TabsPage;
            } else {
                console.log('not logged in');
              this.isAuthenticated = false;
              this.rootPage = SigninPage;
            }
          })
    }
}
