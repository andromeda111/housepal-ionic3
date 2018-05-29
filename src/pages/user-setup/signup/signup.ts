import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonicPage, NavController } from 'ionic-angular';
import { AuthService } from '../../../services/auth.service';
import { LoadingService } from '../../../services/loading.service';
import 'rxjs/add/operator/finally';

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
            .finally(() => loading.dismiss())
            .subscribe();
    }

    goToSignin() {
        this.nav.setRoot('SigninPage', {}, { animate: true, direction: 'forward' });
    }
}
