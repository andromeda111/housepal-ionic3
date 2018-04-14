import { Component } from '@angular/core';
import { IonicPage, Events, NavController, MenuController } from 'ionic-angular';
import { MessagesPage } from '../messages/messages';
import { ChoresPage } from '../chores/chores';
import { ListPage } from '../list/list';
import { LaundryPage } from '../laundry/laundry';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';
import { HouseService } from '../../services/house.service';
import { AlertService } from '../../services/alert.service';
import { HouseSetupPage } from '../house-setup/house-setup';

@IonicPage()
@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {

    tab1Root = MessagesPage;
    tab2Root = ChoresPage;
    tab3Root = ListPage;
    tab4Root = LaundryPage;

    userName = '';
    menuData: any;

    constructor(private userService: UserService,
        private houseService: HouseService,
        private alertService: AlertService,
        private events: Events,
        private nav: NavController,
        private menuCtrl: MenuController) {

        this.events.subscribe('appNav:HouseSetupPage', () => this.nav.setRoot(HouseSetupPage));
    }

    ionViewWillEnter() {
        console.log(this.userService.activeUser.name);
        this.userName = this.userService.activeUser.name;
        this.menuOpened();
    }

    menuOpened() {
        const hasHouseID = this.userService.activeUser.houseID;
        hasHouseID ? this.houseService.updateMenuData() : this.alertService.notInHouse();
    }

    ngOnDestroy() {
        console.log('destroy tabs');
        this.menuCtrl.close();
        
    }
}
