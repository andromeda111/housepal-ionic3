import { Component } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives/ng_form';
// import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'page-sign-up',
    templateUrl: 'sign-up.html'
})
export class SignUpPage {

    // constructor(private authService: AuthService) {}

    public submitSignUp(form: NgForm) {
        console.log(form.value);
        // this.authService.signup('a','b')
    }

}
