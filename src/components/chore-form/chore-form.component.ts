import { Component, Input, EventEmitter, Output } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { HouseService } from '../../services/house.service';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'chore-form',
    templateUrl: 'chore-form.component.html'
})
export class ChoreFormComponent {

    allUsers = [this.userService.activeUser].concat(this.houseService.roommates);
    choreForm: FormGroup;
    days = [
        { day: 'Sun',  selected: false },
        { day: 'Mon',  selected: false },
        { day: 'Tue',  selected: false },
        { day: 'Wed',  selected: false },
        { day: 'Thu',  selected: false },
        { day: 'Fri',  selected: false },
        { day: 'Sat',  selected: false },
    ];
    assignedUsers: any[] = [];

    @Input() chore: any;

    constructor(private houseService: HouseService, private userService: UserService, private formBuilder: FormBuilder) {}

    ngOnInit() {
        this.assignedUsers = this.chore.cycle;

        this.choreForm = this.formBuilder.group({
            name: '',
            daysDue: this.buildDaysDue(),
            assigned: this.buildAssigned(this.assignedUsers)
          });  
    }    
        
    get daysDueFC() {
        return this.choreForm.get('daysDue');
    };  

    get assignedFC() {
        return this.choreForm.get('assigned');
    }; 

    buildAssigned(currentAssigned) {
        let assigned = this.allUsers.map(user => {
            const userExistsInCycle = currentAssigned.some(userInCycle => user.uid === userInCycle.uid);
            return userExistsInCycle;
        });

        const formValues = assigned.map(selected => {
            return this.formBuilder.control(selected);
        });
         
        return this.formBuilder.array(formValues);
    }
  
    buildDaysDue() {
        const formValues = this.days.map(day => {
            return this.formBuilder.control(day.selected);
          });
        return this.formBuilder.array(formValues);
    } 
 
    setAssignedUsers(selected, user) {
        if (selected) {
            this.assignedUsers = this.assignedUsers.filter(assigned => assigned.uid !== user.uid);
        } else {
            this.assignedUsers.push(user);     
        }
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
             