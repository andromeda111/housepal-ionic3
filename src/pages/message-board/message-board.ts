import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';

@Component({
    selector: 'page-message-board',
    templateUrl: 'message-board.html'
})
export class MessageBoardPage {

    constructor(public navCtrl: NavController) {

    }

    navPageSettings() {
      this.navCtrl.push(SettingsPage);
    }

}
