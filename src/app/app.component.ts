import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';

// Pages
import { TabsPage } from '../pages/tabs/tabs';
import { SigninPage } from '../pages/user-setup/signin/signin';
import { HouseSetupPage } from '../pages/house-setup/house-setup';

// Services
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {

    rootPage: any = SigninPage;

    constructor(
        private platform: Platform,
        private statusBar: StatusBar,
        private splashScreen: SplashScreen,
        private authService: AuthService,
        private userService: UserService
    ) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });

        // Firebase Authentication Initialization
        firebase.initializeApp({
            apiKey: 'AIzaSyDRabPL_UaXgWdIIx-rgTpoP7s1Tay3gGM',
            authDomain: 'housepal-v2.firebaseapp.com'
        });

        // Firebase Check Authorization
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                console.log('Auth State Logged In', user);
                this.authService.verifyLoginAndUserState(user)
                    .do(() => this.setStartPage())
                    .subscribe();
                // this.checkCurrentUserData();
            } else {
                console.log('logged out');
                this.authService.logout();
                this.rootPage = SigninPage;
            }
        });
    }

    private setStartPage() {
        // Nav to appropriate place
        const houseId = this.userService.userHouseID;
        console.log(this.userService.activeUser);

        if (houseId) {
            this.rootPage = TabsPage;
        } else {
            console.log('No House: Nav to House Setup');
            this.rootPage = HouseSetupPage;
        }
    }
}
