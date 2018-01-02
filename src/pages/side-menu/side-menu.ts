import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { SigninPage } from '../user-setup/signin/signin';

@IonicPage()
@Component({
    selector: 'page-side-menu',
    templateUrl: 'side-menu.html'
})
export class SideMenuPage {

    constructor(private authService: AuthService,
                private menuCtrl: MenuController,
                private nav: NavController) {}
    onLogout() {
        this.authService.logout();
        this.menuCtrl.close();
        this.nav.setRoot(SigninPage);
      }

}
