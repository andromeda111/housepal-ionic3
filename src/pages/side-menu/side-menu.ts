import { Component, Input, OnDestroy } from '@angular/core';
import { IonicPage, MenuController, NavController, AlertController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { SigninPage } from '../user-setup/signin/signin';
import { HouseService } from '../../services/house.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import 'rxjs/add/operator/takeWhile';

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
