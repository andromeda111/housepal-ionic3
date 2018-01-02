import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { AuthService } from '../../../services/auth.service';
import { SignupPage } from '../signup/signup';

@Component({
    selector: 'page-signin',
    templateUrl: 'signin.html'
})
export class SigninPage {

    constructor(private authService: AuthService,
                private nav: NavController) {}

    public signin(form: NgForm) {
        console.log(form.value);
        this.authService.signin(form.value.email, form.value.password)
    }

    goToSignup() {
        this.nav.setRoot(SignupPage, {}, {animate: true, direction: 'forward'});
    }

}
