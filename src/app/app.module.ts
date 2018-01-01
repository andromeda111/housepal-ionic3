import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { FormsModule } from '@angular/forms';
import { MyApp } from './app.component';

import { MessageBoardPage } from '../pages/message-board/message-board';
import { ChoresPage } from '../pages/chores/chores';
import { ShoppingListPage } from '../pages/shopping-list/shopping-list';
import { LaundryPage } from '../pages/laundry/laundry';
import { TabsPage } from '../pages/tabs/tabs';
import { SettingsPage } from '../pages/settings/settings';
import { SigninPage } from '../pages/user-setup/signin/signin';
import { SignupPage } from '../pages/user-setup/signup/signup';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../services/auth.service';

@NgModule({
    declarations: [
        MyApp,
        MessageBoardPage,
        ChoresPage,
        ShoppingListPage,
        LaundryPage,   
        TabsPage,
        SettingsPage,
        SigninPage,
        SignupPage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp, {
            tabsHighlight: true,
            tabsPlacement: 'top'
        }),
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
        SettingsPage,
        SigninPage,
        SignupPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        AuthService,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {}
