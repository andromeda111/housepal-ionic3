import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';
// Pages
import { TabsPage } from '../pages/tabs/tabs';
import { SigninPage } from '../pages/user-setup/signin/signin';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    public rootPage: any = SigninPage;
    private isAuthenticated: boolean = false;

    constructor(private platform: Platform, 
                private statusBar: StatusBar,
                private splashScreen: SplashScreen) {

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

        // Firebase Check Authorization
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                console.log('logged in');
              this.isAuthenticated = true;
              this.rootPage = TabsPage;
            } else {
                console.log('logged out');
              this.isAuthenticated = false;
              this.rootPage = SigninPage;
            }
          })
    }
}
