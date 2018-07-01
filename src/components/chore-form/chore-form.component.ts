import { Component, Input, EventEmitter, Output } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { HouseService } from '../../services/house.service';
import { UserService } from '../../services/user.service';
import moment from 'moment';

@Component({
    selector: 'chore-form',
    templateUrl: 'chore-form.component.html'
})
export class ChoreFormComponent {

    allUsers = [this.userService.activeUser].concat(this.houseService.roommates);
    choreForm: FormGroup;
    days = [
        { day: 'Sun', selected: false },
        { day: 'Mon', selected: false },
        { day: 'Tue', selected: false },
        { day: 'Wed', selected: false },
        { day: 'Thu', selected: false },
        { day: 'Fri', selected: false },
        { day: 'Sat', selected: false },
    ];
    assignedUsers: any[] = [];

    @Input() chore: any;

    constructor(private houseService: HouseService, private userService: UserService, private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.assignedUsers = this.chore.cycle;

        this.choreForm = this.formBuilder.group({
            name: new FormControl(this.chore.title),
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
        if (this.chore && this.chore.daysDue.length) {
            this.chore.daysDue.forEach(dueIndex => {
                this.days[dueIndex].selected = true;
            });
        }

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

    submitForm(form) {
        const daysDue: number[] = form.daysDue.map((day, index) => day ? index : undefined).filter(value => value !== undefined);
        const cycle = this.assignedUsers.map((user, index) => ({ index, uid: user.uid, name: user.name }));
        const title = form.name;
        const choreData = { title, daysDue, cycle };


        // let actualDue;
        // let actualIdx = 0
        //   if (moment(moment().add(1, 'day')).isAfter(moment(moment().add(1, 'day')).day(daysDue[0], 'day')) && daysDue.length > 1) {
        //     let laterDay = daysDue.filter((day, idx) => {
        //         return moment(moment().add(1, 'day')).isBefore(moment(moment().add(1, 'day')).day(day, 'day'))
        //       })
        //     if (laterDay.length > 0) {
        //       actualIdx = daysDue.indexOf(laterDay[0])
        //       actualDue = moment().add(1, 'day').day(laterDay[0], 'day')
        //     } else {
        //       actualDue = moment().add(1, 'weeks').weekday(daysDue[0]);
        //     }
        //   } else if (moment(moment().add(1, 'day')).isSame(moment(moment().add(1, 'day')).day(daysDue[0], 'day')) && daysDue.length > 1) {
        //     actualIdx = 1
        //     actualDue = moment().add(1, 'day').day(daysDue[1], 'day')
        //   } else if (moment(moment().add(1, 'day')).isAfter(moment(moment().add(1, 'day')).day(daysDue[0], 'day')) && daysDue.length == 1) {
        //     actualDue = moment().add(1, 'weeks').weekday(daysDue[0]);
        //   } else if (moment(moment().add(1, 'day')).isSame(moment(moment().add(1, 'day')).day(daysDue[0], 'day')) && daysDue.length == 1) {
        //     actualDue = moment().add(1, 'weeks').weekday(daysDue[0]);
        //   } else {
        //     actualDue = moment().add(1, 'day').day(daysDue[0], 'day')
        //   }

        const readyChoreData = {
            title: title,
            daysDue: daysDue,
            cycle: cycle,
            currentAssigned: cycle[0],
            currentDueDay: {}, // Need to calculate { date: yyyy-mm-dd, daysDueIndex: number },
            upcoming: cycle[1] || cycle[0] // If present, defaults to first in cycle.
          }

        console.log('processed chore:', readyChoreData);

        // const loading = this.loadingService.loadingSpinner();
        // loading.present(); 
        // this.authService.signin(form.value.email, form.value.password)
        //     // .finally(() => loading.dismiss())
        //     .subscribe() 

    }
}
