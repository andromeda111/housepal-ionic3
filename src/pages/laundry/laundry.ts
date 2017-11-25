import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';

@Component({
  selector: 'page-laundry',
  templateUrl: 'laundry.html'
})
export class LaundryPage {

  constructor(public navCtrl: NavController) {

  }

  navPageSettings() {
    this.navCtrl.push(SettingsPage);
  }

}
