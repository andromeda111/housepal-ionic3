import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonicPage, NavController, Events } from 'ionic-angular';
import { HouseService } from '../../services/house.service';
import { TabsPage } from '../tabs/tabs';
import { UserService } from '../../services/user.service';
import 'rxjs/add/operator/do';
import { LoadingService } from '../../services/loading.service';

@IonicPage()
@Component({
    selector: 'page-house-setup',
    templateUrl: 'house-setup.html'
})
export class HouseSetupPage {

    setupSection: string = 'landing';

    constructor(private nav: NavController, private houseService: HouseService, private userService: UserService, private events: Events, private loadingService: LoadingService) { }

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
        const loading = this.loadingService.loadingSpinner();
        loading.present();
        this.houseService.createHouse(form.value.houseName, form.value.houseCode).subscribe(() => {
            this.events.publish('appSetRoot:TabsPage');
            loading.dismiss();
        });
    }

    joinHouse(form: NgForm) {
        const loading = this.loadingService.loadingSpinner();
        loading.present();
        this.houseService.joinHouse(form.value.houseName, form.value.houseCode).subscribe(() => {
            this.events.publish('appSetRoot:TabsPage');
            loading.dismiss();
        });
    }
}
