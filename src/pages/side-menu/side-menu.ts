import { Component, Input } from '@angular/core';
import { IonicPage, MenuController, NavController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { SigninPage } from '../user-setup/signin/signin';
import { UserService } from '../../services/user.service';

@IonicPage()
@Component({
    selector: 'page-side-menu',
    templateUrl: 'side-menu.html'
})
export class SideMenuPage {

    activeMenu: number;
    menuItems = [
        'Settings',
        'Roommates',
        'Sign Out'
    ];

    @Input() userName = '';

    constructor(private authService: AuthService,
        private menuCtrl: MenuController,
        private nav: NavController) { }

    selectMenuItem(index) {
        const item = this.menuItems[index];
        this.activeMenu = index;

        if (this.menuItems.length - 1 === index ) {
            this.onLogout();
            return;
        }

        
    }

    onLogout() {
        this.authService.logout();
        this.menuCtrl.close();
        this.nav.setRoot(SigninPage);
    }

    verifyLogin() {
        this.authService.verifyAuthorization()
    }

}
