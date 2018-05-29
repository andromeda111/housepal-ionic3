import { Component } from '@angular/core';
import { Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Globalization } from '@ionic-native/globalization';
import firebase from 'firebase';
// Pages
import { HouseSetupPage } from '../pages/house-setup/house-setup';
import { SigninPage } from '../pages/user-setup/signin/signin';
// import { TabsPage } from '../pages/tabs/tabs';
// Services
import { AuthService } from '../services/auth.service';
import { HouseService } from '../services/house.service';
import { LoadingService } from '../services/loading.service';
import { UserService } from '../services/user.service';
import { AlertService } from '../services/alert.service';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {

    rootPage: any = SigninPage;

    constructor(
        private platform: Platform,
        private statusBar: StatusBar,
        private splashScreen: SplashScreen,
        private globalization: Globalization,
        private authService: AuthService,
        private userService: UserService,
        private houseService: HouseService,
        private events: Events,
        private loadingService: LoadingService,
        private alertService: AlertService
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
            authDomain: 'housepal-v2.firebaseapp.com',
            storageBucket: 'housepal-v2.appspot.com',
        });

        // Firebase Check Authorization
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                console.log('AuthState Logged In');
                const loading = this.loadingService.loadingSpinner();
                loading.present();
                this.authService.verifyLoginAndUserState(user)
                    .do(() => {
                        console.log('verified');
                        this.initializeData();
                        this.userService.userHouseID ? this.rootPage = 'TabsPage' : this.rootPage = HouseSetupPage;
                    })
                    .finally(() => loading.dismiss())
                    .subscribe();
            } else {
                console.log('Logged Out');
                this.authService.logout();
                this.rootPage = SigninPage;
            }
        });

        // Set App Root Events
        this.events.subscribe('appSetRoot:TabsPage', () => this.rootPage = 'TabsPage');
        this.events.subscribe('appSetRoot:HouseSetupPage', () => this.rootPage = HouseSetupPage);
    }

    private initializeData() {

        // Use this again later when we collect UTC_OFFSET or timezone
        // this.globalization.getDatePattern({formatLength:'short', selector:'date and time'}).then(res => {
        //     console.log(res);
        //     this.alertService.generic(res);
        // }).catch(err => {
        //     this.alertService.generic(err);
        // })

        // dont need this if we start the app with the menu open
        // this.houseService.updateMenuData();
    }
}
