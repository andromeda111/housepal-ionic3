import { Component } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'page-signup',
    templateUrl: 'signup.html'
})
export class SignupPage {

    constructor(private authService: AuthService) {}

    public submitSignup(form: NgForm) {
        console.log(form.value);
        this.authService.signup(form.value.email, form.value.password)
    }

}
