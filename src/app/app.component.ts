import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';
// Pages
import { TabsPage } from '../pages/tabs/tabs';
import { SigninPage } from '../pages/user-setup/signin/signin';
// Services
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {

    public rootPage: any = SigninPage;
    
    private loading = false;
    private isAuthenticated: boolean = false;

    constructor(private platform: Platform, 
                private statusBar: StatusBar,
                private splashScreen: SplashScreen,
                private authService: AuthService,
                private userService: UserService) {

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
                console.log('Auth State Logged In', user);
                this.isAuthenticated = true;
                this.setUserAndNavStart();
            } else {
                console.log('logged out');
                this.isAuthenticated = false;
                this.authService.clearUserState();
                this.rootPage = SigninPage;
            }

        })
    }
 
    private async setUserAndNavStart() {
       
        this.loading = true;   

        // Established User is logging in.
        // Check that User Id and Token are set.
        // Get the User from the database.
        // Nav to their House, or, if undefined, nav to House Setup.
        await this.authService.checkUserTokenIsSet();
        await this.userService.setCurrentUser();

        const houseId = this.userService.userHouseId;
    
        if (houseId) {
            this.rootPage = TabsPage;
            this.loading = false;
        } else {
            console.log('No House: Nav to House Setup');
            this.loading = false;
        }

        return; 
    }
    
}
