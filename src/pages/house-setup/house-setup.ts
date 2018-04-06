import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonicPage, NavController } from 'ionic-angular';
import { HouseService } from '../../services/house.service';
import { TabsPage } from '../tabs/tabs';
import { UserService } from '../../services/user.service';
import 'rxjs/add/operator/do';

@IonicPage()
@Component({
    selector: 'page-house-setup',
    templateUrl: 'house-setup.html'
})
export class HouseSetupPage {

    setupSection: string = 'landing';

    constructor(private nav: NavController, private houseService: HouseService, private userService: UserService) { }

    selectOption(option) {
        switch (option) {
            case 'join':
                this.setupSection = 'join';
                break;
            case 'create':
                this.setupSection = 'create';
                break;
            default:
                this.setupSection = 'landing';
                break;
        }
    }

    createHouse(form: NgForm) {
        this.houseService.createHouse(form.value.houseName, form.value.houseCode).subscribe(() => {
            this.nav.setRoot(TabsPage);
        });
    }

    joinHouse(form: NgForm) {
        this.houseService.joinHouse(form.value.houseName, form.value.houseCode).subscribe(() => {
            this.nav.setRoot(TabsPage);
        });
    }

    // ERROR: OTHER USER DOESN"T GET SIGNED OUT IF THEY"RE REMOVED FROM A HOUSE BY ANOTHER!!!!
}
