import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonicPage, NavController } from 'ionic-angular';
import { AuthService } from '../../../services/auth.service';
import { SignupPage } from '../signup/signup';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
    selector: 'page-signin',
    templateUrl: 'signin.html'
})
export class SigninPage {

    constructor(private authService: AuthService, private nav: NavController) { }

    signin(form: NgForm) {
        this.authService.signin(form.value.email, form.value.password).subscribe();

        console.log('end signin');
    }

    goToSignup() {
        this.nav.setRoot(SignupPage, {}, { animate: true, direction: 'forward' });
    }

}
