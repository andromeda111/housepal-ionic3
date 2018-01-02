import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { AuthService } from '../../../services/auth.service';
import { SigninPage } from '../signin/signin';

@Component({
    selector: 'page-signup',
    templateUrl: 'signup.html'
})
export class SignupPage {

    constructor(private authService: AuthService,
                private nav: NavController) {}

    public signup(form: NgForm) {
        console.log(form.value);
        this.authService.signup(form.value.email, form.value.password)
    }

    goToSignin() {
        this.nav.setRoot(SigninPage, {}, {animate: true, direction: 'forward'});
    }
}
