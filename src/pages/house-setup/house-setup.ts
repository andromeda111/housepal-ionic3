import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonicPage, NavController } from 'ionic-angular';
import { HouseService } from '../../services/house.service';

@IonicPage()
@Component({
    selector: 'page-house-setup',
    templateUrl: 'house-setup.html'
})
export class HouseSetupPage {
    public showSection: string = 'landing';

    constructor(private nav: NavController, private houseService: HouseService) {}

    selectOption(option) {
        switch (option) {
            case 'join':
                this.showSection = 'join';
                break;
            case 'create':
                this.showSection = 'create';
                break;
            default:
                this.showSection = 'landing';
                break;
        }
    }

    createHouse(form: NgForm) {
        this.houseService.createHouse(form.value.houseName, form.value.houseCode);
    }

    joinHouse(form: NgForm) {
        this.houseService.joinHouse(form.value.houseName, form.value.houseCode);
    }
}
