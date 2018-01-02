import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { SigninPage } from '../user-setup/signin/signin';

@Component({
    selector: 'page-settings',
    templateUrl: 'settings.html'
})
export class SettingsPage {

    constructor(private authService: AuthService,
                private menuCtrl: MenuController,
                private nav: NavController) {}
    onLogout() {
        this.authService.logout();
        this.menuCtrl.close();
        this.nav.setRoot(SigninPage);
      }

}
