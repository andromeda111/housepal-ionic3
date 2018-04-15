import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonicPage, NavController } from 'ionic-angular';
import { AuthService } from '../../../services/auth.service';
import { SignupPage } from '../signup/signup';
import { Observable } from 'rxjs/Observable';
import { LoadingService } from '../../../services/loading.service';

@IonicPage()
@Component({
    selector: 'page-signin',
    templateUrl: 'signin.html'
})
export class SigninPage {

    constructor(private authService: AuthService, private nav: NavController, private loadingService: LoadingService) { }

    signin(form: NgForm) {
        const loading = this.loadingService.loadingSpinner();
        loading.present();
        this.authService.signin(form.value.email, form.value.password)
            .subscribe(() => loading.dismiss());
    }

    goToSignup() {
        this.nav.setRoot(SignupPage, {}, { animate: true, direction: 'forward' });
    }

}
