import { Component } from '@angular/core';
import { IonicPage, MenuController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';
import { UserService } from '../../services/user.service';
import { HouseService } from '../../services/house.service';
import { AlertService } from '../../services/alert.service';

@IonicPage()
@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {

    tab1Root = 'LaundryPage';
    tab2Root = 'ChoresPage';
    tab3Root = 'ListPage';

    userName = '';
    menuData: any;

    constructor(private userService: UserService,
        private houseService: HouseService,
        private alertService: AlertService,
        private menuCtrl: MenuController) { }

    ionViewWillEnter() {
        this.userName = this.userService.activeUser.name;
        this.menuCtrl.open();
        this.menuOpened();
    }

    menuOpened() {
        const hasHouseID = this.userService.activeUser.houseID;
        hasHouseID ? this.houseService.updateMenuData() : this.alertService.notInHouse();
    }
}
