import { Component, Input, ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { IonicPage, MenuController, NavController, AlertController, Events } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { SigninPage } from '../user-setup/signin/signin';
import { UserService } from '../../services/user.service';
import { HouseService } from '../../services/house.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@IonicPage()
@Component({
    selector: 'page-side-menu',
    templateUrl: 'side-menu.html'
})
export class SideMenuPage implements OnInit, OnDestroy {

    activeMenu = 'Roommates';
    house: any = {};
    roommates: any = [];
    removeForm: FormGroup;


    @Input() userName = '';
    @Input() set menuData(data) {
        if (!data) {
            return;
        }
        this.house = data.house;
        this.roommates = data.roommates;
        console.log('input', data.house, data.roommates);
    };

    constructor(private authService: AuthService,
        private menuCtrl: MenuController,
        private nav: NavController,
        private houseService: HouseService,
        private alertCtrl: AlertController,
        private events: Events,
        private cdref: ChangeDetectorRef) {

        this.initializeForm()
    }

    ngOnInit() {


        console.log('on init');
    }

    ngOnDestroy() {
        console.log('on destroy');

        // this.cdref.detach(); // try this
        // this.events.unsubscribe('menu:opened');
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
                            this.removeConfirmMismatchAlert();
                        }

                        this.initializeForm();
                    }
                }
            ]
        });

        alert.present();

        // let ingredients = [];
        // if (value.ingredients.length > 0) {
        //   ingredients = value.ingredients.map(name => {
        //     return {name: name, amount: 1}
        //   })
        // }
        // if (this.mode == 'Edit') {
        //   this.recipesService.updateRecipe(this.index, value.title, value.description, value.difficulty, ingredients)
        // } else {
        //   this.recipesService.addRecipe(value.title, value.description, value.difficulty, ingredients);
        // }
        // this.recipeForm.reset();
        // this.navCtrl.popToRoot();
    }

    removeConfirmMismatchAlert() {
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

    signOut() {
        this.activeMenu = 'Sign Out';
        this.authService.logout();
        this.menuCtrl.close();
        this.nav.setRoot(SigninPage);
    }

}
