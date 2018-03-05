import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// Ionic
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
// App
import { MyApp } from './app.component';

// Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

// Pages
import { MessageBoardPage } from '../pages/message-board/message-board';
import { ChoresPage } from '../pages/chores/chores';
import { ShoppingListPage } from '../pages/shopping-list/shopping-list';
import { LaundryPage } from '../pages/laundry/laundry';
import { TabsPage } from '../pages/tabs/tabs';
import { SideMenuPage } from '../pages/side-menu/side-menu';
import { SigninPage } from '../pages/user-setup/signin/signin';
import { SignupPage } from '../pages/user-setup/signup/signup';
import { HouseSetupPage } from '../pages/house-setup/house-setup';

// Components

// Services
import { AuthService } from '../services/auth.service';
import { AuthInterceptor } from '../services/auth-interceptor.service';
import { UserService } from '../services/user.service';
import { HouseService } from '../services/house.service';

// Firebase Config
export const firebaseConfig = {
    apiKey: 'AIzaSyDRabPL_UaXgWdIIx-rgTpoP7s1Tay3gGM',
    authDomain: 'housepal-v2.firebaseapp.com'
};

@NgModule({
    declarations: [
        MyApp,
        MessageBoardPage,
        ChoresPage,
        ShoppingListPage,
        LaundryPage,
        TabsPage,
        SideMenuPage,
        SigninPage,
        SignupPage,
        HouseSetupPage
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        IonicModule.forRoot(MyApp, {
            tabsHighlight: true,
            tabsPlacement: 'top'
        }),
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireAuthModule,
        FormsModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        MessageBoardPage,
        ChoresPage,
        ShoppingListPage,
        LaundryPage,
        TabsPage,
        SideMenuPage,
        SigninPage,
        SignupPage,
        HouseSetupPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        AuthService,
        UserService,
        HouseService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        { provide: ErrorHandler, useClass: IonicErrorHandler }
    ]
})
export class AppModule { }
