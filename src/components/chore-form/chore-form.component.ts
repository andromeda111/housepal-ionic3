import { Component, Input, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'chore-form',
    templateUrl: 'chore-form.component.html'
})
export class ChoreFormComponent {



    submitForm(form: NgForm) {
        // const loading = this.loadingService.loadingSpinner();
        // loading.present();
        // this.authService.signin(form.value.email, form.value.password)
        //     // .finally(() => loading.dismiss())
        //     .subscribe()
        console.log('form', form);
        
    }
}
