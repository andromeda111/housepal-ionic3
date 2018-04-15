import { Injectable } from '@angular/core';
import { AlertController, Events } from 'ionic-angular';
import { HouseService } from './house.service';
import { UserService } from './user.service';
import { LoadingService } from './loading.service';

@Injectable()
export class AlertService {

    constructor(private alertCtrl: AlertController,
        private houseService: HouseService,
        private userService: UserService,
        private events: Events,
        private loadingService: LoadingService) { }

    notInHouse() {
        let alert = this.alertCtrl.create({
            title: 'Notice',
            message: `It looks like you are no longer in this house. You may have been removed by another person. Please join it again or create a new house.`,
            buttons: [
                {
                    text: 'Okay',
                    handler: () => {
                        this.events.publish('appSetRoot:HouseSetupPage');
                    }
                }
            ]
        });

        alert.present();
    }

    leaveHouse(houseName: string) {
        let alert = this.alertCtrl.create({
            title: 'Leave House',
            message: `Please confirm by typing the house name: ${houseName}`,
            inputs: [
                {
                    name: 'house',
                    placeholder: houseName
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
                        if (data.house === houseName) {
                            const loading = this.loadingService.loadingSpinner();
                            loading.present();
                            this.houseService.leaveHouse()
                                .finally(() => loading.dismiss())
                                .subscribe((res: any) => {
                                    if (!this.userService.activeUser.houseID) {
                                        this.leaveHouseSuccess(houseName);
                                    }
                                });
                        } else {
                            this.alertNameMismatch();
                        }
                    }
                }
            ]
        });

        alert.present();
    }

    leaveHouseSuccess(houseName: string) {
        let alert = this.alertCtrl.create({
            title: 'Success',
            message: `You have left ${houseName}.`,
            buttons: [
                {
                    text: 'Okay',
                    handler: () => {
                        this.events.publish('appSetRoot:HouseSetupPage');
                    }
                }
            ]
        });

        alert.present();
    }

    removeRoommate(roommate: any, houseName: string) {
        let alert = this.alertCtrl.create({
            title: 'Remove Roommate',
            message: `Please confirm by typing this persons name: ${roommate.name}`,
            inputs: [
                {
                    name: 'name',
                    placeholder: roommate.name
                },
            ],
            cssClass: 'alert-input-text-red',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                        this.events.publish('menu:action-initializeForm');
                    }
                },
                {
                    text: 'Remove',
                    handler: (data) => {
                        console.log('Removing: ', roommate, data);
                        if (data.name === roommate.name) {   
                            const loading = this.loadingService.loadingSpinner();
                            loading.present();
                            this.houseService.removeRoommate(roommate)
                                .finally(() => loading.dismiss())
                                .subscribe((res: any) => {
                                    this.removeRoommateSuccess(roommate.name, houseName);
                                    this.events.publish('menu:action-setRoommates', res || []);
                                });
                        } else {
                            this.alertNameMismatch();
                        }

                        this.events.publish('menu:action-initializeForm');
                    }
                }
            ]
        });

        alert.present();
    }

    removeRoommateSuccess(roommateName: string, houseName: string) {
        let alert = this.alertCtrl.create({
            title: 'Success',
            message: `${roommateName} has been removed from ${houseName}.`,
            buttons: [
                {
                    text: 'Okay',
                    role: 'cancel',
                }
            ]
        });

        alert.present();
    }

    alertNameMismatch() {
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
}
