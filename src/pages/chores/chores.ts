import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';

@Component({
    selector: 'page-chores',
    templateUrl: 'chores.html'
})
export class ChoresPage {

    constructor(public navCtrl: NavController) {

    }

    navPageSettings() {
        this.navCtrl.push(SettingsPage);
    }
}
