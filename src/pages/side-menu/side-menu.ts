import { Component, Input } from '@angular/core';
import { IonicPage, MenuController, NavController, AlertController } from 'ionic-angular';
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
export class SideMenuPage {

    activeMenu = 'Roommates';
    house: any = {};
    roommates: any = [];
    removeForm: FormGroup;


    @Input() userName = '';

    constructor(private authService: AuthService,
        private menuCtrl: MenuController,
        private nav: NavController,
        private houseService: HouseService,
        private alertCtrl: AlertController) {

        this.houseService.getHouse()
            .do(() => this.house = this.houseService.house)
            .subscribe();

        this.houseService.getRoommates()
            .do(() => this.roommates = this.houseService.roommates)
            .subscribe();

            this.initializeForm()
    }

    selectMenu(menu: string) {
        this.activeMenu === menu ? this.activeMenu = '' : this.activeMenu = menu;
    }

    private initializeForm() {
        let name = null;
    
        this.removeForm = new FormGroup({
          'name': new FormControl(name, Validators.required),
        });
      }

    removeFormSubmit() {
        const selectedName = this.removeForm.value.name;
        console.log(selectedName);

        let alert = this.alertCtrl.create({
            title: 'Remove Roommate',
            message: `Please confirm by typing this persons name: ${selectedName}`,
            inputs: [
                {
                  name: 'name',
                  placeholder: selectedName
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
                        console.log('Removing: ', selectedName, data);
                        if (data.name === selectedName) {
                            console.log('CONFIRMED');
                            // Remove via service                     
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

    signOut() {
        this.activeMenu = 'Sign Out';
        this.authService.logout();
        this.menuCtrl.close();
        this.nav.setRoot(SigninPage);
    }

}
