import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonicPage, NavController } from 'ionic-angular';
import { AuthService } from '../../../services/auth.service';
import { SigninPage } from '../signin/signin';

@IonicPage()
@Component({
    selector: 'page-signup',
    templateUrl: 'signup.html'
})
export class SignupPage {

    constructor(private authService: AuthService,
                private nav: NavController) {}

    public signup(form: NgForm) {
        this.authService.signup(form.value.name, form.value.email, form.value.password).then(res => console.log('fin', res))
    }

    goToSignin() {
        this.nav.setRoot(SigninPage, {}, {animate: true, direction: 'forward'});
    }
}
