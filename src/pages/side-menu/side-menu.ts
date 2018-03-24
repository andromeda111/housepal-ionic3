import { Component, Input } from '@angular/core';
import { IonicPage, MenuController, NavController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { SigninPage } from '../user-setup/signin/signin';
import { UserService } from '../../services/user.service';
import { HouseService } from '../../services/house.service';

@IonicPage()
@Component({
    selector: 'page-side-menu',
    templateUrl: 'side-menu.html'
})
export class SideMenuPage {

    activeMenu = 'Roommates';
    house: any = {};
    roommates: any = [];

    @Input() userName = '';

    constructor(private authService: AuthService,
        private menuCtrl: MenuController,
        private nav: NavController,
        private houseService: HouseService) {

        this.houseService.getHouse()
            .do(() => this.house = this.houseService.house)
            .subscribe();

        this.houseService.getRoommates()
            .do(() => this.roommates = this.houseService.roommates)
            .subscribe();
    }

    selectMenu(menu: string) {
        this.activeMenu === menu ? this.activeMenu = '' : this.activeMenu = menu;
    }

    signOut() {
        this.activeMenu = 'Sign Out';
        this.authService.logout();
        this.menuCtrl.close();
        this.nav.setRoot(SigninPage);
    }

}
