import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { MessagesPage } from '../messages/messages';
import { ChoresPage } from '../chores/chores';
import { ListPage } from '../list/list';
import { LaundryPage } from '../laundry/laundry';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';
import { HouseService } from '../../services/house.service';

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

    constructor(private userService: UserService, private houseService: HouseService) {

    }

    ionViewWillEnter() {
        console.log(this.userService.activeUser.name);
        this.userName = this.userService.activeUser.name;
        this.menuOpened();
    }

    menuOpened() {
        this.houseService.updateMenuData();
    }
}
