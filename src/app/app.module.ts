import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// Ionic
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';
import { Globalization } from '@ionic-native/globalization';
// App
import { MyApp } from './app.component';
// Pages
import { ChoresPage } from '../pages/chores/chores';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';
import { HouseSetupPage } from '../pages/house-setup/house-setup';
import { LaundryPage } from '../pages/laundry/laundry';
import { ListPage } from '../pages/list/list';
import { MessagesPage } from '../pages/messages/messages';
import { SideMenuPage } from '../pages/side-menu/side-menu';
import { SigninPage } from '../pages/user-setup/signin/signin';
import { SignupPage } from '../pages/user-setup/signup/signup';
import { TabsPage } from '../pages/tabs/tabs';
// Services
import { AlertService } from '../services/alert.service';
import { AuthInterceptor } from '../services/auth-interceptor.service';
import { AuthService } from '../services/auth.service';
import { ChoreService } from '../services/chore.service';
import { ErrorService } from '../services/error.service';
import { HouseService } from '../services/house.service';
import { ImageService } from '../services/image.service';
import { LoadingService } from '../services/loading.service';
import { UserService } from '../services/user.service';
// Components
import { ChoreCardComponent } from '../components/chore-card/chore-card.component'

@NgModule({
    declarations: [
        MyApp,
        ChoresPage,
        EditProfilePage,
        HouseSetupPage,
        LaundryPage,
        ListPage,
        MessagesPage,
        SideMenuPage,
        SigninPage,
        SignupPage,
        TabsPage,
        ChoreCardComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        IonicModule.forRoot(MyApp, {
            tabsHighlight: true,
            tabsPlacement: 'top'
        }),
        FormsModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        ChoresPage,
        EditProfilePage,
        HouseSetupPage,
        LaundryPage,
        ListPage,
        MessagesPage,
        SideMenuPage,
        SigninPage,
        SignupPage,
        TabsPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        Globalization,
        Camera,
        AlertService,
        AuthService,
        ChoreService,
        ErrorService,
        HouseService,
        ImageService,
        LoadingService,
        UserService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        { provide: ErrorHandler, useClass: IonicErrorHandler }
    ]
})
export class AppModule { }
