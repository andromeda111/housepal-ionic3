import { Component, Input, OnDestroy } from '@angular/core';
import { IonicPage, MenuController, NavController, AlertController, Events } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { SigninPage } from '../user-setup/signin/signin';
import { HouseService } from '../../services/house.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import 'rxjs/add/operator/takeWhile';
import { HouseSetupPage } from '../house-setup/house-setup';
import { UserService } from '../../services/user.service';
import { AlertService } from '../../services/alert.service';

@IonicPage()
@Component({
    selector: 'page-side-menu',
    templateUrl: 'side-menu.html'
})
export class SideMenuPage implements OnDestroy {

    activeMenu = 'Roommates';
    house: any = {};
    roommates: any = [];
    removeForm: FormGroup;

    private alive = true;

    @Input() userName = '';

    constructor(private authService: AuthService,
        private menuCtrl: MenuController,
        private nav: NavController,
        private houseService: HouseService,
        private userService: UserService,
        private alertCtrl: AlertController,
        private alertService: AlertService,
        private events: Events) {

        this.houseService.menuDataSubject
            .takeWhile(() => this.alive)
            .subscribe(result => {
                if (result.length) {
                    this.house = result[0];
                    this.roommates = result[1];
                }
            });

        this.events.subscribe('menu:action-initializeForm', () => this.initializeForm());
        this.events.subscribe('menu:action-setRoommates', (roommates: any[]) => this.roommates = roommates); //testing this out

        this.initializeForm()
    }

    ngOnDestroy() {
        this.alive = false;
    }

    selectMenu(menu: string) {
        this.activeMenu === menu ? this.activeMenu = '' : this.activeMenu = menu;
    }

    private initializeForm() {
        console.log('form initialize');
        let roommate = null;

        this.removeForm = new FormGroup({
            'roommate': new FormControl(roommate, Validators.required),
        });
    }

    leaveHouse() {
        this.alertService.leaveHouse(this.house.houseName);
    }

    removeFormSubmit() {
        const selectedRoommate = Object.assign({}, this.removeForm.value.roommate);
        this.alertService.removeRoommate(selectedRoommate, this.house.houseName);
    }

    signOut() {
        this.activeMenu = 'Sign Out';
        this.authService.logout();
        this.menuCtrl.close();
        this.nav.setRoot(SigninPage);
    }

}
