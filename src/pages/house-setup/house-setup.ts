import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-house-setup',
    templateUrl: 'house-setup.html'
})
export class HouseSetupPage {
    public showSection: string = 'landing';

    constructor(private nav: NavController) {}

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

    joinHouse(form: NgForm) {
        // this.authService.signin(form.value.email, form.value.password)
    }

    goToSignup() {
        // this.nav.setRoot(SignupPage, {}, {animate: true, direction: 'forward'});
    }
}
