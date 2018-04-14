import { Injectable } from '@angular/core';
import { AlertController, Events } from 'ionic-angular';
import { HouseService } from './house.service';
import { UserService } from './user.service';

@Injectable()
export class AlertService {

    constructor(private alertCtrl: AlertController,
        private houseService: HouseService,
        private userService: UserService,
        private events: Events) { }


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
                        console.log('Leaving: ', houseName, data);
                        if (data.house === houseName) {
                            console.log('CONFIRMED LEAVE');
                            // Leave via service        
                            this.houseService.leaveHouse()
                                .subscribe((res: any) => {
                                    // ERROR HANDLING???!?!?!
                                    console.log('LEFT END', res);
                                    if (this.userService.activeUser.houseID) {
                                        this.leaveHouseSuccess(houseName);
                                        // this.menuCtrl.close();
                                        // this.nav.setRoot(HouseSetupPage);
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
                    role: 'cancel',
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
                            this.houseService.removeRoommate(roommate)
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