import { Component, Input, EventEmitter, Output } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { HouseService } from '../../services/house.service';

@Component({
    selector: 'chore-form',
    templateUrl: 'chore-form.component.html'
})
export class ChoreFormComponent {

    roommates = this.houseService.roommates;
    choreForm: FormGroup;
    days = [
        { day: 'Mon',  selected: false },
        { day: 'Tue',  selected: false },
    ]

    @Input() chore: any;

    constructor(private houseService: HouseService, private formBuilder: FormBuilder) {}

    ngOnInit() {

        this.choreForm = this.formBuilder.group({
            name: '',
            daysDue: this.buildDaysDue()
          });
    }  
    
    get daysDue() {
        return this.choreForm.get('daysDue');
    };

    buildDaysDue() {
        const arr = this.days.map(day => {
            return this.formBuilder.control(day.selected);
          });
        return this.formBuilder.array(arr);
    } 

    submitForm(value) {
        // const loading = this.loadingService.loadingSpinner();
        // loading.present(); 
        // this.authService.signin(form.value.email, form.value.password)
        //     // .finally(() => loading.dismiss())
        //     .subscribe() 
        console.log('form', value);
            
    }    
}  
             