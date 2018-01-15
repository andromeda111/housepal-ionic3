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
                console.log('auth state user', user);
                
                this.isAuthenticated = true;
                this.setActiveUser().then(()=> {


                    console.log('then do stuff');

                    // Check if user is assigned to a House
                    let userHouseId = this.userService.userHouseId;
                    console.log('app user', userHouseId);
    
                    // If the user is not assigned to a house, direct them to House Setup.
                    if (!userHouseId) {
                        console.log('no house');
                        return;
                    }
                
                    this.rootPage = TabsPage;
    
                    console.log('fin set');
    


                })



            } else {
                console.log('logged out');
                this.isAuthenticated = false;
                this.rootPage = SigninPage;
            }

        })
    }
    
    private async setActiveUser() {
        await this.authService.setUserIdAndToken()
        await this.userService.setCurrentUser()
        return;
    }

    
}
