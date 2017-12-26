import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';

@Component({
    selector: 'page-shopping-list',
    templateUrl: 'shopping-list.html'
})
export class ShoppingListPage {

    constructor(public navCtrl: NavController) {

    }

    navPageSettings() {
        this.navCtrl.push(SettingsPage);
    }

}
