import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-edit-chore',
    templateUrl: 'edit-chore.html',
})
export class EditChorePage {

    chore;

    constructor(public navCtrl: NavController, public navParams: NavParams) { 

        this.chore = this.navParams.data;
        
    }

    ngOnInit() {
        console.log(this.chore);
        
    }


}
