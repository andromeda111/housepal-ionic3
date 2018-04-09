import { Component, Input, OnDestroy } from '@angular/core';
import { IonicPage, MenuController, NavController, AlertController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { SigninPage } from '../user-setup/signin/signin';
import { HouseService } from '../../services/house.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import 'rxjs/add/operator/takeWhile';
import { HouseSetupPage } from '../house-setup/house-setup';

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
        private alertCtrl: AlertController) {

        this.houseService.menuDataSubject
            .takeWhile(() => this.alive)
            .subscribe(result => {
                if (result.length) {
                    this.house = result[0];
                    this.roommates = result[1];
                }
            });

        this.initializeForm()
    }

    ngOnDestroy() {
        this.alive = false;
    }

    selectMenu(menu: string) {
        this.activeMenu === menu ? this.activeMenu = '' : this.activeMenu = menu;
    }

    private initializeForm() {
        let roommate = null;

        this.removeForm = new FormGroup({
            'roommate': new FormControl(roommate, Validators.required),
        });
    }

    leaveHouse() {
        let alert = this.alertCtrl.create({
            title: 'Leave House',
            message: `Please confirm by typing the house name: ${this.house.houseName}`,
            inputs: [
                {
                    name: 'house',
                    placeholder: this.house.houseName
                },
            ],
            cssClass: 'alert-input-text-red',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel'
                },
                {
                    text: 'Leave',
                    handler: (data) => {
                        console.log('Leaving: ', this.house.houseName, data);
                        if (data.house === this.house.houseName) {
                            console.log('CONFIRMED LEAVE');
                            // Leave via service        
                            this.houseService.leaveHouse()
                                .subscribe((res: any) => {
                                    // ERROR HANDLING???!?!?!
                                    console.log('LEFT END', res);
                                    this.leaveHouseConfirmSuccessAlert();
                                    this.menuCtrl.close();
                                    this.nav.setRoot(HouseSetupPage);
                                });
                        } else {
                            this.confirmMismatchAlert();
                        }

                        this.initializeForm();
                    }
                }
            ]
        });

        alert.present();
    }

    removeFormSubmit() {
        const selectedRoommate = Object.assign({}, this.removeForm.value.roommate);
        console.log(selectedRoommate.name);

        let alert = this.alertCtrl.create({
            title: 'Remove Roommate',
            message: `Please confirm by typing this persons name: ${selectedRoommate.name}`,
            inputs: [
                {
                    name: 'name',
                    placeholder: selectedRoommate.name
                },
            ],
            cssClass: 'alert-input-text-red',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                        this.initializeForm();
                    }
                },
                {
                    text: 'Remove',
                    handler: (data) => {
                        console.log('Removing: ', selectedRoommate, data);
                        if (data.name === selectedRoommate.name) {
                            console.log('CONFIRMED');
                            // Remove via service        
                            this.houseService.removeRoommate(selectedRoommate)
                                .subscribe((res: any) => {
                                    console.log(res);
                                    this.removeConfirmSuccessAlert(selectedRoommate);

                                    this.houseService.getRoommates()
                                        .do(() => this.roommates = this.houseService.roommates)
                                        .subscribe();
                                });
                        } else {
                            this.confirmMismatchAlert();
                        }

                        this.initializeForm();
                    }
                }
            ]
        });

        alert.present();
    }

    confirmMismatchAlert() {
        let alert = this.alertCtrl.create({
            title: 'Sorry!',
            message: 'The names did not match. Please try again.',
            buttons: [
                {
                    text: 'Okay',
                    role: 'cancel',
                }
            ]
        });

        alert.present();
    }

    removeConfirmSuccessAlert(roommate) {
        let alert = this.alertCtrl.create({
            title: 'Success',
            message: `${roommate.name} has been removed from ${this.house.houseName}.`,
            buttons: [
                {
                    text: 'Okay',
                    role: 'cancel',
                }
            ]
        });

        alert.present();
    }

    leaveHouseConfirmSuccessAlert() {
        let alert = this.alertCtrl.create({
            title: 'Success',
            message: `You have left ${this.house.houseName}.`,
            buttons: [
                {
                    text: 'Okay',
                    role: 'cancel',
                }
            ]
        });

        alert.present();
    }

    signOut() {
        this.activeMenu = 'Sign Out';
        this.authService.logout();
        this.menuCtrl.close();
        this.nav.setRoot(SigninPage);
    }

}
