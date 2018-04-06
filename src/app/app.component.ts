import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';
// Pages
import { HouseSetupPage } from '../pages/house-setup/house-setup';
import { SigninPage } from '../pages/user-setup/signin/signin';
import { TabsPage } from '../pages/tabs/tabs';
// Services
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { HouseService } from '../services/house.service';

import 'rxjs/add/operator/filter';

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
        private userService: UserService,
        private houseService: HouseService
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
            // 'User not found' but logged into app into tab page. FB auth worked, but DB failed and still let through?
            if (user) {
                console.log('AuthState Logged In');
                this.authService.verifyLoginAndUserState(user)
                    .do(() => {
                        console.log('verified');
                        this.initializeData();
                        this.userService.userHouseID ? this.rootPage = TabsPage : this.rootPage = HouseSetupPage
                    })
                    .subscribe();
            } else {
                console.log('Logged Out');
                this.authService.logout();
                this.rootPage = SigninPage;
            }
        });
    }

    private initializeData() {
        // Update Side Menu Data
        this.houseService.updateMenuData();
    }
}
