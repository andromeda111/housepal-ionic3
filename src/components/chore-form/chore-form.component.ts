import { Component, Input, EventEmitter, Output } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { HouseService } from '../../services/house.service';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'chore-form',
    templateUrl: 'chore-form.component.html'
})
export class ChoreFormComponent {

    fullCycleList = [this.userService.activeUser].concat(this.houseService.roommates);
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

    newAssigned = [];
    cycleNames: string[] = [];

    @Input() chore: any;

    constructor(private houseService: HouseService, private userService: UserService, private formBuilder: FormBuilder) {}

    ngOnInit() {
        this.newAssigned = this.chore.cycle;
        console.log(this.fullCycleList);
        

        this.choreForm = this.formBuilder.group({
            name: '',
            daysDue: this.buildDaysDue(),
            assigned: this.buildAssigned(this.chore.cycle)
          });  
    }    
        
    get daysDueFC() {
        return this.choreForm.get('daysDue');
    };  

    get assignedFC() {
        return this.choreForm.get('assigned');
    }; 

    buildAssigned(currentAssigned) {
        let assigned = this.fullCycleList.map(user => {
            const userExistsInCycle = currentAssigned.some(uid => user.uid === uid);
            return userExistsInCycle;
        });

        // Note for next time.. Just return an object of uid and name to make this easier, more performant, and reduce code. For fucks sake.
        this.cycleNames = currentAssigned.map(uid => {

        })

        const arr = assigned.map(selected => {
            return this.formBuilder.control(selected);
        });
         
        return this.formBuilder.array(arr);
    }
  
    buildDaysDue() {
        const arr = this.days.map(day => {
            return this.formBuilder.control(day.selected);
          });
        return this.formBuilder.array(arr);
    } 
 
    setNewAssigned(selected, user) {
        if (selected) {
            let idx = this.newAssigned.indexOf(user.uid);
            this.newAssigned.splice(idx, 1);
            this.cycleNames.splice(idx, 1);
        } else {
            this.newAssigned.push(user.uid);
            this.cycleNames.push(user.name);         
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
             