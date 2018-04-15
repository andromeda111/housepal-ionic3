import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonicPage, NavController } from 'ionic-angular';
import { AuthService } from '../../../services/auth.service';
import { SigninPage } from '../signin/signin';
import { LoadingService } from '../../../services/loading.service';

@IonicPage()
@Component({
    selector: 'page-signup',
    templateUrl: 'signup.html'
})
export class SignupPage {

    constructor(private authService: AuthService, private nav: NavController, private loadingService: LoadingService) { }

    signup(form: NgForm) {
        const loading = this.loadingService.loadingSpinner();
        loading.present();
        this.authService.signup(form.value.name, form.value.email, form.value.password)
            .subscribe(() => loading.dismiss());
    }

    goToSignin() {
        this.nav.setRoot(SigninPage, {}, { animate: true, direction: 'forward' });
    }
}
