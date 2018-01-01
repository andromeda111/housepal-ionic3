import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'page-sign-in',
    templateUrl: 'sign-in.html'
})
export class SignInPage {

    constructor(private authService: AuthService) {}

    public signIn() {
        this.authService.signin('a','b')
    }

}
