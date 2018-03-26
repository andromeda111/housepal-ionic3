import { Component, Input } from '@angular/core';
import { IonicPage, MenuController, NavController } from 'ionic-angular';
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
        private houseService: HouseService) {

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

    onRemoveFormSubmit() {
        const value = this.removeForm.value;
        console.log(value);
        
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


    signOut() {
        this.activeMenu = 'Sign Out';
        this.authService.logout();
        this.menuCtrl.close();
        this.nav.setRoot(SigninPage);
    }

}
