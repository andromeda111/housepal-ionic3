import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { MessagesPage } from '../messages/messages';
import { ChoresPage } from '../chores/chores';
import { ListPage } from '../list/list';
import { LaundryPage } from '../laundry/laundry';
import { UserService } from '../../services/user.service';

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

    constructor(private userService: UserService) {

    }

    ionViewWillEnter() {
        console.log( this.userService.activeUser.name);
        
        this.userName = this.userService.activeUser.name;
    }
}
